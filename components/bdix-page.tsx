"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight, Check, Cpu, Database, Globe2, Headphones, Layers, MapPin, Server, Settings2, ShoppingBag, Newspaper } from "lucide-react";
import { Shell } from "@/components/marketing-pages";
import type { BdixPlan } from "@/lib/bdix";

const portal = "https://app.cloudvps.bd";
const money = (n: number) => new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2 }).format(n);
const subscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";
const useCases = [
  { label: "Business & WordPress websites", text: "আপনার brand, services ও content-এর জন্য নিজের VPS-এ website hosting environment তৈরি করুন।", icon: Globe2 },
  { label: "E-commerce & WooCommerce", text: "Product pages, orders ও database নিয়ে আপনার online store-এর hosting সাজান।", icon: ShoppingBag },
  { label: "News portals & LMS", text: "নিয়মিত content publishing ও online learning-এর website এক জায়গায় host করুন।", icon: Newspaper },
  { label: "Agency & client websites", text: "নিজের server environment-এ একাধিক client website-এর hosting organize করুন।", icon: Layers },
];
const features = [
  { title: "Dhaka, Bangladesh", text: "বাংলাদেশকেন্দ্রিক audience-এর জন্য local server location।", icon: MapPin },
  { title: "NVMe storage", text: "Website files, database ও hosting stack-এর জন্য package অনুযায়ী NVMe space।", icon: Database },
  { title: "CPU & RAM allocation", text: "আপনার প্রয়োজন অনুযায়ী vCPU ও memory নির্বাচন করার একাধিক package।", icon: Cpu },
  { title: "IPv4 included", text: "প্রতিটি package-এর included IPv4 allocation পরিষ্কারভাবে দেখানো আছে।", icon: Globe2 },
  { title: "OS configuration", text: "Order-এর সময় portal-এ available operating system ও server options বেছে নিন।", icon: Settings2 },
  { title: "KVM cloud VPS", text: "KVM virtual server environment-এ আপনার OS ও website hosting stack configure করুন।", icon: Server },
];

