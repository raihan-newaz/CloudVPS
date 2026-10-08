"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight, Check, Cpu, Database, Globe2, Headphones, MapPin, Network, Server, ShieldCheck } from "lucide-react";
import { Shell } from "@/components/marketing-pages";
import type { UsaVpsPlan } from "@/lib/usa-vps";

const portal = "https://app.cloudvps.bd";
const money = (n: number) => new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2 }).format(n);
const subscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

export function campaignUrl(href: string, search: string) {
  const url = new URL(href);
  const query = new URLSearchParams(search);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = query.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

const applications = [
  { title: "Global business websites", text: "Host a company site for customers and teams across multiple regions.", icon: Globe2 },
  { title: "International stores", text: "Configure a server for an online store with visitors outside Bangladesh.", icon: Network },
  { title: "Web apps & APIs", text: "Choose CPU, memory and storage for an application stack you manage.", icon: Cpu },
  { title: "Development environments", text: "Set up a remote environment for testing, staging or development work.", icon: Server },
];
const faqs = [
  ["USA VPS কার জন্য উপযুক্ত?", "যেসব website বা online service-এর visitor USA বা বিভিন্ন দেশে আছেন, তারা USA location বিবেচনা করতে পারেন। Visitor-এর অবস্থান ও ISP অনুযায়ী network route বদলায়।"],
  ["Bangladesh-এর visitor-এর জন্য USA VPS কি ভালো হবে?", "আপনার প্রধান visitor যদি বাংলাদেশে থাকেন, local BDIX VPS তুলনা করে দেখুন। USA VPS থেকে Bangladesh-এ network route দীর্ঘ হতে পারে; ফলাফল ISP ও routing অনুযায়ী বদলায়।"],
  ["কোন plan বেছে নেব?", "প্রতিটি plan-এর CPU, RAM, NVMe, bandwidth ও IPv4 মিলিয়ে আপনার software এবং expected workload অনুযায়ী নির্বাচন করুন। নির্দিষ্ট visitor সংখ্যা বা performance কেবল resources দেখে নিশ্চিত করা যায় না।"],
  ["Operating system কোথায় নির্বাচন করব?", "Plan-এর button চাপলে client portal-এর configuration page খুলবে। সেখানে available operating system ও configuration option দেখে নির্বাচন করুন।"],
];

export function UsaVpsPage({ plans }: { plans: UsaVpsPlan[] }) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const active = plans.filter(plan => plan.available);
  const starting = active.length ? Math.min(...active.map(plan => plan.price)) : null;

  return <Shell current="/usa-vps"><article className="usa-vps-page">
    <section className="usa-vps-hero"><div className="container usa-vps-hero-grid"><div>
      <span className="usa-vps-eyebrow"><span className="pulse"/> USA VPS · GLOBAL REACH</span>
      <h1>আপনার website-এর জন্য <em>USA VPS hosting</em></h1>
      <p>USA location-এ VPS বেছে নিয়ে international audience-এর জন্য নিজের website hosting environment configure করুন। Monthly price ও server resources এক জায়গায় তুলনা করুন।</p>
      <ul className="usa-vps-points"><li><Check/> United States datacenter</li><li><Check/> NVMe VPS packages</li><li><Check/> Direct client portal configuration</li></ul>
      <div className="usa-vps-actions"><a className="button button-cyan" href="#usa-packages">Plans দেখুন <ArrowRight size={18}/></a><a className="usa-vps-support" href="/contact">সঠিক plan বেছে নিতে সাহায্য নিন <ArrowUpRight size={16}/></a></div>
      <div className="usa-vps-starting">{starting !== null ? <>শুরু <strong>৳{money(starting)}</strong> / month <small>Final total checkout-এ review করুন</small></> : <>Latest price জানতে <a href={portal + "/vps"}>client portal দেখুন →</a></>}</div>
    </div><div className="usa-vps-visual" aria-label="USA VPS server illustration"><div className="usa-vps-visual-top"><span><i/><i/><i/></span><span><Globe2 size={15}/> United States</span><b>VPS / CLOUD</b></div><div className="usa-vps-rack"><div><Server/><span>Compute resources</span><i/></div><div><Database/><span>NVMe storage</span><i/></div><div><Network/><span>Global network</span><i/></div></div><div className="usa-vps-visual-bottom"><span><MapPin/> United States location</span><span>CONFIGURE IN PORTAL</span></div></div></div></section>

    <div className="usa-vps-proof container"><span><MapPin/> United States location</span><span><Database/> Package-based NVMe storage</span><span><ShieldCheck/> Live monthly customer prices</span></div>

    <section className="usa-vps-section" id="usa-packages"><div className="container"><div className="usa-vps-heading"><span className="section-kicker">01 / USA VPS PLANS</span><h2>আপনার workload অনুযায়ী<br/><em>USA VPS package তুলনা করুন।</em></h2><p>সব active USA VPS package-এর live monthly price এবং included resources দেখুন। Checkout-এর আগে portal-এ final total মিলিয়ে নিন।</p></div>
      {plans.length ? <div className="usa-vps-plans">{plans.map(plan => <section className={`usa-vps-plan ${plan.featured ? "featured" : ""}`} key={plan.id}>
        <div className="usa-vps-plan-top"><Server size={24}/>{plan.featured && <span>Featured plan</span>}</div><h3>{plan.name}</h3><p className="usa-vps-location"><MapPin size={14}/> United States</p><div className="usa-vps-price">৳{money(plan.price)}<small>/ month</small></div>
        <ul><li><Check/>{plan.cpu} vCPU</li><li><Check/>{plan.ram} GB RAM</li><li><Check/>{plan.disk} GB NVMe storage</li><li><Check/>{plan.bandwidth} bandwidth</li><li><Check/>{plan.ipv4} IPv4 address{plan.ipv4 === 1 ? "" : "es"}</li></ul>
        {plan.available ? <a className={`button ${plan.featured ? "button-cyan" : "button-dark"}`} href={campaignUrl(plan.url, search)}>Configure this plan <ArrowUpRight size={18}/></a> : <button className="button usa-vps-unavailable" disabled>Currently unavailable</button>}
      </section>)}</div> : <div className="usa-vps-fallback" role="status"><h3>এই মুহূর্তে USA package prices পাওয়া যাচ্ছে না</h3><p>Latest plans দেখতে client portal খুলুন অথবা আমাদের team-কে জানান।</p><a className="button button-dark" href={campaignUrl(portal + "/vps", search)}>Portal-এ VPS plans দেখুন <ArrowUpRight size={18}/></a></div>}
      <p className="usa-vps-price-note">Prices in BDT / month। Checkout-এর আগে billing cycle, tax, add-ons ও final total review করুন।</p>
    </div></section>

    <section className="usa-vps-section usa-vps-soft"><div className="container"><div className="usa-vps-heading"><span className="section-kicker">02 / BUILT AROUND YOUR PROJECT</span><h2>একটি VPS, নানা ধরনের<br/><em>website ও online service।</em></h2><p>নিজের প্রয়োজন অনুযায়ী operating system ও software stack configure করুন।</p></div><div className="usa-vps-apps">{applications.map(item => { const Icon = item.icon; return <div key={item.title}><Icon/><h3>{item.title}</h3><p>{item.text}</p></div>; })}</div></div></section>

    <section className="usa-vps-section usa-vps-dark"><div className="container"><div className="usa-vps-heading"><span className="section-kicker">03 / CHOOSE A LOCATION</span><h2>আপনার visitor যেখানে,<br/><em>সেই অনুযায়ী server location ভাবুন।</em></h2><p>USA location international audience-এর কিছু অংশের জন্য উপযুক্ত হতে পারে। Bangladesh-কেন্দ্রিক visitor হলে Bangladesh BDIX VPS-ও তুলনা করুন। Routing, ISP ও workload অনুযায়ী latency এবং response time বদলায়—নির্দিষ্ট speed নিশ্চিত নয়।</p></div><div className="usa-vps-location-cards"><a href="/bdix-vps"><MapPin/><span><strong>Bangladesh BDIX VPS</strong><small>বাংলাদেশি visitor-এর জন্য local server option</small></span><ArrowUpRight/></a><div><Globe2/><span><strong>USA VPS</strong><small>International audience-এর জন্য US server location</small></span><Check/></div></div></div></section>

    <section className="usa-vps-section"><div className="container"><div className="usa-vps-heading"><span className="section-kicker">04 / GET STARTED</span><h2>Order করা যায় তিনটি step-এ।</h2></div><div className="usa-vps-steps"><div><b>01</b><h3>Plan বেছে নিন</h3><p>CPU, RAM, NVMe, bandwidth ও monthly price তুলনা করুন।</p></div><div><b>02</b><h3>Configuration review</h3><p>Client portal-এ USA location ও available OS নির্বাচন করুন।</p></div><div><b>03</b><h3>Final total & checkout</h3><p>Checkout-এর আগে billing cycle, tax ও add-ons review করুন।</p></div></div></div></section>

    <section className="usa-vps-section usa-vps-soft"><div className="container usa-vps-faq-layout"><div className="usa-vps-heading"><span className="section-kicker">05 / COMMON QUESTIONS</span><h2>USA VPS নিয়ে<br/>সাধারণ প্রশ্নের উত্তর।</h2><p>Website ও server configuration নিয়ে সাহায্য প্রয়োজন?</p><a className="button button-dark" href="/contact"><Headphones size={18}/> Talk to our team</a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

    <section className="usa-vps-closing"><div className="container"><span className="usa-vps-eyebrow">GLOBAL VISITORS. YOUR OWN SERVER.</span><h2>আপনার website-এর জন্য<br/>USA VPS plan বেছে নিন।</h2><p>Live packages তুলনা করুন, তারপর client portal-এ configuration ও checkout সম্পন্ন করুন।</p><div className="usa-vps-actions"><a className="button button-cyan" href="#usa-packages">Plans দেখুন <ArrowRight size={18}/></a><a className="usa-vps-support" href="/contact">Team-এর সঙ্গে কথা বলুন <ArrowUpRight size={18}/></a></div></div></section>
    <div className="usa-vps-mobile-cta"><span>USA VPS packages</span><a className="button button-cyan" href="#usa-packages">Plans দেখুন <ArrowRight size={16}/></a></div>
  </article></Shell>;
}
