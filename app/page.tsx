import HomePage from "@/components/home-page";
import { fetchCatalog } from "@/lib/catalog";

export default async function Page() {
  const catalog = await fetchCatalog();
  return <HomePage initialCatalog={catalog} />;
}