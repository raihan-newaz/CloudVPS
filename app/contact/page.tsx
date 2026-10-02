import type { Metadata } from "next";
import { ContactPage } from "@/components/marketing-pages";


export const metadata: Metadata = { title: "Contact | CloudVPS", description: "Contact CloudVPS about domains, hosting, VPS and support." };
export default function Page() { return <ContactPage/>; }
