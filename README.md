# CloudVPS landing page — Vercel version

This is a separate, self-contained Next.js copy of the CloudVPS marketing site. It keeps the same pages, theme, brand assets, domain search and links to `app.cloudvps.bd`. It does not use Codex Sites, Vinext, Cloudflare KV or Cloudflare Workers. The existing `cloudvps.bd` deployment is untouched.

## Deploy to Vercel

1. Put this **entire folder** in a GitHub repository (or use the Vercel CLI from this folder).
2. In Vercel, choose **Add New → Project**, import that repository, and select **Next.js**. If this folder is inside a larger repository, set **Root Directory** to `vercel-landing`.
3. Keep the default build command `npm run build` and output settings. Deploy to the Vercel preview URL first.
4. Compare the preview with `https://cloudvps.bd` on the same phone and network. Check `/`, `/domain`, `/hosting`, `/vps`, `/ssl`, and domain search. Connect `cloudvps.bd` only after the preview is faster and correct.

No environment variable is required for the public customer catalog or basic domain search. If you later use the optional extra Partner API availability check, add `PARTNER_API_KEY` in Vercel Project Settings → Environment Variables; do not commit it or expose it as `NEXT_PUBLIC_`.

## Local checks

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run build
npm run lint
npm run dev
```

The public pages are prerendered by Next.js. `/api/catalog` reads the customer storefront and allows Vercel CDN caching for five minutes; `/api/domain-check` remains live. The client portal remains the final authority for checkout prices and availability.
