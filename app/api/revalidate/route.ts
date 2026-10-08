import { NextRequest, NextResponse } from "next/server";
import { refreshPricing } from "@/lib/refresh-pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const DEFAULT_SECRET = "cloudvps_revalidate_2026";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATION_SECRET || DEFAULT_SECRET;

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Invalid secret. Please provide ?secret=YOUR_SECRET" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const refreshed = await refreshPricing();

    return NextResponse.json({
      revalidated: true,
      message: "Latest main catalog and BDIX prices verified. Pricing pages regenerate on their next visit.",
      ...refreshed,
    }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json({
      error: "Revalidation failed",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
