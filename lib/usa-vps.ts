export type UsaVpsPlan = {
  id: number;
  locationId: number;
  name: string;
  price: number;
  cpu: number;
  ram: number;
  disk: number;
  bandwidth: string;
  ipv4: number;
  available: boolean;
  featured: boolean;
  url: string;
};

type RawUsaPlan = {
  id: number;
  location_id: number;
  name: string;
  monthly_price: number | string;
  cpu_cores: number;
  ram_gb: number;
  disk_gb: number;
  bandwidth_display?: string;
  bandwidth_gb?: number;
  ipv4_addresses: number;
  is_active: boolean;
  selling_mode: string;
  stock: number;
  is_featured?: boolean;
};

export async function fetchUsaVpsPlans(): Promise<UsaVpsPlan[]> {
  const response = await fetch("https://cdn.positivepanel.com/api/v1/whitelabel/vps/categories/usa-vps", {
    headers: { "X-Partner-ID": "app.cloudvps.bd", Accept: "application/json" },
    signal: AbortSignal.timeout(9000),
    next: { revalidate: 300, tags: ["catalog"] },
  });
  if (!response.ok) throw new Error("USA VPS catalog unavailable");
  const data = await response.json() as { plans?: RawUsaPlan[] };
  if (!Array.isArray(data.plans)) throw new Error("Invalid USA VPS catalog");

  return data.plans.filter(p => p.is_active && p.selling_mode === "selling").map(p => {
    const price = Number(p.monthly_price);
    if (![p.id, p.location_id, price, p.cpu_cores, p.ram_gb, p.disk_gb, p.ipv4_addresses].every(n => Number.isFinite(n) && n > 0)
      || !Number.isInteger(p.id) || !Number.isInteger(p.location_id)) {
      throw new Error("Incomplete USA VPS plan");
    }
    return {
      id: p.id,
      locationId: p.location_id,
      name: p.name,
      price,
      cpu: p.cpu_cores,
      ram: p.ram_gb,
      disk: p.disk_gb,
      bandwidth: p.bandwidth_display || `${p.bandwidth_gb ?? 0} GB`,
      ipv4: p.ipv4_addresses,
      available: p.stock !== 0,
      featured: Boolean(p.is_featured),
      url: `https://app.cloudvps.bd/vps/configure?product-id=${p.id}&billing-cycle=monthly&location-id=${p.location_id}`,
    };
  });
}
