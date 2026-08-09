import type { MetadataRoute } from 'next';
import { getCategories, getAllProjectSlugs, getPublicProjects } from '@/lib/cms';

const SITE_URL = 'https://motion.nauka.id';

/**
 * sitemap.ts — generate /sitemap.xml
 *
 * Uses CMS source selector (default: static = studio-data.ts).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const categories = await getCategories();
  const allSlugs = await getAllProjectSlugs();
  const allProjects = await getPublicProjects();

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = allSlugs.map((slug) => {
    const project = allProjects.find((p) => p.slug === slug);
    return {
      url: `${SITE_URL}/work/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: project?.status === 'published' ? 0.7 : 0.4,
    };
  });

  return [...staticPages, ...categoryPages, ...projectPages];
}