export function campaignUrl(href: string, search: string) {
  const url = new URL(href);
  const query = new URLSearchParams(search);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = query.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

const faqs = [
  ["বাংলাদেশি visitor-এর জন্য BDIX VPS কেন বেছে নেব?", "BDIX স্থানীয় network-গুলোর মধ্যে internet traffic exchange করতে সাহায্য করে। আপনার visitor-এর ISP থেকে server পর্যন্ত local routing থাকলে দূরের international route এড়িয়ে network latency কমতে পারে। বাংলাদেশকেন্দ্রিক website-এর জন্য তাই local hosting বিবেচনা করা যায়।"],
  ["কীভাবে VPS package বেছে নেব?", "আপনার website-এর CPU, RAM, storage ও bandwidth-এর প্রয়োজন মিলিয়ে package বেছে নিন। Website সংখ্যা দিয়ে একা capacity বোঝা যায় না—plugins, database, caching ও concurrent requests-ও গুরুত্বপূর্ণ। আপনার current setup team-কে জানালে resources নিয়ে আলোচনা করতে পারবেন।"],
  ["WordPress বা WooCommerce website host করতে পারব?", "উপযুক্ত OS, web server, PHP ও database configure করে WordPress বা WooCommerce host করা যায়। VPS নেওয়া মানেই pre-installed WordPress বা managed hosting নয়। Setup বা migration-এ সাহায্য প্রয়োজন হলে আগে support-এর সঙ্গে scope ও খরচ নিশ্চিত করুন।"],
  ["সব ISP ও mobile network-এ কি একই latency পাব?", "না। ISP-এর peering, mobile network, routing ও congestion অনুযায়ী latency বদলায়। Website-এর code, images, plugins, database ও caching-ও load time-এ প্রভাব ফেলে। Local hosting network delay কমাতে সাহায্য করতে পারে; নির্দিষ্ট ping বা page-load time নিশ্চিত করে না।"],
  ["Operating system কীভাবে বেছে নেব?", "Order now button থেকে client portal-এর configuration page খুলবে। সেখানে ওই package-এর available operating system ও options দেখে নির্বাচন করুন।"],
  ["cPanel, website migration বা server management কি included?", "Control panel license, migration ও server management-এর availability এবং আলাদা খরচ order করার আগে support-এর সঙ্গে নিশ্চিত করুন। Website setup ও maintenance-এর দায়িত্বও আগে ঠিক করে নিন। Account ও service support client portal থেকে নিন।"],
  ["Bandwidth ও IPv4 কত পাব?", "প্রতিটি package card-এ catalog-এর bandwidth allocation ও included IPv4 দেখানো আছে। এগুলো connection speed নয়। Usage policy ও extra IPv4-এর খরচ portal/support থেকে নিশ্চিত করুন।"],
];

export function BdixPage({ plans }: { plans: BdixPlan[] }) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const available = plans.filter(p => p.available);
  const starting = available.length ? Math.min(...available.map(p => p.price)) : null;
  return <Shell current="/bdix-vps"><article className="bdix-page" lang="bn">
    <section className="bdix-hero"><div className="container bdix-hero-grid"><div>
      <span className="bdix-eyebrow"><span className="pulse"/> LOCAL HOSTING. CLOSER TO YOUR CUSTOMERS.</span>
      <h1>আপনার Website-এর জন্য <em lang="en">Bangladesh BDIX VPS</em></h1>
      <p>বাংলাদেশি visitor-দের জন্য local hosting বেছে নিন। Dhaka server location, NVMe storage এবং আপনার প্রয়োজনমতো CPU ও RAM—নিজের website hosting সাজান CloudVPS-এ।</p>
      <ul className="bdix-hero-points"><li><Check/> Bangladesh location</li><li><Check/> NVMe VPS packages</li><li><Check/> Monthly BDT pricing</li></ul>
      <div className="bdix-hero-actions"><a className="button button-cyan" href="#packages">Packages দেখুন <ArrowRight size={18}/></a><a className="bdix-support-link" href="/contact">সঠিক plan বেছে নিতে সাহায্য নিন <ArrowUpRight size={16}/></a></div>
      <div className="bdix-starting">{starting !== null ? <>শুরু <strong>৳{money(starting)}</strong> / month <small>Final total checkout-এ review করুন</small></> : <>Latest packages ও দাম জানতে <a href={portal + "/vps"}>client portal দেখুন →</a></>}</div>
    </div><div className="bdix-web-art" aria-label="Illustration of a website hosted in Dhaka"><div className="bdix-web-toolbar"><span><i/><i/><i/></span><span><Globe2 size={14}/> your-website.bd</span></div><div className="bdix-web-preview" aria-hidden="true"><div className="bdix-mock-nav"><b>Your brand</b><span/><span/><span/></div><div className="bdix-mock-body"><div><small>BUILT FOR YOUR AUDIENCE</small><strong>Your website.<br/>Your possibilities.</strong><span/><span/><b>Explore more →</b></div><div className="bdix-mock-server"><Server/><Server/><Server/></div></div><div className="bdix-mock-cards"><span/><span/><span/></div></div><div className="bdix-web-location"><span><MapPin/> Dhaka, Bangladesh</span><strong>LOCAL SERVER LOCATION</strong></div><div className="bdix-web-resources"><span><Cpu/> vCPU + RAM</span><span><Database/> NVMe storage</span><span><Globe2/> BDIX VPS</span></div></div></div></section>
    <div className="bdix-proof container"><span><MapPin/> Bangladesh location</span><span><Database/> NVMe packages</span><span><Settings2/> Configure in the portal</span></div>
    <section className="bdix-section" id="packages"><div className="container"><div className="bdix-heading"><span className="section-kicker">01 / PLANS & PRICING</span><h2>আপনার প্রয়োজনমতো resources.<br/><em>বেছে নিন BDIX VPS package।</em></h2><p>Monthly price, CPU, RAM ও NVMe storage পাশাপাশি তুলনা করুন। প্রতিটি package-এর সম্পূর্ণ specification দেখেই সিদ্ধান্ত নিন।</p></div>
      {plans.length ? <div className="bdix-plans">{plans.map(p => <section id={`plan-${p.id}`} key={p.id} className={`bdix-plan ${p.featured ? "featured" : ""}`}>
        <div className="bdix-plan-heading"><Server size={24}/>{p.featured && <span className="bdix-badge">Featured plan</span>}</div><h3 lang="en">{p.name}</h3><p className="bdix-plan-tagline"><MapPin size={13}/> Bangladesh location</p><div className="bdix-price">৳{money(p.price)}<small>/ month</small></div>
        <ul><li><Check/>{p.cpu} vCPU</li><li><Check/>{p.ram} GB RAM</li><li><Check/>{p.disk} GB NVMe storage</li><li><Check/>{money(p.bandwidth)} GB bandwidth</li><li><Check/>{p.ipv4} IPv4 address{p.ipv4 === 1 ? "" : "es"}</li></ul>
        {p.available ? <a className={`button ${p.featured ? "button-cyan" : "button-dark"}`} href={campaignUrl(p.url, search)} aria-label={`${p.name} — Order now`}>Order now <ArrowUpRight size={18}/></a> : <button className="button bdix-unavailable" disabled>বর্তমানে unavailable</button>}
      </section>)}</div> : <div className="bdix-fallback" role="status"><h3>এই মুহূর্তে package prices পাওয়া যাচ্ছে না</h3><p>Latest plans দেখতে client portal খুলুন অথবা team-এর সাহায্য নিন।</p><a className="button button-dark" href={campaignUrl(portal + "/vps", search)}>Portal-এ packages দেখুন <ArrowUpRight size={18}/></a></div>}
      <p className="bdix-price-note">Prices in BDT / month। Checkout-এর আগে selected plan, billing cycle, tax ও add-ons সহ final total মিলিয়ে নিন।</p>
    </div></section>
    <section className="bdix-section bdix-soft"><div className="container"><div className="bdix-heading"><span className="section-kicker">02 / YOUR HOSTING FOUNDATION</span><h2>Website hosting-এর জন্য<br/><em>যে features গুরুত্বপূর্ণ।</em></h2><p>Local location থেকে server resources—আপনার hosting-এর প্রয়োজনীয় বিষয়গুলো এক নজরে।</p></div><div className="bdix-feature-grid">{features.map(item => { const Icon=item.icon; return <div key={item.title}><Icon/><h3>{item.title}</h3><p>{item.text}</p></div>; })}</div></div></section>
    <section className="bdix-section bdix-why"><div className="container"><div className="bdix-heading"><span className="section-kicker">03 / LOCAL VISITORS. LOCAL HOSTING.</span><h2>Visitor বাংলাদেশে?<br/><em>Website-এর server-ও থাকুক কাছে।</em></h2><p>BDIX হলো Bangladesh Internet Exchange। এটি connected network-গুলোর মধ্যে local traffic স্থানীয়ভাবে exchange করার সুযোগ দেয়। Route ছোট হলে visitor থেকে server-এ request পৌঁছানোর network delay কমতে পারে।</p></div>
      <div className="bdix-routing" aria-label="Local routing explained"><div className="bdix-route-label"><Globe2/><strong>Local route কীভাবে সাহায্য করে?</strong><span>Illustration • live network test নয়</span></div><div className="bdix-route-flow"><span>বাংলাদেশি visitor<small>আপনার customer</small></span><ArrowRight aria-hidden="true"/><span>ISP + local peering<small>Available network route</small></span><ArrowRight aria-hidden="true"/><span>Dhaka VPS<small>আপনার website</small></span></div><p>Local peering থাকলে দূরের international route-এর প্রয়োজন কমতে পারে। ফলাফল ISP, routing ও server configuration অনুযায়ী বদলায়।</p></div>
      <div className="bdix-benefits"><div><MapPin/><h3>কম network latency-এর সুযোগ</h3><p>বাংলাদেশি audience-এর জন্য স্থানীয় server location বিবেচনা করুন। Local route পাওয়া গেলে server response-এর network অংশ দ্রুত হতে পারে।</p></div><div><Cpu/><h3>Website অনুযায়ী resources</h3><p>WordPress plugins, product catalog ও database-এর জন্য RAM, CPU ও storage মিলিয়ে নিন। বড় website-এর জন্য বড় package তুলনা করুন।</p></div><div><Settings2/><h3>Hosting setup আপনার মতো</h3><p>Available OS ও options দিয়ে server configure করুন। Website migration, control panel বা management প্রয়োজন হলে team-এর সঙ্গে আগে আলোচনা করুন।</p></div></div>
      <p className="bdix-network-note">Local hosting-এর পাশাপাশি images, caching, plugins ও database optimize করাও জরুরি। কম latency মানেই নির্দিষ্ট page-load time নয়। <a href="https://bdix.net/" target="_blank" rel="noopener noreferrer">BDIX সম্পর্কে জানুন <ArrowUpRight size={13}/></a></p>
    </div></section>
    <section className="bdix-section"><div className="container"><div className="bdix-heading"><span className="section-kicker">04 / ONE VPS. MANY POSSIBILITIES.</span><h2>Website hosting,<br/><em>আপনার নিজের মতো।</em></h2><p>উপযুক্ত software stack configure করে বিভিন্ন ধরনের website host করুন। আপনার resources ও setup অনুযায়ী hosting environment সাজান।</p></div><div className="bdix-use-grid bdix-applications">{useCases.map(item => { const Icon=item.icon; return <div key={item.label}><Icon/><h3>{item.label}</h3><p>{item.text}</p></div>; })}</div><div className="bdix-support-band"><div><h3>Website move করছেন, বা setup-এ সাহায্য দরকার?</h3><p>আপনার current hosting ও requirements জানান। Migration, control panel ও management options নিয়ে আগে আলোচনা করুন।</p></div><a className="button button-dark" href="/contact">Talk to our team <ArrowUpRight size={17}/></a></div></div></section>
    <section className="bdix-section bdix-soft"><div className="container"><div className="bdix-heading"><span className="section-kicker">05 / START HOSTING</span><h2>আপনার পরের ধাপ, সহজ তিনটি step।</h2></div><div className="steps-grid"><div><b>01</b><h3>Package বেছে নিন</h3><p>CPU, RAM, storage ও monthly price মিলিয়ে আপনার VPS নির্বাচন করুন।</p></div><div><b>02</b><h3>Configuration review</h3><p>Client portal-এ plan, location ও available operating system বেছে নিন।</p></div><div><b>03</b><h3>Checkout & hosting setup</h3><p>Final total review করে checkout করুন। VPS ready হলে আপনার website hosting setup করুন।</p></div></div></div></section>
    <section className="bdix-section"><div className="container bdix-faq-layout"><div className="bdix-heading"><span className="section-kicker">06 / COMMON QUESTIONS</span><h2>BDIX VPS নিয়ে<br/>আপনার প্রশ্নের উত্তর।</h2><p>Website hosting বা server setup নিয়ে কথা বলতে চান? CloudVPS team-এর সঙ্গে যোগাযোগ করুন।</p><a className="button button-dark" href="/contact"><Headphones size={18}/> Talk to our team</a></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className="bdix-closing"><div className="container"><span className="bdix-eyebrow">YOUR WEBSITE. YOUR LOCAL AUDIENCE.</span><h2>বাংলাদেশি customer-এর জন্য<br/>local hosting বেছে নিন।</h2><p>Business website থেকে online shop—আপনার site-এর প্রয়োজন মিলিয়ে BDIX VPS plan তুলনা করুন।</p><div className="bdix-hero-actions"><a className="button button-cyan" href="#packages">Packages দেখুন <ArrowRight size={18}/></a><a className="bdix-support-link" href="/contact">Website নিয়ে কথা বলুন <ArrowUpRight size={18}/></a></div></div></section>
    <div className="bdix-mobile-cta"><span>আপনার website-এর জন্য BDIX VPS</span><a className="button button-cyan" href="#packages">Plans দেখুন <ArrowRight size={16}/></a></div>
  </article></Shell>;
}
