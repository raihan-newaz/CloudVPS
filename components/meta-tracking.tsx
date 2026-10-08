"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

type MetaEvent = "PageView" | "ViewContent" | "InitiateCheckout";
type Fbq = (command: "init" | "track" | "consent", name: string, data?: Record<string, unknown>, options?: { eventID?: string }) => void;
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq; __cloudvpsMetaPixelId?: string; }
}

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const consentCookie = "cloudvps_meta_consent";
const campaignPages = new Set(["/bdix-vps", "/usa-vps"]);

function cookieValue(name: string) {
  return document.cookie.split("; ").find(item => item.startsWith(`${name}=`))?.slice(name.length + 1);
}

function getConsentSnapshot(): "granted" | "denied" | null {
  const saved = cookieValue(consentCookie);
  return saved === "granted" || saved === "denied" ? saved : null;
}
const getServerConsentSnapshot = () => null;
function subscribeConsent(callback: () => void) {
  window.addEventListener("cloudvps:meta-consent", callback);
  return () => window.removeEventListener("cloudvps:meta-consent", callback);
}

function createPixel() {
  if (window.fbq) return;
  const fbq = ((...args: Parameters<Fbq>) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  }) as Fbq & { callMethod?: Fbq; queue?: Parameters<Fbq>[]; loaded?: boolean; version?: string; push?: Fbq };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

function sendEvent(eventName: MetaEvent) {
  if (!pixelId || !window.fbq) return;
  const eventId = crypto.randomUUID();
  window.fbq("track", eventName, {}, { eventID: eventId });
  void fetch("/api/meta/events", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: `${window.location.origin}${window.location.pathname}`,
    }),
    keepalive: true,
  }).catch(() => {});
}

export function MetaTracking() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("cloudvps:meta-settings", openSettings);
    return () => window.removeEventListener("cloudvps:meta-settings", openSettings);
  }, []);

  useEffect(() => {
    if (!pixelId || consent !== "granted") return;
    if (window.__cloudvpsMetaPixelId !== pixelId) {
      createPixel();
      window.fbq?.("init", pixelId);
      window.__cloudvpsMetaPixelId = pixelId;
    }
    window.fbq?.("consent", "grant");
    sendEvent("PageView");
    if (campaignPages.has(pathname)) sendEvent("ViewContent");
  }, [consent, pathname]);

  useEffect(() => {
    if (!pixelId || consent !== "granted") return;
    const handleCheckoutClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const href = anchor.href;
      if (/^https:\/\/app\.cloudvps\.bd\/(?:vps\/configure|hosting\/checkout|order)(?:\?|$)/i.test(href)) {
        sendEvent("InitiateCheckout");
      }
    };
    document.addEventListener("click", handleCheckoutClick, true);
    return () => document.removeEventListener("click", handleCheckoutClick, true);
  }, [consent]);

  if (!pixelId) return null;

  function saveConsent(value: "granted" | "denied") {
    document.cookie = `${consentCookie}=${value}; Max-Age=15552000; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    if (value === "denied") window.fbq?.("consent", "revoke");
    window.dispatchEvent(new Event("cloudvps:meta-consent"));
    setSettingsOpen(false);
  }

  return <>
    {consent === null || settingsOpen ? <aside className="meta-consent" role="dialog" aria-label="Meta marketing cookie settings" aria-live="polite">
      <div><strong>Marketing cookie settings</strong><p>Ad performance মাপতে Meta Pixel ও Conversions API ব্যবহার করব। Allow করলে browser এবং server tracking চালু হবে।</p></div>
      <div className="meta-consent-actions"><button type="button" className="meta-consent-reject" onClick={() => saveConsent("denied")}>Reject</button><button type="button" className="meta-consent-allow" onClick={() => saveConsent("granted")}>Allow marketing cookies</button></div>
    </aside> : <button type="button" className="meta-consent-settings" onClick={() => setSettingsOpen(true)}>Cookie settings</button>}
  </>;
}
