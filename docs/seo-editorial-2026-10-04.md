# Editorial SEO — 4 October 2026

## Scope

- Expand Bakau Institute and NaCash portfolio content, then publish the first planning article.
- Bakau's existing CMS story, image, technologies, role, and other admin-managed fields remain intact. `BakauEditorial` adds studio commentary in the public template; it is maintained in code, not the admin form.
- The Bakau commentary is based on its published portfolio description and the visible organization website at https://bakauinstitute.org/ inspected on 4 October. It discusses program/project organization, language options, and contact routes, with no invented impact or traffic metrics.
- NaCash commentary expands the existing product explanation: different variants and users, transaction/report flows, offline/local data considerations, and requirements for a custom application. It does not imply every variant has every feature.
- `/insights` replaces the empty legacy page with the current studio layout. Published article data lives in `src/lib/insights.ts`; there is currently no article editor in the studio admin.
- `/insights/biaya-pembuatan-website` covers scope, content, integrations, ongoing costs, proposal comparisons, SEO deliverables, and a clearly labeled example brief in Indonesian and English. It does not invent Nauka pricing or promise Google ranking.
- The article has visible authorship/date, matching Article JSON-LD and Open Graph article metadata, a table of contents, links to services/case studies, and official Google references for indexing claims.
- The article hub and published article are included in the sitemap. Footer, website-service, and Bakau links make the new content discoverable without adding client JavaScript or changing navigation behavior.

## Pre-deploy validation

- Build passed on the existing locked Next.js 16.1.3 dependencies using static CMS fixtures and a local-only JWT value.
- 11 existing/extended SEO and image-loader tests passed; sitemap coverage includes both empty and populated article collections.
- ESLint on changed files and `git diff --check` passed.
- 10 server HTML checks passed: homepage, Insights hub, article, NaCash, and website-service page in both locales. Checks cover response, H1, canonical, indexing directives, JSON-LD, article date/language, and table-of-contents targets.
- Sitemap article inclusion passed; an unknown article slug returns 404.
- Both Bakau editorial translations render with three sections and the intended internal links. The full Bakau page requires production CMS verification after deploy.
- Local browser verification was unavailable in this workspace (see prior follow-up). No local visual pass is claimed.

Production checks and Search Console sitemap registration follow deployment. Publication or sitemap acceptance does not establish Google indexing.
