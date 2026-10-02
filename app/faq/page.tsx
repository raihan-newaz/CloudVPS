import type { Metadata } from "next";
import { FaqPage } from "@/components/marketing-pages";


export const metadata: Metadata = { title: "Frequently Asked Questions | CloudVPS", description: "Answers about CloudVPS domains, hosting, VPS, ordering and account management." };
export default function Page() { return <FaqPage/>; }
