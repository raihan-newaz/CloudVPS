import type { Metadata } from "next";
import { SslPage } from "@/components/marketing-pages";


export const metadata: Metadata = { title: "SSL Certificates | CloudVPS", description: "Explore DV, OV, EV and Wildcard SSL certificate options and continue to CloudVPS for current pricing." };
export default function Page() { return <SslPage/>; }
