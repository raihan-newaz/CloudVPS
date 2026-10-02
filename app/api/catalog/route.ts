import { NextResponse } from "next/server";
import { fetchCatalog } from "@/lib/catalog";

export const runtime = "nodejs";

export async function GET() {
  const catalog = await fetchCatalog();
  return NextResponse.json(catalog, {
    headers: {
      "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
