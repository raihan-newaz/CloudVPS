import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "CloudVPS | Domains, Hosting, VPS & SSL in Bangladesh",
  description: "Find your domain, launch your website and scale with CloudVPS hosting, VPS and SSL services in Bangladesh.",
  metadataBase: new URL("https://cloudvps.bd"),
  openGraph: {
    title: "CloudVPS | Domains, Hosting, VPS & SSL",
    description: "Everything your next big idea needs online.",
    url: "https://cloudvps.bd",
    siteName: "CloudVPS",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="//app.cloudvps.bd" />
        <link rel="preconnect" href="https://app.cloudvps.bd" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
