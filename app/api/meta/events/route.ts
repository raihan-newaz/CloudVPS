import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const limiter = createRateLimiter({ interval: 60_000, maxTrackedIps: 10_000 });
const allowedEvents = new Set(["PageView", "ViewContent", "InitiateCheckout"]);

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== request.nextUrl.origin) {
        return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers: { "Cache-Control": "no-store" } });
      }
    } catch {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403, headers: { "Cache-Control": "no-store" } });
    }
  }

  if (request.cookies.get("cloudvps_meta_consent")?.value !== "granted") {
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  if (!pixelId || !accessToken) {
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const clientIp = getClientIp(request.headers);
  if (!limiter.check(clientIp, 60).success) {
    return new NextResponse(null, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "60" } });
  }

  let body: { eventName?: unknown; eventId?: unknown; eventSourceUrl?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  if (typeof body.eventName !== "string" || !allowedEvents.has(body.eventName)
    || typeof body.eventId !== "string" || !/^[a-f\d-]{36}$/i.test(body.eventId)
    || typeof body.eventSourceUrl !== "string") {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(body.eventSourceUrl);
    if (sourceUrl.origin !== request.nextUrl.origin || sourceUrl.username || sourceUrl.password) throw new Error("Invalid event source");
  } catch {
    return NextResponse.json({ error: "Invalid event source" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const userAgent = request.headers.get("user-agent");
  if (!userAgent) return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });

  const userData: Record<string, string> = { client_user_agent: userAgent };
  if (isIP(clientIp)) userData.client_ip_address = clientIp;
  for (const cookieName of ["_fbp", "_fbc"]) {
    const value = request.cookies.get(cookieName)?.value;
    if (value && value.length <= 512) userData[cookieName] = value;
  }

  const apiVersion = process.env.META_GRAPH_API_VERSION?.match(/^v\d{1,3}\.\d{1,2}$/)?.[0] ?? "v26.0";
  const url = new URL(`https://graph.facebook.com/${apiVersion}/${encodeURIComponent(pixelId)}/events`);
  url.searchParams.set("access_token", accessToken);
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim();
  const payload: Record<string, unknown> = {
    data: [{
      event_name: body.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.eventId,
      action_source: "website",
      event_source_url: `${sourceUrl.origin}${sourceUrl.pathname}`,
      user_data: userData,
    }],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.error("Meta CAPI delivery failed", { status: response.status, eventName: body.eventName });
      return NextResponse.json({ error: "Meta event delivery failed" }, { status: 502, headers: { "Cache-Control": "no-store" } });
    }
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Meta CAPI request failed", { eventName: body.eventName });
    return NextResponse.json({ error: "Meta event delivery failed" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
