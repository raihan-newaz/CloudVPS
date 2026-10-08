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
  title: "BDIX VPS Bangladesh | Business ও Apps-এর জন্য CloudVPS",
  description: "Bangladesh BDIX VPS packages তুলনা করুন। vCPU, RAM, NVMe, bandwidth ও মাসিক দাম দেখে আপনার website, business software বা app-এর জন্য plan বেছে নিন।",
  alternates: { canonical: "https://cloudvps.bd/bdix-vps" },
  openGraph: {
    title: "আপনার Business ও Apps-এর জন্য Bangladesh BDIX VPS",
    description: "Start থেকে Enterprise—আপনার workload অনুযায়ী BDIX VPS resources বেছে নিন।",
    url: "https://cloudvps.bd/bdix-vps", siteName: "CloudVPS", type: "website", locale: "bn_BD",
    images: [{ url: "/bdix-og.png", width: 1200, height: 630, alt: "CloudVPS Bangladesh BDIX VPS" }],
  },
  twitter: { card: "summary_large_image", images: ["/bdix-og.png"] },
};

export default async function Page() {
  const plans = await fetchBdixPlans().catch(() => []);
  return <div className={hindSiliguri.variable}><BdixPage plans={plans} /></div>;
}
