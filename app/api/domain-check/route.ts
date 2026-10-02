import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const storefront = "https://cdn.positivepanel.com/api/v1/whitelabel/domains/check";
const partner = "https://api.positivepanel.com/v1/partner-api/domains/check";
const domainPattern = /^(?=.{3,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

export async function POST(request: NextRequest) {
  let domain: string;
  try {
    const body = await request.json() as { domain?: unknown };
    domain = String(body.domain ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request", available: false }, { status: 400 });
  }
  if (!domainPattern.test(domain)) return NextResponse.json({ domain, available: false, error: "Enter a valid domain name." }, { status: 400 });
  try {
    const publicResponse = await fetch(storefront, {
      method: "POST",
      headers: { "X-Partner-ID": "app.cloudvps.bd", Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ domain, years: 1 }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (publicResponse.status === 429) return NextResponse.json({ domain, available: false, error: "Too many searches. Please try again shortly." }, { status: 429 });
    if (!publicResponse.ok) throw new Error("Storefront unavailable");
    const publicData = await publicResponse.json() as { available?: boolean; price?: { total_with_vat?: number } };
    let available = Boolean(publicData.available);
    const key = process.env.PARTNER_API_KEY;
    if (key) {
      try {
        const partnerResponse = await fetch(partner, {
          method: "POST",
          headers: { "X-Partner-Api-Key": key, Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ domain }),
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        });
        if (partnerResponse.ok) {
          const partnerData = await partnerResponse.json() as { available?: boolean; data?: { available?: boolean } };
          const partnerAvailable = partnerData.available ?? partnerData.data?.available;
          if (typeof partnerAvailable === "boolean") available = available && partnerAvailable;
        }
      } catch { /* The customer storefront remains the checkout source of truth. */ }
    }
    const price = Number(publicData.price?.total_with_vat);
    return NextResponse.json({ domain, available, ...(available && Number.isFinite(price) ? { price } : {}) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ domain, available: false, error: "Search is temporarily unavailable. Please use the client portal." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
