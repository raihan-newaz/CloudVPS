"use client";

export function VpsNavigation({ current, onNavigate }: { current?: string; onNavigate?: () => void }) {
  return <details className="vps-navigation"><summary className={current === "/vps" || current === "/bdix-vps" ? "active" : undefined}>VPS Servers <span aria-hidden="true">⌄</span></summary><div className="vps-navigation-menu"><a href="/vps" aria-current={current === "/vps" ? "page" : undefined} onClick={onNavigate}>All VPS <small>Bangladesh & USA</small></a><a href="/bdix-vps" aria-current={current === "/bdix-vps" ? "page" : undefined} onClick={onNavigate}>BDIX VPS <small>বাংলাদেশের জন্য local cloud</small></a></div></details>;
}
