# CloudVPS Vercel version — project guide

## BDIX campaign page (October 2026)

Production hosting is Vercel. `/bdix-vps` is the bilingual BDIX campaign page, linked from shared VPS navigation, homepage, VPS page and footers. Read `BDIX_MARKETING.md` for campaign copy and UTM examples. Its data loader (`lib/bdix.ts`) fetches all active BDIX plans with 300-second revalidation and the `catalog` tag; it does not use the older catalog's hard-coded fallback or two-plan selection. Preserve direct product/location checkout links, stock restrictions, query forwarding and the navy/cyan identity. Meta Pixel and CAPI are wired through `components/meta-tracking.tsx` and `app/api/meta/events/route.ts`; both stay inactive until Vercel environment variables are configured and each visitor grants marketing-cookie consent. The earlier migration notes below describe the original setup.

Primary BDIX positioning is website hosting for Bangladeshi visitors: business websites, WordPress, WooCommerce, agency sites and content portals. Local peering can shorten routes and reduce network latency; never turn this into a fixed ping or guaranteed page-load claim. See the research sources in `BDIX_MARKETING.md`. The route illustration is conceptual, not measured network telemetry. Preserve responsive single-column mobile packages, Hind Siliguri and the compact sticky CTA.

Package cards show names, monthly prices and specifications without assigning website sizes or limiting use cases. General website applications sit in their own section with no plan-ID mapping. Do not restore “এই plan কার জন্য?” or “small website only” positioning.

Price refresh bookmark: `https://cloudvps.bd/clearcache`. Both `/clearcache` and the existing authenticated `/api/revalidate` call `lib/refresh-pricing.ts`, expire the shared `catalog` and `bdix-catalog` tags, invalidate pricing routes including `/bdix-vps`, and verify fresh main/BDIX API results. Success includes counts and timestamp; API failure is a 502, never a false success. Pages regenerate on their next visit; already-open tabs need reloading. All fetch caches use 300-second revalidation and `/api/catalog` uses a 300-second CDN TTL. The browser link retains its existing rate limiter. Keep it out of customer navigation.

## USA VPS campaign page

`/usa-vps` is the USA location campaign page, linked from the shared VPS dropdown, homepage, VPS overview and both footers. `lib/usa-vps.ts` loads every active USA VPS package from the customer storefront using 300-second caching and the shared `catalog` tag. Show current monthly BDT prices, verified specifications, stock availability and direct product/location configuration URLs; preserve Meta UTM parameters. Do not assign unsupported use cases to specific plans or promise a latency/performance result. The route uses the same navy/cyan identity, responsive package cards and mobile sticky CTA as BDIX.

The shared `/clearcache` and `/api/revalidate` flows refresh/verify USA packages alongside the main catalog and all BDIX plans. Keep the portal configuration link at `https://app.cloudvps.bd/vps/configure?product-id=<id>&billing-cycle=monthly&location-id=<id>`.

This independent copy is for comparing Vercel performance before changing the production domain. Its current planned host is a Vercel preview URL; `https://cloudvps.bd` remains on the existing deployment until the owner moves it. The client portal is `https://app.cloudvps.bd`.

## Routes and customer flows

Public pages: `/`, `/domain`, `/hosting`, `/vps`, `/bdix-vps`, `/usa-vps`, `/ssl`, `/why-us`, `/faq`, `/contact`. Preserve the existing CloudVPS navigation, layout, responsive styles, metadata and brand assets. The header `Client login` opens `https://app.cloudvps.bd/login`.

Domain search calls `POST /api/domain-check`. An available domain's **Continue** link opens `https://app.cloudvps.bd/order?domain=<encoded-domain>`. Hosting cards open `https://app.cloudvps.bd/hosting/checkout?plan_id=<id>&cycle=monthly`. VPS cards open `https://app.cloudvps.bd/vps/configure?product-id=<id>&billing-cycle=monthly&location-id=<id>`. SSL cards link to app SSL categories. Ordering and account management remain in the app.

## Data and safety

`GET /api/catalog` retrieves customer prices for selected TLDs and hosting/VPS plans from the public PositivePanel whitelabel storefront using `X-Partner-ID: app.cloudvps.bd`. Vercel can cache successful catalog responses for five minutes. The UI links to the app when prices are unavailable. Never display unverified Namely partner costs as retail prices or hard-code customer prices. Domain availability remains an uncached live check. Optional `PARTNER_API_KEY` stays server-side in Vercel environment variables.

Meta tracking uses `NEXT_PUBLIC_META_PIXEL_ID` (public pixel identifier), `META_CAPI_ACCESS_TOKEN` (server-only secret), optional `META_CAPI_TEST_EVENT_CODE`, and optional `META_GRAPH_API_VERSION`. `/api/meta/events` accepts only allowlisted event names from this origin and requires the marketing-consent cookie. Pixel and CAPI event IDs must remain identical for Meta deduplication. Never emit `Purchase` from a landing-page click; confirmed order integration requires the client portal/payment webhook.

## Visual identity

BDIX Bengali text uses Hind Siliguri via `next/font/google` in `app/bdix-vps/page.tsx`, downloaded during build and self-hosted. Arial remains first for English text; Hind Siliguri supplies Bengali glyphs. Preserve the Bengali font, generous line spacing and route-scoped loading.

Deep navy `#061a3f` / `#071b43`, bright blue `#0877ed`, cyan `#25d5fb`, pale background `#f6f8fc`, white cards, Arial/Helvetica, rounded buttons and cards. Main styles: `app/globals.css`. Shared inner pages: `components/marketing-pages.tsx`. Home page: `components/home-page.tsx`. Assets: `public/cloudvps-logo.png`, `public/favicon.png`, `public/hero-datacenter.webp`. Keep mobile navigation, focus styling, reduced-motion support and semantic search feedback.

## Deployment

Use the standard Next.js build (`npm run build`) in this folder. No `.openai/hosting.json`, Wrangler configuration or Site-specific scripts are required. Deploy to a Vercel preview URL and compare cold and warm loads before moving DNS. The first HTML render and the later catalog request should be measured separately. A faster preview is evidence for a hosting move; it is not a guarantee that `app.cloudvps.bd` will become faster.
