import type { Metadata } from "next";
import { VpsPage } from "@/components/marketing-pages";
import { fetchCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "VPS Servers | CloudVPS",
  description: "Compare Bangladesh and USA VPS plans with live customer pricing and configure your server.",
};

export default async function Page() {
  const catalog = await fetchCatalog();
  return <VpsPage initialCatalog={catalog} />;
}
