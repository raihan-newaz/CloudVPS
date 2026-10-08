# CloudVPS Vercel version — project guide

## BDIX campaign page (October 2026)

Production hosting is Vercel. `/bdix-vps` is the bilingual BDIX campaign page, linked from shared VPS navigation, homepage, VPS page and footers. Read `BDIX_MARKETING.md` for campaign copy and UTM examples. Its data loader (`lib/bdix.ts`) fetches all active BDIX plans with 300-second revalidation and the `catalog` tag; it does not use the older catalog's hard-coded fallback or two-plan selection. Preserve direct product/location checkout links, stock restrictions, query forwarding and the navy/cyan identity. No Meta Pixel is configured. The earlier migration notes below describe the original setup.

This independent copy is for comparing Vercel performance before changing the production domain. Its current planned host is a Vercel preview URL; `https://cloudvps.bd` remains on the existing deployment until the owner moves it. The client portal is `https://app.cloudvps.bd`.

## Routes and customer flows

Public pages: `/`, `/domain`, `/hosting`, `/vps`, `/ssl`, `/why-us`, `/faq`, `/contact`. Preserve the existing CloudVPS navigation, layout, responsive styles, metadata and brand assets. The header `Client login` opens `https://app.cloudvps.bd/login`.

Domain search calls `POST /api/domain-check`. An available domain's **Continue** link opens `https://app.cloudvps.bd/order?domain=<encoded-domain>`. Hosting cards open `https://app.cloudvps.bd/hosting/checkout?plan_id=<id>&cycle=monthly`. VPS cards open `https://app.cloudvps.bd/vps/configure?product-id=<id>&billing-cycle=monthly&location-id=<id>`. SSL cards link to app SSL categories. Ordering and account management remain in the app.

## Data and safety

`GET /api/catalog` retrieves customer prices for selected TLDs and hosting/VPS plans from the public PositivePanel whitelabel storefront using `X-Partner-ID: app.cloudvps.bd`. Vercel can cache successful catalog responses for five minutes. The UI links to the app when prices are unavailable. Never display unverified Namely partner costs as retail prices or hard-code customer prices. Domain availability remains an uncached live check. Optional `PARTNER_API_KEY` stays server-side in Vercel environment variables.

## Visual identity

Deep navy `#061a3f` / `#071b43`, bright blue `#0877ed`, cyan `#25d5fb`, pale background `#f6f8fc`, white cards, Arial/Helvetica, rounded buttons and cards. Main styles: `app/globals.css`. Shared inner pages: `components/marketing-pages.tsx`. Home page: `components/home-page.tsx`. Assets: `public/cloudvps-logo.png`, `public/favicon.png`, `public/hero-datacenter.webp`. Keep mobile navigation, focus styling, reduced-motion support and semantic search feedback.

## Deployment

Use the standard Next.js build (`npm run build`) in this folder. No `.openai/hosting.json`, Wrangler configuration or Site-specific scripts are required. Deploy to a Vercel preview URL and compare cold and warm loads before moving DNS. The first HTML render and the later catalog request should be measured separately. A faster preview is evidence for a hosting move; it is not a guarantee that `app.cloudvps.bd` will become faster.
