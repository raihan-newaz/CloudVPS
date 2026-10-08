"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight, Check, Cpu, Database, Globe2, Headphones, Layers, MapPin, Server, Settings2, Terminal, Zap } from "lucide-react";
import { Shell } from "@/components/marketing-pages";
import type { BdixPlan } from "@/lib/bdix";

const portal = "https://app.cloudvps.bd";
const money = (n: number) => new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2 }).format(n);
const subscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";
const useCases: Record<number, { label: string; text: string; icon: typeof Terminal }> = {
  1: { label: "ছোট website দিয়ে শুরু", text: "Business পরিচিতি, portfolio বা ছোট WordPress website host করার জন্য প্রথমে এই resources তুলনা করুন।", icon: Globe2 },
  2: { label: "WordPress-এর জন্য বাড়তি RAM", text: "Content-rich WordPress site বা কয়েকটি ছোট website-এর জন্য বেশি RAM ও storage বেছে নিন।", icon: Layers },
  3: { label: "আপনার online shop-এর জন্য", text: "WooCommerce বা e-commerce website-এর catalog, database ও checkout-এর প্রয়োজন অনুযায়ী plan তুলনা করুন।", icon: Zap },
  4: { label: "একাধিক business website", text: "Agency বা একাধিক business website একই server-এ host করতে বেশি CPU, RAM ও storage বিবেচনা করুন।", icon: Database },
  5: { label: "বড় website, বড় resources", text: "বড় content portal, একাধিক store বা resource-intensive website-এর জন্য এই package দিয়ে sizing শুরু করুন।", icon: Server },
};

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
  ["আমার website-এর জন্য কোন plan ভালো?", "ছোট business website-এর জন্য Start, বেশি RAM দরকার হলে Plus, আর online shop-এর জন্য Pro দিয়ে তুলনা শুরু করুন। একাধিক বা বড় website-এর জন্য Business/Enterprise দেখুন। Plugins, database, caching ও একই সময়ে কত request আসে—এসব অনুযায়ী প্রয়োজন বদলায়।"],
  ["WordPress বা WooCommerce website host করতে পারব?", "উপযুক্ত OS, web server, PHP ও database configure করে WordPress বা WooCommerce host করা যায়। VPS নেওয়া মানেই pre-installed WordPress বা managed hosting নয়। Setup বা migration-এ সাহায্য প্রয়োজন হলে আগে support-এর সঙ্গে scope ও খরচ নিশ্চিত করুন।"],
  ["সব ISP ও mobile network-এ কি একই latency পাব?", "না। ISP-এর peering, mobile network, routing ও congestion অনুযায়ী latency বদলায়। Website-এর code, images, plugins, database ও caching-ও load time-এ প্রভাব ফেলে। Local hosting network delay কমাতে সাহায্য করতে পারে; নির্দিষ্ট ping বা page-load time নিশ্চিত করে না।"],
  ["Operating system কীভাবে বেছে নেব?", "এই Plan নিন button থেকে client portal-এর configuration page খুলবে। সেখানে ওই package-এর available operating system ও options দেখে নির্বাচন করুন।"],
  ["cPanel, website migration বা server management কি included?", "Control panel license, migration ও server management-এর availability এবং আলাদা খরচ order করার আগে support-এর সঙ্গে নিশ্চিত করুন। Website setup ও maintenance-এর দায়িত্বও আগে ঠিক করে নিন। Account ও service support client portal থেকে নিন।"],
  ["Bandwidth ও IPv4 কত পাব?", "প্রতিটি package card-এ catalog-এর bandwidth allocation ও included IPv4 দেখানো আছে। এগুলো connection speed নয়। Usage policy ও extra IPv4-এর খরচ portal/support থেকে নিশ্চিত করুন।"],
  ["দাম ও billing কীভাবে কাজ করে?", "এখানে মাসিক customer price দেখানো হয়। Billing cycle, tax, add-ons ও final payable total client portal-এর checkout-এ review করুন। অন্য billing cycle-এর জন্য portal-এর price-ই অনুসরণ করুন।"],
  ["Backup বা DDoS protection included আছে?", "এই page এগুলো included হিসেবে দেখাচ্ছে না। আপনার প্রয়োজন থাকলে purchase-এর আগে support-এর সঙ্গে availability ও terms নিশ্চিত করুন।"],
];

