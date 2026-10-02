export type Plan = { name: string; price: number; details: string[]; url: string; featured?: boolean };
export type Tld = { extension: string; price: number; renewal: number };
export type Catalog = { domains: Tld[]; hosting: Plan[]; vps: Plan[] };

const base = "https://cdn.positivepanel.com/api/v1/whitelabel";
const sourceHeaders = { "X-Partner-ID": "app.cloudvps.bd", Accept: "application/json" };

export const defaultCatalog: Catalog = {
  domains: [
    { extension: ".com.bd", price: 815.1, renewal: 1290.9 },
    { extension: ".bd", price: 1418.3, renewal: 2025.4 },
    { extension: ".com", price: 1581.25, renewal: 1666.35 },
    { extension: ".net", price: 2353.72, renewal: 2353.72 },
  ],
  hosting: [
    {
      name: "Starter cPanel",
      price: 395.01,
      details: ["5 GB storage", "2 websites", "5 email accounts", "Free SSL certificates"],
      featured: false,
      url: "https://app.cloudvps.bd/hosting/checkout?plan_id=1&cycle=monthly",
    },
    {
      name: "Standard cPanel",
      price: 791.01,
      details: ["10 GB storage", "5 websites", "10 email accounts", "Free SSL certificates"],
      featured: true,
      url: "https://app.cloudvps.bd/hosting/checkout?plan_id=2&cycle=monthly",
    },
    {
      name: "Advanced cPanel",
      price: 1484.01,
      details: ["20 GB storage", "10 websites", "10 email accounts", "Free SSL certificates"],
      featured: false,
      url: "https://app.cloudvps.bd/hosting/checkout?plan_id=3&cycle=monthly",
    },
  ],
  vps: [
    {
      name: "BDIX VPS Start",
      price: 750,
      details: ["2 vCPU", "2 GB RAM", "25 GB NVMe"],
      url: "https://app.cloudvps.bd/vps/configure?product-id=1&billing-cycle=monthly&location-id=1",
    },
    {
      name: "BDIX VPS Plus",
      price: 1540,
      details: ["2 vCPU", "4 GB RAM", "50 GB NVMe"],
      url: "https://app.cloudvps.bd/vps/configure?product-id=2&billing-cycle=monthly&location-id=1",
    },
    {
      name: "USA VPS Start",
      price: 1841.4,
      details: ["2 vCPU", "2 GB RAM", "50 GB NVMe"],
      url: "https://app.cloudvps.bd/vps/configure?product-id=6&billing-cycle=monthly&location-id=2",
    },
  ],
};

type RawPlan = { id: number; location_id?: number; name: string; monthly_price: number | string; disk_mb?: number; cpu_cores?: number; ram_gb?: number; disk_gb?: number; is_featured?: boolean; features?: string[] };
type RawTld = { extension: string; registration_price?: { total_with_vat?: number }; renewal_price?: { total_with_vat?: number } };

async function get<T>(path: string): Promise<T> {
  const response = await fetch(base + path, {
    headers: sourceHeaders,
    signal: AbortSignal.timeout(9000),
    next: { tags: ["catalog"] },
  });
  if (!response.ok) throw new Error("Customer storefront unavailable");
  return response.json() as Promise<T>;
}

export async function fetchCatalog(): Promise<Catalog> {
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
      return defaultCatalog;
    }
    return { domains, hosting: hostCards, vps: vpsCards };
  } catch {
    return defaultCatalog;
  }
}
