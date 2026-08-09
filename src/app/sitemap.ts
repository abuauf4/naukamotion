import type { MetadataRoute } from 'next';
import {
  studioCategories,
  studioProjects,
  getAllProjectSlugs,
} from '@/lib/studio-data';

const SITE_URL = 'https://motion.nauka.id';

/**
 * sitemap.ts — generate /sitemap.xml
 *
 * Includes:
 * - Homepage
 * - /work (overview)
 * - /work/[category] for each category
 * - /work/[project-slug] for each public project
 * - Secondary pages (about, contact, services, insights, faq, legal)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/insights`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = studioCategories.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => {
    const project = studioProjects.find((p) => p.slug === slug);
    return {
      url: `${SITE_URL}/work/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: project?.status === 'published' ? 0.7 : 0.4,
    };
  });

  return [...staticPages, ...categoryPages, ...projectPages];
}
