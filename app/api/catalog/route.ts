import { NextResponse } from "next/server";
import { fetchCatalog } from "@/lib/catalog";

export const runtime = "nodejs";

export async function GET() {
  const catalog = await fetchCatalog();
  return NextResponse.json(catalog, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
