export type BdixPlan = {
  id: number; locationId: number; name: string; price: number; cpu: number;
  ram: number; disk: number; bandwidth: number; ipv4: number;
  available: boolean; featured: boolean; url: string;
};

type RawPlan = {
  id: number; location_id: number; name: string; monthly_price: string | number;
  cpu_cores: number; ram_mb: number; disk_gb: number; bandwidth_gb: number;
  ipv4_addresses: number; is_active: boolean; is_featured: boolean;
  selling_mode: string; available_stock: number; display_order: number;
};

export async function fetchBdixPlans(): Promise<BdixPlan[]> {
  const response = await fetch("https://cdn.positivepanel.com/api/v1/whitelabel/vps/categories/bdix-vps", {
    headers: { "X-Partner-ID": "app.cloudvps.bd", Accept: "application/json" },
    next: { revalidate: 300, tags: ["catalog", "bdix-catalog"] },
    signal: AbortSignal.timeout(9000),
  });
  if (!response.ok) throw new Error("BDIX catalog unavailable");
  const data = await response.json() as { plans: RawPlan[] };
  if (!Array.isArray(data.plans)) throw new Error("Invalid BDIX catalog");
  return data.plans.filter(p => p.is_active).sort((a, b) => a.display_order - b.display_order).map(p => {
    const price = Number(p.monthly_price);
    if (![p.id, p.location_id, p.cpu_cores, p.ram_mb, p.disk_gb, price].every(n => Number.isFinite(n) && n > 0)
      || !Number.isInteger(p.id) || !Number.isInteger(p.location_id)
      || !Number.isFinite(p.bandwidth_gb) || !Number.isFinite(p.ipv4_addresses)) {
      throw new Error("Incomplete BDIX plan");
    }
    return {
      id: p.id, locationId: p.location_id, name: p.name, price, cpu: p.cpu_cores,
      ram: p.ram_mb / 1024, disk: p.disk_gb, bandwidth: p.bandwidth_gb, ipv4: p.ipv4_addresses,
      featured: Boolean(p.is_featured),
      available: p.selling_mode === "selling" && (p.available_stock === -1 || p.available_stock > 0),
      url: `https://app.cloudvps.bd/vps/configure?product-id=${p.id}&billing-cycle=monthly&location-id=${p.location_id}`,
    };
  });
}