export function BdixPage({ plans }: { plans: BdixPlan[] }) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const available = plans.filter(p => p.available);
  const starting = available.length ? Math.min(...available.map(p => p.price)) : null;
  return <Shell current="/bdix-vps"><article className="bdix-page" lang="bn">
    <section className="bdix-hero"><div className="container bdix-hero-grid"><div>
      <span className="bdix-eyebrow"><span className="pulse"/> WEBSITE HOSTING / DHAKA, BANGLADESH</span>
      <h1>বাংলাদেশি visitor-এর জন্য <em lang="en">BDIX VPS Hosting</em></h1>
      <p>আপনার business website, WordPress কিংবা online shop host করুন বাংলাদেশে। Local routing-এর সুবিধায় network latency কমানোর সুযোগ, সঙ্গে website-এর প্রয়োজন অনুযায়ী CPU, RAM ও NVMe storage।</p>
      <ul className="bdix-hero-points"><li><Check/> Dhaka server location</li><li><Check/> Website অনুযায়ী VPS resources</li><li><Check/> মাসিক package, পরিষ্কার দাম</li></ul>
      <div className="bdix-hero-actions"><a className="button button-cyan" href="#packages">Packages দেখুন <ArrowRight size={18}/></a><a className="bdix-support-link" href="/contact">সঠিক plan বেছে নিতে সাহায্য নিন <ArrowUpRight size={16}/></a></div>
      <div className="bdix-starting">{starting !== null ? <>শুরু <strong>৳{money(starting)}</strong> / month <small>Final total checkout-এ review করুন</small></> : <>Latest packages ও দাম জানতে <a href={portal + "/vps"}>client portal দেখুন →</a></>}</div>
    </div><div className="bdix-server-art" aria-label="Website hosting on a server in Dhaka, Bangladesh"><div className="bdix-art-top"><span><MapPin size={17}/> Dhaka, Bangladesh</span><span className="bdix-art-chip">WEBSITE HOSTING</span></div><div className="bdix-rack">{[1,2,3].map(n => <div key={n}><Server size={30}/><span/><i/><i/></div>)}</div><div className="bdix-art-bottom"><span><Cpu/> vCPU & RAM</span><span><Database/> NVMe storage</span><span><Globe2/> BDIX VPS</span></div><p>Your website. Hosted locally.<br/><strong>Closer to your visitors.</strong></p></div></div></section>
    <div className="bdix-proof container"><span><MapPin/> Bangladesh location</span><span><Database/> NVMe packages</span><span><Settings2/> Configure in the portal</span></div>
    <section className="bdix-section" id="packages"><div className="container"><div className="bdix-heading"><span className="section-kicker">01 / WEBSITE HOSTING PLANS</span><h2>ছোট business site থেকে online shop.<br/><em>আপনার website-এর জন্য সঠিক VPS।</em></h2><p>সব BDIX package এক জায়গায়। Website-এর ধরন, database ও traffic অনুযায়ী resources তুলনা করুন।</p></div>
      {plans.length ? <div className="bdix-plans">{plans.map(p => <section id={`plan-${p.id}`} key={p.id} className={`bdix-plan ${p.featured ? "featured" : ""}`}>
        <div className="bdix-plan-heading"><Server size={24}/>{p.featured && <span className="bdix-badge">Featured plan</span>}</div><h3 lang="en">{p.name}</h3><p className="bdix-plan-tagline">{useCases[p.id]?.label ?? "Resources for your next project."}</p><div className="bdix-price">৳{money(p.price)}<small>/ month</small></div>
        <ul><li><Check/>{p.cpu} vCPU</li><li><Check/>{p.ram} GB RAM</li><li><Check/>{p.disk} GB NVMe storage</li><li><Check/>{money(p.bandwidth)} GB bandwidth</li><li><Check/>{p.ipv4} IPv4 address{p.ipv4 === 1 ? "" : "es"}</li></ul>
        <div className="bdix-plan-use"><span>এই plan কার জন্য?</span><p>{useCases[p.id]?.text ?? "আপনার website-এর resource requirements-এর সঙ্গে মিলিয়ে বেছে নিন।"}</p></div>
        {p.available ? <a className={`button ${p.featured ? "button-cyan" : "button-dark"}`} href={campaignUrl(p.url, search)}>এই Plan নিন <ArrowUpRight size={18}/></a> : <button className="button bdix-unavailable" disabled>বর্তমানে unavailable</button>}
        {p.available && <small className="bdix-selection-note">Portal-এ {p.name} selected আছে কিনা নিশ্চিত করুন।</small>}
      </section>)}</div> : <div className="bdix-fallback" role="status"><h3>এই মুহূর্তে package prices পাওয়া যাচ্ছে না</h3><p>Latest plans দেখতে client portal খুলুন অথবা team-এর সাহায্য নিন।</p><a className="button button-dark" href={campaignUrl(portal + "/vps", search)}>Portal-এ packages দেখুন <ArrowUpRight size={18}/></a></div>}
      <p className="bdix-price-note">Monthly customer prices • Final total, tax ও add-ons checkout-এ নিশ্চিত করুন। Use cases selection guidance; capacity guarantee নয়।</p>
    </div></section>
    <section className="bdix-section bdix-soft"><div className="container"><div className="bdix-heading"><span className="section-kicker">02 / FIND YOUR WEBSITE TYPE</span><h2>আপনার website কোন ধরনের?</h2><p>Business পরিচিতি, WordPress, online shop অথবা একাধিক client site—নিচের use case থেকে plan তুলনা শুরু করুন।</p></div><div className="bdix-use-grid">{Object.entries(useCases).map(([id, item]) => { const Icon = item.icon; return <a href={plans.some(p => p.id === Number(id)) ? `#plan-${id}` : "#packages"} key={id}><Icon/><h3>{item.label}</h3><p>{item.text}</p><span>Plan তুলনা করুন <ArrowRight size={16}/></span></a>; })}</div></div></section>
    <section className="bdix-section bdix-why"><div className="container"><div className="bdix-heading"><span className="section-kicker">03 / LOCAL VISITORS. LOCAL HOSTING.</span><h2>Visitor বাংলাদেশে?<br/><em>Website-এর server-ও থাকুক কাছে।</em></h2><p>BDIX হলো Bangladesh Internet Exchange। এটি connected network-গুলোর মধ্যে local traffic স্থানীয়ভাবে exchange করার সুযোগ দেয়। Route ছোট হলে visitor থেকে server-এ request পৌঁছানোর network delay কমতে পারে।</p></div>
      <div className="bdix-routing" aria-label="Local routing explained"><div className="bdix-route-label"><Globe2/><strong>Local route কীভাবে সাহায্য করে?</strong><span>Illustration • live network test নয়</span></div><div className="bdix-route-flow"><span>বাংলাদেশি visitor<small>আপনার customer</small></span><ArrowRight aria-hidden="true"/><span>ISP + local peering<small>Available network route</small></span><ArrowRight aria-hidden="true"/><span>Dhaka VPS<small>আপনার website</small></span></div><p>Local peering থাকলে দূরের international route-এর প্রয়োজন কমতে পারে। ফলাফল ISP, routing ও server configuration অনুযায়ী বদলায়।</p></div>
      <div className="bdix-benefits"><div><MapPin/><h3>কম network latency-এর সুযোগ</h3><p>বাংলাদেশি audience-এর জন্য স্থানীয় server location বিবেচনা করুন। Local route পাওয়া গেলে server response-এর network অংশ দ্রুত হতে পারে।</p></div><div><Cpu/><h3>Website অনুযায়ী resources</h3><p>WordPress plugins, product catalog ও database-এর জন্য RAM, CPU ও storage মিলিয়ে নিন। বড় website-এর জন্য বড় package তুলনা করুন।</p></div><div><Settings2/><h3>Hosting setup আপনার মতো</h3><p>Available OS ও options দিয়ে server configure করুন। Website migration, control panel বা management প্রয়োজন হলে team-এর সঙ্গে আগে আলোচনা করুন।</p></div></div>
      <p className="bdix-network-note">Local hosting-এর পাশাপাশি images, caching, plugins ও database optimize করাও জরুরি। কম latency মানেই নির্দিষ্ট page-load time নয়। <a href="https://bdix.net/" target="_blank" rel="noopener noreferrer">BDIX সম্পর্কে জানুন <ArrowUpRight size={13}/></a></p>
    </div></section>
    <section className="bdix-section bdix-soft"><div className="container"><div className="bdix-heading"><span className="section-kicker">04 / START HOSTING</span><h2>Website hosting শুরু করার তিন ধাপ</h2></div><div className="steps-grid"><div><b>01</b><h3>Website অনুযায়ী plan</h3><p>আপনার website-এর ধরন, RAM ও storage-এর প্রয়োজন মিলিয়ে monthly package বেছে নিন।</p></div><div><b>02</b><h3>Server configure করুন</h3><p>Client portal-এ plan, location ও available OS review করুন। Setup-এ সাহায্য লাগলে team-কে জানান।</p></div><div><b>03</b><h3>Review করে checkout</h3><p>Final price ও options নিশ্চিত করুন। VPS ready হলে website setup বা migration-এর পর domain connect করুন।</p></div></div></div></section>
    <section className="bdix-section"><div className="container bdix-faq-layout"><div className="bdix-heading"><span className="section-kicker">05 / WEBSITE HOSTING FAQ</span><h2>Website hosting নিয়ে<br/>আপনার প্রশ্নের উত্তর।</h2><p>Website-এর জন্য কত resources দরকার বুঝতে পারছেন না? আপনার site-এর ধরন team-কে জানান।</p><a className="button button-dark" href="/contact"><Headphones size={18}/> Plan বেছে নিতে সাহায্য নিন</a></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className="bdix-closing"><div className="container"><span className="bdix-eyebrow">YOUR WEBSITE. YOUR LOCAL AUDIENCE.</span><h2>বাংলাদেশি customer-এর জন্য<br/>local hosting বেছে নিন।</h2><p>Business website থেকে online shop—আপনার site-এর প্রয়োজন মিলিয়ে BDIX VPS plan তুলনা করুন।</p><div className="bdix-hero-actions"><a className="button button-cyan" href="#packages">Packages দেখুন <ArrowRight size={18}/></a><a className="bdix-support-link" href="/contact">Website নিয়ে কথা বলুন <ArrowUpRight size={18}/></a></div></div></section>
    <div className="bdix-mobile-cta"><span>আপনার website-এর জন্য BDIX VPS</span><a className="button button-cyan" href="#packages">Plans দেখুন <ArrowRight size={16}/></a></div>
  </article></Shell>;
}
