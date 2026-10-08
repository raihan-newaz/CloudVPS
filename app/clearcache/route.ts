import { NextRequest, NextResponse } from "next/server";
import { refreshPricing } from "@/lib/refresh-pricing";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const limiter = createRateLimiter({ interval: 60000, maxTrackedIps: 5000 });

export async function GET(request: NextRequest) {
  const clientIp = getClientIp(request.headers);
  const rateLimitStatus = limiter.check(clientIp, 5); // 5 requests per minute per IP

  if (!rateLimitStatus.success) {
    return NextResponse.json(
      { error: "Too many cache clear requests. Please wait a minute." },
      { status: 429, headers: { "Retry-After": "60", "Cache-Control": "no-store" } }
    );
  }

  try {
    const refreshed = await refreshPricing();

    // Return a clean HTML confirmation page for browser visitors
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Prices Refreshed | CloudVPS</title>
        <style>
          body {
            background-color: #030712;
            color: #f3f4f6;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .card {
            background: rgba(17, 24, 39, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            max-width: 480px;
            text-align: center;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
          }
          .icon {
            font-size: 48px;
            margin-bottom: 16px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 12px;
            color: #38bdf8;
          }
          p {
            color: #9ca3af;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .btn {
            display: inline-block;
            background: #0284c7;
            color: #ffffff;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            transition: background 0.2s;
          }
          .btn:hover {
            background: #0369a1;
          }
          .time {
            font-size: 12px;
            color: #6b7280;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">⚡</div>
          <h1>Latest prices verified!</h1>
          <p>Main catalog and all BDIX and USA VPS packages have been refreshed. Pricing pages will regenerate on their next visit. Reload any page you already have open.</p>
          <p>${refreshed.counts.domains} domain prices · ${refreshed.counts.hosting} hosting plans · ${refreshed.counts.bdix} BDIX packages · ${refreshed.counts.usa} USA packages</p>
          <a href="/" class="btn">Go to Homepage →</a>
          <a href="/bdix-vps" class="btn" style="margin-top:12px">View BDIX VPS →</a>
          <a href="/usa-vps" class="btn" style="margin-top:12px">View USA VPS →</a>
          <div class="time">Revalidated at: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (BST)</div>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Price refresh failed. Please retry shortly.", details: error instanceof Error ? error.message : "Latest prices unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
