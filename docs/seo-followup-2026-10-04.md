# SEO follow-up — 4 October 2026

## Evidence before this change

- Production was `fb9f2b28c6606c4efc5b98bd3a5232a540b3b989` on `main`.
- Search Console homepage inspection: `Crawled - currently not indexed`; last crawl `2026-08-12T15:28:10Z`; fetching successful and indexing allowed.
- `/services/website`: `URL is unknown to Google`.
- Motion sitemap was already submitted on 3 October: 38 URLs, zero warnings and errors. The sitemap's indexed count is not a substitute for individual URL inspections.
- Six-page live audit: all six indexable; no critical, high, or medium issues. Low-severity observations: missing About structured data and a short Bakau case study / one slower response. A single latency sample does not establish sustained poor performance.
- Search Console returned one click / one impression for `/contact` in its default 4 September–1 October window; the provider marked data settled only through 29 September. This is a pre-change baseline, not evidence of the new work's performance.

## Changes

- Three service pages now have nine distinct, bilingual questions covering client preparation, migration, SEO expectations, app/platform selection, hardware compatibility, acceptance checks, data imports, permissions, and staged delivery.
- Service pages link to relevant published portfolio examples: Bakau Institute, Berkah Komputer, NaCash, and Inventra. No invented project outcomes or ranking guarantees.
- About adds `AboutPage`, `Person`, `Organization`, and breadcrumb data matching the visible studio/founder copy, plus crawlable links to each service.
- Homepage, About, and service provider data reuse one organization identity and existing public contact details. Homepage schema language follows the selected locale.
- FAQ content uses native HTML details/summary. No new client component, CMS query, dependency, or FAQ rich-result claim.

## Verification

- Installed existing `bun.lock` with frozen lockfile; no dependency or lockfile edits.
- Production build with the existing static CMS option and a local-only test JWT value: passed (Next.js 16.1.3).
- Existing SEO and image-loader suites: 10 passed, 0 failed.
- ESLint on all five changed source files and `git diff --check`: passed.
- Server HTML checks: homepage, About, and all three service routes in both locales (10 responses). HTTP 200, one H1, correct canonical, parseable JSON-LD, service FAQ content, and About/service identity assertions passed.
- Browser verification unavailable: Chrome download failed and agent-browser could not start. No visual pass is claimed; existing layout and native FAQ styling are reused.
- Local validation uses static data. Production CMS/portfolio routes must be checked after deployment.

Indexing remains Google's decision. These changes improve information and crawlable relationships; successful deployment or sitemap submission does not establish indexing or ranking gains.
