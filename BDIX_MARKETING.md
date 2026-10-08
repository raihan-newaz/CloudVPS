# BDIX VPS campaign guide

Destination: https://cloudvps.bd/bdix-vps

Audience: owners of business websites, WordPress sites and online shops serving Bangladeshi customers; agencies hosting client websites. Conversion journey: ad → website-focused package comparison → plan configuration → checkout in app.cloudvps.bd.

## Creative angle 1 — Your visitors are in Bangladesh

Primary text: আপনার website-এর visitor বাংলাদেশে? Website host করুন বাংলাদেশে। Local routing থাকলে network latency কমতে পারে। CloudVPS BDIX VPS-এ business website, WordPress বা online shop-এর জন্য CPU, RAM, NVMe ও monthly price তুলনা করে plan বেছে নিন।

Headline: বাংলাদেশি visitor-এর জন্য BDIX VPS Hosting

CTA: Learn More

Creative: CloudVPS navy/cyan graphic with “Your website. Your local audience.” and visitor → local network → Dhaka server illustration. Do not put a fixed price or a latency number in evergreen ads.

## Creative angle 2 — WordPress and online shops

Primary text: Business website, WordPress বা WooCommerce store-এর জন্য VPS খুঁজছেন? Website-এর plugins, database ও storage-এর প্রয়োজন মিলিয়ে CloudVPS-এর পাঁচটি BDIX package তুলনা করুন। Dhaka location-এ আপনার hosting শুরু করতে plan বেছে নিন। Setup বা migration দরকার হলে আগে team-এর সঙ্গে কথা বলুন।

Headline: আপনার website-এর জন্য সঠিক VPS

CTA: Learn More

Creative: website and product-page illustration with “WordPress • Online shop • Business website”. CPU/RAM/NVMe labels must match current packages. These are hosting use cases, not promises of pre-installed software or included management.

## Campaign links

Local audience: https://cloudvps.bd/bdix-vps?utm_source=facebook&utm_medium=paid_social&utm_campaign=bdix_website_hosting&utm_content=local_visitors

Website use cases: https://cloudvps.bd/bdix-vps?utm_source=facebook&utm_medium=paid_social&utm_campaign=bdix_website_hosting&utm_content=wordpress_ecommerce

Optional Meta template: utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}

These five UTM fields carry to package order links. This does not establish purchase attribution: confirm that the client portal records them before reporting purchases by campaign. No Pixel or purchase events are implemented.

Portal integration limitation observed on October 8, 2026: the app reads `product-id`, `billing-cycle` and `location-id`, but its configuration initialization can reset a requested Pro plan to Start. Links supply the documented parameters correctly. Customers are reminded to check the selected plan before checkout. Fixing the app's initialization effects requires its own source project; do not claim automatic plan selection is verified until that bug is resolved.

## Measurement and claims

Compare the two creative angles using the same campaign conditions. Review landing visits, package clicks (if app analytics records them), and confirmed orders separately. Do not infer purchases from link clicks. Budget and ad launch remain owner decisions.

Use cases are sizing guidance. Never advertise guaranteed latency, visitor counts, uptime, included backups, DDoS protection, managed service or discounts without verified terms. Monthly prices refresh from the customer API every five minutes; final tax/add-ons/billing totals are reviewed at checkout.

## Research behind the website-hosting positioning (October 8, 2026)

- [BDIX official](https://bdix.net/): the exchange interconnects member networks to exchange and route local Internet traffic locally. This establishes what BDIX does; it does not independently verify CloudVPS peering paths or ping.
- [Internet Society — Peering and IXPs](https://www.internetsociety.org/our-work/connectivity/peering/): shorter and more direct routes through local peering can reduce latency. The landing page applies this as a conditional benefit, not a CloudVPS performance measurement.
- Provider landing pages reviewed: [BDIX Web Host](https://bdixwebhost.com/bdix-vps.html), [BDIX VPS](https://bdixvps.com.bd/), [BDIX Web Hosting](https://www.bdixwebhosting.com/). Useful patterns: local audience positioning, visible plan comparisons, website/e-commerce use cases and FAQs. Copy and brand are CloudVPS's own; competitor latency, uptime, network speed and included services are not evidence for CloudVPS claims.

Website load time also depends on application configuration, images, plugins, database and caching. Confirm network performance using a test IP from representative ISPs before publishing numerical claims. The landing page's local-route diagram is educational, not a live ping monitor.

## Catalog maintenance

All active BDIX plans come from the public customer storefront. Cards show specifications without limiting them to a particular website size or type. Website applications are separate and do not map to plan IDs.

After updating customer prices in the source portal, visit https://cloudvps.bd/clearcache. This single bookmark refreshes main-site prices and the full BDIX catalog. It invalidates both shared tags and pricing pages, then verifies fresh API results before reporting success. The confirmation shows package counts and links to homepage/BDIX. Reload pages already open. Pages regenerate on their next visit; it does not promise simultaneous propagation to every external cache or a zero-millisecond load. Failure returns 502 and a retry message. The existing authenticated API follows the same helper. Both response types use no-store; the public browser link retains its existing request limit.

The automatic fetch refresh interval is 300 seconds. Missing main-catalog data produces an empty fallback with portal links rather than old fixed prices. BDIX has no invented price fallback.

## Owner-supplied reference review (October 8, 2026)

| Reference | Pattern used in CloudVPS regeneration |
| --- | --- |
| [BDIXVPS](https://bdixvps.com.bd/) | Audience-focused local positioning, clean direct order cards and separate infrastructure/application sections. The direct fetch timed out; indexed page content was available for review. |
| [BengalCloud](https://bengalcloud.com/bdix-vps/) | Specs-first pricing followed by detailed infrastructure benefits and OS configuration. |
| [XeonBD](https://www.xeonbd.com/bdix/bdix-vps/) | Explicit resource allocation, management distinction and optional hosting software. |
| [Alpha Net](https://www.alpha.net.bd/VPS/Linux/) | Compact CPU/RAM/storage comparison and an independent features section. |
| [SiteChai](https://sitechai.com/bdix-vps) | Server-control presentation and practical configuration/network FAQs. |
| [Hosttier](https://hosttier.com/vps-hosting) | Brief resource-focused plan cards, OS information and clear order CTA. |
| [UmmahHostBD](https://ummahhostbd.com/services/BDIX-VPS) | Local website-hosting benefits plus prominent monthly specifications. |
| [TOSHOST](https://toshost.com/bdix-managed-vps) | Strong local hero, visual routing explanation and separate use-case content. |

These are layout and messaging references, not CloudVPS product evidence. Do not copy their performance numbers, reviews, uptime promises, discounts, owned-infrastructure claims, management, backup or DDoS inclusions. Resource specifications and prices are CloudVPS's own verified API data. No plan-specific audience labels are used, so customers judge allocation without artificial website-capacity boundaries.
