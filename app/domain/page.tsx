import type { Metadata } from "next";
import { DomainPage } from "@/components/marketing-pages";
import { fetchCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Domains | CloudVPS",
  description: "Search domain availability and see live customer prices before registering through CloudVPS.",
};

export default async function Page() {
  const catalog = await fetchCatalog();
  return <DomainPage initialCatalog={catalog} />;
}
