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
  1: { label: "Start small. Build your idea.", text: "ছোট website, lightweight app ও development environment-এর জন্য শুরু করুন।", icon: Terminal },
  2: { label: "More room to grow.", text: "কয়েকটি ছোট website, staging environment বা ছোট business app-এর জন্য।", icon: Layers },
  3: { label: "Your next production app.", text: "Growing e-commerce, API ও production app-এর জন্য balanced resources।", icon: Zap },
  4: { label: "Built around your business.", text: "ERP/CRM, একাধিক app ও বেশি resources প্রয়োজন এমন business workload-এর জন্য।", icon: Database },
  5: { label: "Think bigger. Deploy more.", text: "বড় deployment, একাধিক service ও resource-heavy workload-এর জন্য।", icon: Server },
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
  ["আমার জন্য কোন plan ভালো?", "ছোট project-এর জন্য Start/Plus দিয়ে তুলনা শুরু করুন। Production app-এর জন্য Pro, আর বেশি memory/CPU প্রয়োজন হলে Business বা Enterprise দেখুন। App stack, database ও workload অনুযায়ী প্রয়োজন বদলায়—সন্দেহ হলে support-এর সঙ্গে কথা বলুন।"],
  ["BDIX VPS মানে কি সব ISP-তে একই speed?", "না। Bangladesh location local audience-এর জন্য একটি বিকল্প। Actual connectivity ও latency আপনার ISP, peering/routing এবং workload-এর ওপর নির্ভর করে। নির্দিষ্ট latency বা speed guarantee করা হচ্ছে না।"],
  ["Operating system কীভাবে বেছে নেব?", "এই Plan নিন button থেকে client portal-এর configuration page খুলবে। সেখানে ওই package-এর available operating system ও options দেখে নির্বাচন করুন।"],
  ["Server management ও support কি included?", "Included management-এর scope order করার আগে support-এর সঙ্গে নিশ্চিত করুন। এই page managed service-এর প্রতিশ্রুতি দিচ্ছে না। Account ও service support client portal-এ পাওয়া যাবে।"],
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
      <span className="bdix-eyebrow"><span className="pulse"/> BANGLADESH / BDIX CLOUD VPS</span>
      <h1>আপনার <span lang="en">Business ও Apps</span>-এর জন্য <em>Bangladesh BDIX VPS</em></h1>
      <p>Website, business software কিংবা development project—আপনার workload অনুযায়ী resources বেছে নিন।</p>
      <div className="bdix-hero-actions"><a className="button button-cyan" href="#packages">Packages দেখুন <ArrowRight size={18}/></a><a className="bdix-support-link" href="/contact">সঠিক plan বেছে নিতে সাহায্য নিন <ArrowUpRight size={16}/></a></div>
      <div className="bdix-starting">{starting !== null ? <>শুরু <strong>৳{money(starting)}</strong> / month <small>Final total checkout-এ review করুন</small></> : <>Latest packages ও দাম জানতে <a href={portal + "/vps"}>client portal দেখুন →</a></>}</div>
    </div><div className="bdix-server-art" aria-label="Bangladesh cloud server resources"><div className="bdix-art-top"><span><MapPin size={17}/> Dhaka, Bangladesh</span><span className="bdix-art-chip">KVM CLOUD</span></div><div className="bdix-rack">{[1,2,3].map(n => <div key={n}><Server size={30}/><span/><i/><i/></div>)}</div><div className="bdix-art-bottom"><span><Cpu/> vCPU & RAM</span><span><Database/> NVMe storage</span><span><Globe2/> BDIX VPS</span></div><p>Local infrastructure.<br/><strong>Your next big idea.</strong></p></div></div></section>
    <div className="bdix-proof container"><span><MapPin/> Bangladesh location</span><span><Database/> NVMe packages</span><span><Settings2/> Configure in the portal</span></div>
    <section className="bdix-section" id="packages"><div className="container"><div className="bdix-heading"><span className="section-kicker">01 / FIND YOUR FIT</span><h2>একটি idea থেকে বড় deployment.<br/><em>আপনার জন্য কোন plan?</em></h2><p>সব BDIX package এক জায়গায়। Resources ও monthly price তুলনা করে আপনার পরের ধাপ বেছে নিন।</p></div>
      {plans.length ? <div className="bdix-plans">{plans.map(p => <section id={`plan-${p.id}`} key={p.id} className={`bdix-plan ${p.featured ? "featured" : ""}`}>
        <div className="bdix-plan-heading"><Server size={24}/>{p.featured && <span className="bdix-badge">Featured plan</span>}</div><h3 lang="en">{p.name}</h3><p className="bdix-plan-tagline">{useCases[p.id]?.label ?? "Resources for your next project."}</p><div className="bdix-price">৳{money(p.price)}<small>/ month</small></div>
        <ul><li><Check/>{p.cpu} vCPU</li><li><Check/>{p.ram} GB RAM</li><li><Check/>{p.disk} GB NVMe storage</li><li><Check/>{money(p.bandwidth)} GB bandwidth</li><li><Check/>{p.ipv4} IPv4 address{p.ipv4 === 1 ? "" : "es"}</li></ul>
        <div className="bdix-plan-use"><span>ভালো fit হতে পারে</span><p>{useCases[p.id]?.text ?? "আপনার application-এর resource requirements-এর সঙ্গে মিলিয়ে বেছে নিন।"}</p></div>
        {p.available ? <a className={`button ${p.featured ? "button-cyan" : "button-dark"}`} href={campaignUrl(p.url, search)}>এই Plan নিন <ArrowUpRight size={18}/></a> : <button className="button bdix-unavailable" disabled>বর্তমানে unavailable</button>}
      </section>)}</div> : <div className="bdix-fallback" role="status"><h3>এই মুহূর্তে package prices পাওয়া যাচ্ছে না</h3><p>Latest plans দেখতে client portal খুলুন অথবা team-এর সাহায্য নিন।</p><a className="button button-dark" href={campaignUrl(portal + "/vps", search)}>Portal-এ packages দেখুন <ArrowUpRight size={18}/></a></div>}
      <p className="bdix-price-note">Monthly customer prices • Final total, tax ও add-ons checkout-এ নিশ্চিত করুন। Use cases selection guidance; capacity guarantee নয়।</p>
    </div></section>
    <section className="bdix-section bdix-soft"><div className="container"><div className="bdix-heading"><span className="section-kicker">02 / BUILT FOR YOUR WORK</span><h2>আপনি কী build করছেন?</h2><p>Project-এর stage অনুযায়ী plan তুলনা শুরু করুন। প্রয়োজন বুঝে team-এর সঙ্গে কথা বলুন।</p></div><div className="bdix-use-grid">{Object.entries(useCases).map(([id, item]) => { const Icon = item.icon; return <a href={plans.some(p => p.id === Number(id)) ? `#plan-${id}` : "#packages"} key={id}><Icon/><h3>{item.label}</h3><p>{item.text}</p><span>Plan তুলনা করুন <ArrowRight size={16}/></span></a>; })}</div></div></section>
    <section className="bdix-section bdix-why"><div className="container"><div className="bdix-heading"><span className="section-kicker">03 / LOCAL FOUNDATION. MORE POSSIBILITIES.</span><h2>বাংলাদেশের audience.<br/><em>আপনার নিজের server resources.</em></h2><p>Bangladesh location-এ available BDIX VPS packages থেকে আপনার app-এর প্রয়োজন অনুযায়ী নির্বাচন করুন।</p></div><div className="bdix-benefits"><div><MapPin/><h3>Bangladesh location</h3><p>Dhaka location-এর packages তুলনা করুন। Local audience-এর connectivity আপনার ISP ও network routing-এর ওপর নির্ভর করে।</p></div><div><Cpu/><h3>Resources বুঝে সিদ্ধান্ত</h3><p>vCPU, RAM, NVMe, bandwidth ও IPv4 allocation দেখে বেছে নিন। Application requirements অনুযায়ী server sizing করুন।</p></div><div><Settings2/><h3>Your configuration</h3><p>Client portal-এ available OS ও add-ons বেছে নিয়ে final order review করুন। Management প্রয়োজন হলে আগে scope নিশ্চিত করুন।</p></div></div></div></section>
    <section className="bdix-section bdix-soft"><div className="container"><div className="bdix-heading"><span className="section-kicker">04 / YOUR NEXT STEP</span><h2>Plan থেকে checkout—সহজ তিন ধাপ</h2></div><div className="steps-grid"><div><b>01</b><h3>Plan বেছে নিন</h3><p>Workload অনুযায়ী resources ও monthly price তুলনা করুন।</p></div><div><b>02</b><h3>Server configure করুন</h3><p>Client portal-এ নির্বাচিত plan, location, available OS ও options review করুন।</p></div><div><b>03</b><h3>Final total নিশ্চিত করুন</h3><p>Billing cycle ও add-ons দেখে account দিয়ে checkout complete করুন।</p></div></div></div></section>
    <section className="bdix-section"><div className="container bdix-faq-layout"><div className="bdix-heading"><span className="section-kicker">05 / BEFORE YOU ORDER</span><h2>কিছু প্রশ্ন,<br/>পরিষ্কার উত্তর।</h2><p>আপনার workload নিয়ে আলোচনা করতে চান?</p><a className="button button-dark" href="/contact"><Headphones size={18}/> Team-এর সঙ্গে কথা বলুন</a></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <section className="bdix-closing"><div className="container"><span className="bdix-eyebrow">BUILD YOUR NEXT CHAPTER</span><h2>আপনার next project-এর<br/>foundation বেছে নিন।</h2><p>Start small অথবা বড় resources—সব BDIX packages এখানে।</p><div className="bdix-hero-actions"><a className="button button-cyan" href="#packages">Packages দেখুন <ArrowRight size={18}/></a><a className="bdix-support-link" href="/contact">Support-এর সাহায্য নিন <ArrowUpRight size={18}/></a></div></div></section>
    <div className="bdix-mobile-cta"><span>আপনার workload, আপনার plan</span><a className="button button-cyan" href="#packages">Plans দেখুন <ArrowRight size={16}/></a></div>
  </article></Shell>;
}
