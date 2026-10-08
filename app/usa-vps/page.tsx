import type { Metadata } from "next";
import { fetchUsaVpsPlans } from "@/lib/usa-vps";
import { UsaVpsPage } from "@/components/usa-vps-page";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "USA VPS Hosting | CloudVPS",
  description: "Compare live USA VPS plans with monthly BDT pricing, NVMe storage, bandwidth and direct configuration in the CloudVPS client portal.",
  alternates: { canonical: "https://cloudvps.bd/usa-vps" },
  openGraph: {
    title: "USA VPS Hosting — CloudVPS",
    description: "USA datacenter VPS plans for websites and services serving visitors around the world.",
    url: "https://cloudvps.bd/usa-vps", siteName: "CloudVPS", type: "website", locale: "en_US",
  },
};

export default async function Page() {
  const plans = await fetchUsaVpsPlans().catch(() => []);
  return <UsaVpsPage plans={plans} />;
}
