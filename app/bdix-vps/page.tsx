import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { fetchBdixPlans } from "@/lib/bdix";
import { BdixPage } from "@/components/bdix-page";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind-siliguri",
});

export const revalidate = 300;
export const metadata: Metadata = {
  title: "BDIX VPS Hosting Bangladesh | Website Hosting — CloudVPS",
  description: "বাংলাদেশি visitor-এর জন্য Dhaka location-এ website host করুন। Business website, WordPress ও online shop-এর BDIX VPS monthly plans, RAM, CPU ও NVMe তুলনা করুন।",
  alternates: { canonical: "https://cloudvps.bd/bdix-vps" },
  openGraph: {
    title: "বাংলাদেশি visitor-এর জন্য BDIX VPS Hosting",
    description: "আপনার business website, WordPress ও online shop-এর জন্য Bangladesh location-এ VPS plans তুলনা করুন।",
    url: "https://cloudvps.bd/bdix-vps", siteName: "CloudVPS", type: "website", locale: "bn_BD",
    images: [{ url: "/bdix-og.png", width: 1200, height: 630, alt: "CloudVPS Bangladesh BDIX VPS" }],
  },
  twitter: { card: "summary_large_image", images: ["/bdix-og.png"] },
};

export default async function Page() {
  const plans = await fetchBdixPlans().catch(() => []);
  return <div className={hindSiliguri.variable}><BdixPage plans={plans} /></div>;
}
