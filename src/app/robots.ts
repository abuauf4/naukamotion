import type { MetadataRoute } from 'next';

const SITE_URL = 'https://motion.nauka.id';

/**
 * robots.ts — generate /robots.txt
 *
 * Allow all crawlers. Sitemap directive points to /sitemap.xml.
 * Admin and API routes are not blocked (admin requires auth, API is public read-only).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
