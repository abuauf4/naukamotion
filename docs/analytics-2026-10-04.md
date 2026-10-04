# Nauka Motion GA4

Measurement ID supplied by the owner: `G-XZFPGESVCC`.

## Collection

- `GoogleAnalytics` loads the Google tag with Next Script after hydration. Initialization and custom events are limited to the exact `motion.nauka.id` hostname. Direct admin/API pages do not load the tag; the disable flag is updated when the client route changes.
- The Google tag sends its initial page view. Keep Enhanced Measurement's browser-history page views enabled for Next.js navigation. React does not send a second manual page view or repeat configuration on route changes.
- `whatsapp_click`: ordinary WhatsApp links plus the two brief-continuation buttons. Parameters are `page_path`, `contact_method`, and a fixed `contact_source` (`site_link`, `project_brief`, `saved_brief`). A click is not a confirmed message or sale.
- `generate_lead`: fired by ProjectIntake only after `/api/leads` returns a successful HTTP response and `{ok:true}`. Includes `page_path`, `contact_method`, and an allowlisted service code. No guessed monetary conversion value is attached.
- Google Signals and ad personalization signals are disabled in this site's config.

## Contact data

Names, email addresses, phone numbers, budget, timeline and brief content are never passed into the custom analytics functions. Personalized WhatsApp actions are buttons rather than anchors: the brief URL is constructed only when a visitor chooses to open WhatsApp, so Enhanced Measurement's outbound-link collector cannot read that URL from an anchor. Existing static WhatsApp links remain regular links. The contact form still saves full details to the site's own lead database as before.

Privacy disclosure updated to describe GA4 usage, cookies, custom-event parameters and the WhatsApp action.

## Validation

- 18 analytics, SEO and lead tests pass. Analytics tests cover one-time initialization, safe payloads, allowlisted service codes, disabled local/preview/admin collection and resilience to blocked analytics.
- Production build with the existing static CMS fallback and a local-only JWT secret passes.
- Changed application files pass ESLint and diff whitespace validation.
- No synthetic production lead or WhatsApp message is submitted for testing.

## Owner verification

After deployment, open the public site and review Analytics Realtime for `page_view`. Activate a public WhatsApp link to check `whatsapp_click`; a real successfully saved brief should produce `generate_lead`. Account-side ingestion and key-event settings require Analytics account access and are not proven by code tests. Mark `generate_lead` as a key event in GA4; optionally also mark `whatsapp_click`, keeping the two outcomes distinct. Enhanced Measurement's generic `form_submit` is not proof that a brief was saved.

The GSC Wizard connection previously lacked Google Analytics scope. Providing a measurement ID authorizes site installation but does not grant reporting/admin access to the GA4 property.

## Sources

- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://support.google.com/analytics/answer/9216061
