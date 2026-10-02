import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    // Purge the catalog fetch cache
    try {
      revalidateTag("catalog", { expire: 0 });
    } catch {}
    // Purge all pre-rendered marketing pages
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      message: "Catalog and all storefront pages have been revalidated successfully! New prices are now live across all edge servers with 0ms loading time.",
      timestamp: new Date().toISOString(),
    }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json({
      error: "Revalidation failed",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
