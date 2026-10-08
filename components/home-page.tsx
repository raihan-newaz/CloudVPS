"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Cloud, Globe2, Headphones, Menu, Search, Server, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Catalog, defaultCatalog } from "@/lib/catalog";
import { VpsNavigation } from "@/components/vps-navigation";

const portal = "https://app.cloudvps.bd";
type SearchResult = { domain: string; available: boolean; price?: number; error?: string };
const money = (n: number) => new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2 }).format(n);

export default function Home({ initialCatalog }: { initialCatalog?: Catalog }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [catalog] = useState<Catalog>(initialCatalog ?? defaultCatalog);

  async function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = domain.trim().toLowerCase();
    if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9-]+)+$/.test(value) || value.length > 253) {
      setResult({ available: false, domain: value, error: "Enter a valid domain, such as yourbrand.com.bd." });
      return;
    }
    setSearching(true); setResult(null);
    try {
      const response = await fetch("/api/domain-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain: value }) });
      const data = await response.json() as SearchResult;
      setResult(data);
    } catch {
      setResult({ available: false, domain: value, error: "Search is temporarily unavailable. Please use the client portal." });
    } finally { setSearching(false); }
  }

  return <main>
    <div className="announcement"><span className="pulse" /> Built for ideas that deserve to stay online <a href="#solutions">Explore solutions <ArrowUpRight size={14}/></a></div>
    <header className="site-header">
      <a href="#top" className="brand" aria-label="CloudVPS home"><Image src="/cloudvps-logo.png" width={220} height={46} alt="CloudVPS" priority /></a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        <a href="/domain" onClick={()=>setMenuOpen(false)}>Domains</a><a href="/hosting" onClick={()=>setMenuOpen(false)}>Hosting</a><VpsNavigation onNavigate={()=>setMenuOpen(false)}/><a href="/ssl" onClick={()=>setMenuOpen(false)}>SSL</a><a href="/why-us" onClick={()=>setMenuOpen(false)}>Why CloudVPS</a><a href="/faq" onClick={()=>setMenuOpen(false)}>FAQ</a><a href="/contact" onClick={()=>setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions"><a className="button button-dark header-cta" href={portal + "/login"}>Client login <ArrowUpRight size={16}/></a></div>
      <button className="mobile-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section className="hero" id="top">
      <div className="hero-photo" /><div className="hero-grid" />
      <div className="hero-content container">
        <div className="eyebrow"><span className="eyebrow-line"/> CLOUDVPS · DIGITAL INFRASTRUCTURE</div>
        <h1>Everything your<br/><em>next big idea</em><br/>needs online.</h1>
        <p>Find your domain. Launch a fast website. Scale on a VPS. One dependable place to build what&apos;s next.</p>
        <div className="hero-actions"><a className="button button-cyan" href="/domain">Find your domain <ArrowUpRight size={17}/></a><a className="text-link" href="#solutions">Explore solutions <ArrowUpRight size={17}/></a></div>
        <div className="hero-proof"><span><ShieldCheck size={17}/> Secure by design</span><span><Headphones size={17}/> Help when you need it</span></div>
      </div>
      <div className="hero-side-label">DOMAINS / HOSTING / VPS / SSL</div>
    </section>

    <section className="solution-strip container" id="solutions" aria-label="Explore CloudVPS services">
      <a href="/domain" className="solution-item"><span className="solution-icon"><Globe2/></span><span><small>01 / IDENTITY</small><strong>Domains</strong><span>Make your name official</span></span><ArrowUpRight className="solution-arrow" size={20}/></a>
      <a href="/hosting" className="solution-item"><span className="solution-icon"><Cloud/></span><span><small>02 / PRESENCE</small><strong>Web Hosting</strong><span>Give your site room to grow</span></span><ArrowUpRight className="solution-arrow" size={20}/></a>
      <a href="/vps" className="solution-item"><span className="solution-icon"><Server/></span><span><small>03 / PERFORMANCE</small><strong>VPS Servers</strong><span>Power for ambitious work</span></span><ArrowUpRight className="solution-arrow" size={20}/></a>
      <a href="/ssl" className="solution-item"><span className="solution-icon"><ShieldCheck/></span><span><small>04 / TRUST</small><strong>SSL Certificates</strong><span>Help secure your site</span></span><ArrowUpRight className="solution-arrow" size={20}/></a>
    </section>

    <section className="domain-section section-pad" id="domains"><div className="container domain-layout">
      <div><div className="section-kicker">01 / YOUR DIGITAL NAME</div><h2>It starts with<br/><em>the right domain.</em></h2><p>Search the name you want and check availability instantly. Your domain is the first step toward a memorable online presence.</p><a className="inline-link" href={portal + "/domains/pricing"}>See all domain prices <ArrowUpRight size={17}/></a></div>
      <div className="domain-card"><div className="domain-card-top"><Globe2 size={26}/><span>DOMAIN SEARCH / LIVE</span></div><h3>Find a name that fits.</h3>
        <form onSubmit={search} className="search-form"><Search size={20}/><input aria-label="Domain name" placeholder="yourbrand.com.bd" value={domain} onChange={e=>setDomain(e.target.value)} /><button type="submit" disabled={searching}>{searching ? "Checking..." : "Search"}</button></form>
        <div aria-live="polite" className="search-feedback">{result ? result.error ? <p className="search-error">{result.error} <a href={portal + "/order"}>Open portal</a></p> : <div className={result.available ? "search-result available" : "search-result"}><span><strong>{result.domain}</strong> {result.available ? "is available" : "is unavailable"}{result.price && result.available ? ` · ৳${money(result.price)}/yr` : ""}</span>{result.available && <a href={portal + "/order?domain=" + encodeURIComponent(result.domain)}>Continue <ArrowUpRight size={17}/></a>}</div> : <p>Try a .bd, .com.bd, .com or another extension.</p>}</div>
        <div className="tld-row">{catalog?.domains?.length ? catalog.domains.slice(0,4).map(t=><div key={t.extension}><b>{t.extension}</b><span>৳{money(t.price)} / first year</span></div>) : <a href={portal + "/domains/pricing"}>View current domain prices in the portal <ArrowUpRight size={14}/></a>}</div>
      </div>
    </div></section>

    <section className="plans-section section-pad" id="hosting"><div className="container">
      <div className="section-heading"><div><div className="section-kicker">02 / BUILT TO LAUNCH</div><h2>Hosting that gets<br/>out of your way.</h2></div><p>Start with a reliable home for your site, then choose the resources that fit your next stage.</p></div>
      <div className="plan-grid">{catalog?.hosting?.length ? catalog.hosting.map((p,i)=><a className={"plan-card " + (p.featured ? "featured" : "")} href={p.url} aria-label={`Choose ${p.name} hosting plan`} key={p.name}><div className="plan-index">0{i+1} / WEB HOSTING</div><h3>{p.name}</h3><div className="plan-price">৳{money(p.price)}<span> / month</span></div><div className="plan-divider"/><ul>{p.details.map(d=><li key={d}><Check size={17}/>{d}</li>)}</ul><span className="plan-button">Choose plan <ArrowUpRight size={17}/></span></a>) : <div className="catalog-fallback"><Cloud size={33}/><h3>Explore web hosting</h3><p>See current hosting plans in the client portal.</p><a href={portal + "/hosting"}>See current plans <ArrowUpRight size={17}/></a></div>}</div>
      <a className="all-link" href="/hosting">Explore hosting in detail <ArrowUpRight size={18}/></a>
    </div></section>

    <section className="vps-section section-pad" id="vps"><div className="container">
      <a className="bdix-home-link" href="/bdix-vps">Bangladesh BDIX VPS — সব packages ও use cases দেখুন <ArrowUpRight size={18}/></a>
      <div className="vps-intro"><div><div className="section-kicker">03 / ROOM TO SCALE</div><h2>Your projects need<br/><em>serious power.</em></h2></div><p>Run applications and demanding workloads on a VPS with dedicated resources and the freedom to build your way.</p></div>
      <div className="vps-grid">{catalog?.vps?.length ? catalog.vps.map((p,i)=><a className="vps-card" href={p.url} key={p.name}><div className="vps-top"><Server size={25}/><span>0{i+1} / CLOUD VPS</span></div><h3>{p.name}</h3><div className="vps-specs">{p.details.map(d=><span key={d}>{d}</span>)}</div><div className="vps-bottom"><span>From <strong>৳{money(p.price)}</strong> / month</span><ArrowUpRight size={23}/></div></a>) : <div className="catalog-fallback dark"><Server size={33}/><h3>Explore VPS servers</h3><p>See current VPS plans in the client portal.</p><a href={portal + "/vps"}>See current plans <ArrowUpRight size={17}/></a></div>}</div>
      <a className="all-link light" href="/vps">Explore VPS in detail <ArrowUpRight size={18}/></a>
    </div></section>

    <section className="why-section section-pad" id="why-us"><div className="container why-layout"><div><div className="section-kicker">WHY CLOUDVPS</div><h2>One place.<br/>Every next step.</h2><p>Move from a first domain to a growing website and on to your own server without losing momentum.</p><a className="button button-dark" href={portal}>Explore the client portal <ArrowUpRight size={17}/></a></div><div className="why-points"><div><Globe2/><span><strong>Start with your name</strong><small>Search and register the domain that represents you.</small></span></div><div><Cloud/><span><strong>Build your presence</strong><small>Choose hosting resources for the website you have today.</small></span></div><div><Server/><span><strong>Scale on your terms</strong><small>Move to VPS resources when your workload calls for more.</small></span></div><div><Headphones/><span><strong>Support close by</strong><small>Reach the CloudVPS team when you need a hand.</small></span></div></div></div></section>

    <section className="faq-section section-pad" id="faq"><div className="container faq-layout"><div><div className="section-kicker">GOOD TO KNOW</div><h2>Frequently asked<br/>questions.</h2><p>Need something else? Our team is ready to help.</p><a className="inline-link" href="mailto:support@cloudvps.bd">Contact support <ArrowUpRight size={17}/></a></div><div className="faq-list"><details><summary>Where do I manage my services?</summary><p>Sign in to the CloudVPS client portal to manage domains, hosting, VPS services, billing and support.</p></details><details><summary>Can I search for a domain before signing up?</summary><p>Yes. Use the domain search on this page. When you find an available name, continue to the client portal to place your order.</p></details><details><summary>Are prices shown here current?</summary><p>Plan and domain prices are loaded from the same public storefront data used by the client portal. Confirm the final amount during checkout.</p></details><details><summary>How do I choose between hosting and VPS?</summary><p>Web hosting is a straightforward way to launch a website. VPS gives you more control and dedicated resources for applications or larger workloads.</p></details></div></div></section>

    <section className="final-cta"><div className="container"><div><span className="section-kicker">LET&apos;S BUILD WHAT&apos;S NEXT</span><h2>Your next big idea<br/>starts here.</h2></div><a className="button button-cyan" href={portal}>Visit client portal <ArrowUpRight size={18}/></a></div></section>
    <footer className="footer"><div className="container footer-main"><div><Image src="/cloudvps-logo.png" width={170} height={36} alt="CloudVPS"/><p>Domains, web hosting, VPS and SSL solutions for what&apos;s next.</p></div><div><strong>Explore</strong><a href="/domain">Domains</a><a href="/hosting">Hosting</a><a href="/vps">VPS Servers</a><a href="/bdix-vps">BDIX VPS</a><a href="/ssl">SSL Certificates</a></div><div><strong>Company</strong><a href="/why-us">Why CloudVPS</a><a href="/faq">FAQ</a><a href="/contact">Contact</a></div><div><strong>Account</strong><a href={portal + "/login"}>Client login</a><a href={portal}>Client portal</a><a href={portal + "/domains/pricing"}>Domain pricing</a></div></div><div className="container footer-bottom"><span>© 2026 CloudVPS. All rights reserved.</span><span>Built for what&apos;s next.</span></div></footer>
  </main>;
}
