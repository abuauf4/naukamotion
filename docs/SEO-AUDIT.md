# SEO audit — 3 October 2026

Scope: public HTML at motion.nauka.id, repository implementation, production-mode local rendering, and Search Console data scoped to the Motion subdomain. The QA build uses explicit static CMS fixtures; production continues to use the database.

## Confirmed findings and fixes

| Finding in live HTML | Change |
| --- | --- |
| Service, portfolio, FAQ, contact, about and product pages inherited the homepage Open Graph/Twitter title and URL | A shared metadata builder sets each page's own canonical, social title, description, URL, type and image |
| Project Open Graph metadata omitted URL/site name/type and Twitter still used homepage information | Complete metadata for CMS project and category routes, preserving project covers |
| FAQ had no H1 | Exactly one descriptive H1 on the full FAQ page; the homepage FAQ retains H2 |
| Admin login advertised `index, follow` | Admin metadata and admin/API response headers explicitly use noindex; authenticated access remains enforced |
| Dedicated Googlebot/Bingbot robots groups omitted the admin restrictions | One consistent group; login remains crawlable to expose noindex, private admin/API paths remain disallowed |
| Insights placeholder and empty categories were eligible for indexing | Noindex for these pages, and omission from the sitemap until they have public content |
| Every sitemap URL advertised the build timestamp as lastmod | Omit unverifiable timestamps, rather than claiming content changed on every build |
| Sitemap queried full project listings and had no refresh interval | Select only public non-draft project slugs/category membership; parallel reads, 60-second revalidation and existing admin invalidation |
| One service overview had to cover three distinct search intents | Add substantial, internally linked pages for website development, Android apps and custom business systems |
| Home schema used a local service type without an address | Organization and WebSite schema with real published contact details; Service and BreadcrumbList schema on service routes, breadcrumbs on category/project routes |

New service URLs: `/services/website`, `/services/android`, `/services/sistem-bisnis`. Content covers relevant use cases, scope, data/offline considerations where applicable, cost planning, testing and handover. It contains no invented prices, ratings, outcomes, client statistics or ranking promises.

JSON-LD is rendered on the server and escapes `<` from CMS text. Meta descriptions are normalized and shortened without altering visible case-study content. The responsive image loader and Suspense homepage behavior remain in place; this work adds no client animation library or external SEO script.

## Validation

- Production build and TypeScript passed.
- ESLint passed for changed TypeScript/TSX files.
- 16 tests / 44 assertions passed, including metadata URLs, script-closing CMS text, noindex overrides, sitemap deduplication, image delivery and lead persistence.
- All 38 URLs in the local fixture sitemap returned 200, one H1, matching canonical and Open Graph URLs, matching page/social titles, and valid JSON-LD where emitted.
- 24 browser checks across 320, 390 and 1440 px: no horizontal overflow, broken loaded images or JavaScript errors. Service-to-contact navigation and English preference persistence passed.
- Login exposes noindex for both generic robots and Googlebot, plus X-Robots-Tag; Insights is noindex; an unknown service returns 404.

The local route count reflects QA fixtures, not the number of current production CMS projects. Live deployment verification and sitemap submission are performed after publication.

## Search Console and remaining work

The connected `sc-domain:nauka.id` property is verified and has owner access. Its existing Motion sitemap was last submitted on 12 August and last downloaded on 20 September, with no parse errors reported at audit time. Page-level data for 3–30 September showed only one Motion row (`/contact`, one impression and one click); query-level data had no matching rows. This is too little evidence to judge ranking or the effect of this relaunch. Sitemap indexed-count fields are not treated as proof that the entire site is unindexed.

The default crawlable language is Indonesian. English currently uses a persisted user preference on the same URLs; there are no independently crawlable English URLs, so no invented hreflang pairs are emitted. If international search becomes a priority, introduce separate locale URLs and reciprocal annotations as a separate routing change.

After Google processes the new sitemap, use Search Console to assess actual indexing, query/page performance and demand. Future content should answer real buyer questions and document completed projects with verified facts. There is no technical audit score or guaranteed ranking claim in this report.

## References

- [Next.js metadata and nested field behavior](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google sitemap guidance and accurate lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google noindex and crawl accessibility](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google language URL annotations](https://developers.google.com/search/docs/specialty/international/localized-versions)
