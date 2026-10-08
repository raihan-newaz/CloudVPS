"use client";

import { ChevronDown } from "lucide-react";

export function VpsNavigation({ current, onNavigate }: { current?: string; onNavigate?: () => void }) {
  return <details className="vps-navigation"><summary className={current === "/vps" || current === "/bdix-vps" || current === "/usa-vps" ? "active" : undefined}>VPS Servers <ChevronDown aria-hidden="true" size={15}/></summary><div className="vps-navigation-menu"><a href="/vps" aria-current={current === "/vps" ? "page" : undefined} onClick={onNavigate}>All VPS <small>Bangladesh & USA</small></a><a href="/usa-vps" aria-current={current === "/usa-vps" ? "page" : undefined} onClick={onNavigate}>USA VPS <small>Global audience-এর জন্য</small></a><a href="/bdix-vps" aria-current={current === "/bdix-vps" ? "page" : undefined} onClick={onNavigate}>BDIX VPS <small>বাংলাদেশের জন্য local cloud</small></a></div></details>;
}
