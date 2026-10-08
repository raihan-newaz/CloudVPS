import { revalidatePath, revalidateTag } from "next/cache";
import { fetchCatalog } from "@/lib/catalog";
import { fetchBdixPlans } from "@/lib/bdix";

export const pricingPaths = ["/", "/domain", "/hosting", "/vps", "/bdix-vps", "/api/catalog"];

/** Used by both the owner's browser link and the existing authenticated API. */
export async function refreshPricing() {
  revalidateTag("catalog", { expire: 0 });
  revalidateTag("bdix-catalog", { expire: 0 });
  for (const path of pricingPaths) revalidatePath(path);

  // Read fresh data in this invalidation request. Never report a fallback as success.
  const results = await Promise.allSettled([fetchCatalog({ strict: true }), fetchBdixPlans()]);
  const [catalog, bdix] = results;
  if (catalog.status !== "fulfilled" || bdix.status !== "fulfilled" || bdix.value.length === 0) {
    throw new Error("Latest prices could not be verified. Please try the refresh link again shortly.");
  }
  return {
    timestamp: new Date().toISOString(),
    counts: { domains: catalog.value.domains.length, hosting: catalog.value.hosting.length,
      vps: catalog.value.vps.length, bdix: bdix.value.length },
    paths: pricingPaths,
  };
}
