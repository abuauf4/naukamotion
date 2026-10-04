# Portfolio performance and second Insights article

## Changes

- Public project detail, categories, listings, counts, slugs and sitemap reads now use the Next.js Data Cache with a 60-second revalidation period and a shared public-portfolio tag. Locale remains request-specific. Cached project misses are represented as null, keeping serialization predictable.
- Category lookup reuses the cached category list. Detail/category resolution runs concurrently with locale retrieval. Metadata and page rendering retain React request memoization.
- All existing successful portfolio admin mutation handlers expire the tag with `revalidateTag(tag, { expire: 0 })`, including the media-deletion fallback branch. Existing path invalidation is preserved. Admin reads are not cached. Public repository queries still filter `visibility=public` and `status!=draft`.
- Published bilingual article `/insights/landing-page-vs-company-profile`, with seven sections, a decision checklist, services/contact/portfolio links, and Article/breadcrumb schemas through the existing renderer. Added links from the website service and both articles. The Insights list uses a general read-guide label for every article.

## Verification

- Production build passes with `CMS_DATA_SOURCE=static` and a local-only JWT secret; this build does not validate production database connectivity.
- 12 existing SEO/lead tests pass.
- `bun test ./scripts/verify-portfolio-cache.ts` exercises the actual Next.js IncrementalCache and project PUT handler with database/auth doubles. It verifies warm reads avoid repeat queries, updated content appears, draft/private changes remove the public result, and republishing invalidates a cached miss. Next 16.1's local tag cache uses millisecond timestamps; the test advances a controlled clock between simulated requests.
- 16 local SSR checks pass (8 routes x Indonesian/English): HTTP 200, one H1, canonical, locale and article anchor/schema checks. Unknown article/project routes return 404. The new article appears in the sitemap.
- ESLint on changed application files and `git diff --check` pass.
- Pre-deployment live Bakau sample: HTTP 200, indexable, 5,084 ms response from GSC Wizard. This is a single crawler response sample, not a Core Web Vitals or full visual-loading measurement.

## Measurement status

The site's current source has no Google Analytics tag or contact-event integration. GSC Wizard reports no Google Analytics connection for the available account; no property or measurement ID could be established. No analytics configuration or conversion totals are claimed.

When the correct motion.nauka.id GA4 web stream is available, use `whatsapp_click` for contact-link activation and `generate_lead` only after `/api/leads` confirms `{ok:true}`. Pass only the page path and fixed service identifier, never the name, email, phone, message, or WhatsApp URL containing the brief. Do not treat a WhatsApp click as a sent message or sale. Verify DebugView and a saved test brief before enabling key-event reporting, and update the privacy disclosure for the actual collection configuration.

Google URL inspections on 2026-10-04 still report the homepage as crawled/currently not indexed (last crawl 2026-08-12); website service, Bakau, and the first article are unknown to Google. Deployment and sitemap availability are not proof of indexing.

## References

- https://nextjs.org/docs/app/api-reference/functions/unstable_cache
- https://nextjs.org/docs/app/api-reference/functions/revalidateTag
- https://developers.google.com/search/help/crawling-index-faq
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
