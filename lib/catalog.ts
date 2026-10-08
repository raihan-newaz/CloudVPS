export type Plan = { name: string; price: number; details: string[]; url: string; featured?: boolean };
export type Tld = { extension: string; price: number; renewal: number };
export type Catalog = { domains: Tld[]; hosting: Plan[]; vps: Plan[] };

const base = "https://cdn.positivepanel.com/api/v1/whitelabel";
const sourceHeaders = { "X-Partner-ID": "app.cloudvps.bd", Accept: "application/json" };

// Empty fallback sends visitors to the portal instead of publishing stale fixed prices.
export const defaultCatalog: Catalog = { domains: [], hosting: [], vps: [] };

type RawPlan = { id: number; location_id?: number; name: string; monthly_price: number | string; disk_mb?: number; cpu_cores?: number; ram_gb?: number; disk_gb?: number; is_featured?: boolean; features?: string[] };
type RawTld = { extension: string; registration_price?: { total_with_vat?: number }; renewal_price?: { total_with_vat?: number } };

async function get<T>(path: string): Promise<T> {
  const response = await fetch(base + path, {
    headers: sourceHeaders,
    signal: AbortSignal.timeout(9000),
    next: { revalidate: 300, tags: path === "/vps/categories/bdix-vps" ? ["catalog", "bdix-catalog"] : ["catalog"] },
  });
  if (!response.ok) throw new Error("Customer storefront unavailable");
  return response.json() as Promise<T>;
}

export async function fetchCatalog({ strict = false }: { strict?: boolean } = {}): Promise<Catalog> {
  try {
    const [tlds, hosting, bdix, usa] = await Promise.all([
      get<RawTld[] | { data: RawTld[] }>("/tlds"),
      get<{ plans?: RawPlan[] }>("/hosting/categories/shared-hosting"),
      get<{ plans?: RawPlan[] }>("/vps/categories/bdix-vps"),
      get<{ plans?: RawPlan[] }>("/vps/categories/usa-vps"),
    ]);
    const rawTlds = Array.isArray(tlds) ? tlds : (tlds.data ?? []);
    const desired = [".com.bd", ".bd", ".com", ".net"];
    const domains = desired.map(extension => rawTlds.find(t => t.extension === extension))
      .filter((t): t is RawTld => Boolean(t && Number(t.registration_price?.total_with_vat) > 0))
      .map(t => ({ extension: t.extension, price: Number(t.registration_price?.total_with_vat), renewal: Number(t.renewal_price?.total_with_vat) }));
    const hostCards = (hosting.plans ?? []).slice(0, 3)
      .filter(p => Number.isInteger(p.id) && p.id > 0 && Number(p.monthly_price) > 0)
      .map(p => ({
        name: p.name,
        price: Number(p.monthly_price),
        details: [p.disk_mb ? `${Math.round(p.disk_mb / 1024)} GB storage` : null,
          ...(p.features ?? []).filter(x => /websites|email accounts|free ssl/i.test(x)).slice(0, 3)].filter((x): x is string => typeof x === "string" && x.length > 0),
        featured: Boolean(p.is_featured),
        url: `https://app.cloudvps.bd/hosting/checkout?plan_id=${p.id}&cycle=monthly`,
      }));
    const vpsPlans = [...(bdix.plans ?? []).slice(0, 2), ...(usa.plans ?? []).slice(0, 1)];
    const vpsCards = vpsPlans
      .filter(p => Number.isInteger(p.id) && p.id > 0 && Number.isInteger(p.location_id) && Number(p.location_id) > 0 && Number(p.monthly_price) > 0)
      .map(p => ({
        name: p.name,
        price: Number(p.monthly_price),
        details: [p.cpu_cores ? `${p.cpu_cores} vCPU` : null,
          p.ram_gb ? `${p.ram_gb} GB RAM` : null,
          p.disk_gb ? `${p.disk_gb} GB NVMe` : null].filter((x): x is string => typeof x === "string" && x.length > 0),
        url: `https://app.cloudvps.bd/vps/configure?product-id=${p.id}&billing-cycle=monthly&location-id=${p.location_id}`,
      }));

    if (domains.length !== desired.length || hostCards.length !== 3 || vpsCards.length !== 3) {
      throw new Error("Incomplete customer price catalog");
    }
    return { domains, hosting: hostCards, vps: vpsCards };
  } catch (error) {
    if (strict) throw error;
    return defaultCatalog;
  }
}
