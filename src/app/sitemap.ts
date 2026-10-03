import { getCategories, getSitemapProjects } from "@/lib/cms";
import { servicePages } from "@/lib/service-pages";
import { buildSitemap } from "@/lib/sitemap";

// CMS projects added after a deployment must appear without rebuilding the site.
export const revalidate = 60;

export default async function sitemap() {
  const [categories, projects] = await Promise.all([getCategories(), getSitemapProjects()]);
  return buildSitemap(categories, projects, servicePages.map((service) => service.slug));
}
