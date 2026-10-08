# BDIX VPS campaign guide

Destination: https://cloudvps.bd/bdix-vps

Audience: Bangladesh business owners and developers. Conversion journey: ad → package comparison → exact plan configuration → checkout in app.cloudvps.bd.

## Creative angle 1 — Business apps

Primary text: আপনার website, e-commerce বা business software-এর জন্য VPS খুঁজছেন? CloudVPS-এর Bangladesh BDIX packages-এ CPU, RAM, NVMe ও monthly price তুলনা করুন। আপনার workload-এর জন্য সঠিক plan বেছে নিন।

Headline: আপনার Business-এর জন্য BDIX VPS

CTA: Learn More

Creative: CloudVPS navy/cyan graphic with “Business apps. Local cloud.” and a clean server illustration. Do not put a fixed price in evergreen ads.

## Creative angle 2 — Developers

Primary text: Next app deploy করার প্রস্তুতি? Development থেকে production—CloudVPS BDIX VPS-এর resources ও use cases দেখে plan বেছে নিন। Portal-এ available OS ও options configure করে order review করুন।

Headline: Build your next app on BDIX VPS

CTA: Learn More

Creative: “Your code. Your workload. Your VPS.” with CPU/RAM/NVMe labels matching current packages.

## Campaign links

Business: https://cloudvps.bd/bdix-vps?utm_source=facebook&utm_medium=paid_social&utm_campaign=bdix_business&utm_content=business_apps

Developers: https://cloudvps.bd/bdix-vps?utm_source=facebook&utm_medium=paid_social&utm_campaign=bdix_developers&utm_content=developer_resources

Optional Meta template: utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}

These five UTM fields carry to package order links. This does not establish purchase attribution: confirm that the client portal records them before reporting purchases by campaign. No Pixel or purchase events are implemented.

## Measurement and claims

Compare the two creative angles using the same campaign conditions. Review landing visits, package clicks (if app analytics records them), and confirmed orders separately. Do not infer purchases from link clicks. Budget and ad launch remain owner decisions.

Use cases are sizing guidance. Never advertise guaranteed latency, visitor counts, uptime, included backups, DDoS protection, managed service or discounts without verified terms. Monthly prices refresh from the customer API every five minutes; final tax/add-ons/billing totals are reviewed at checkout.

## Maintenance

All active BDIX plans come from the public customer storefront. Existing catalog cache-clear routes also invalidate the `catalog` tag on BDIX data. API failure uses available cached data; no invented fallback prices. New product IDs need editorial use-case text in components/bdix-page.tsx; unknown IDs get generic guidance.
