import type { Metadata } from "next";
import { HostingPage } from "@/components/marketing-pages";
import { fetchCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Web Hosting | CloudVPS",
  description: "Compare CloudVPS hosting plans and choose the right package for your website.",
};

export default async function Page() {
  const catalog = await fetchCatalog();
  return <HostingPage initialCatalog={catalog} />;
}
