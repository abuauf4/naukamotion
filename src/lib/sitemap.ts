import type { MetadataRoute } from "next";
import { absoluteUrl } from "./seo";

export function buildSitemap(
  categories: { slug: string }[],
  projects: { slug: string; categorySlug: string }[],
  serviceSlugs: string[],
  insightSlugs: string[] = [],
): MetadataRoute.Sitemap {
  const populatedCategories = new Set(
    projects.map((project) => project.categorySlug),
  );
  const paths = [
    "/",
    "/services",
    "/work",
    "/work/nacash",
    "/about",
    "/contact",
    "/faq",
    "/legal/privacy",
    "/legal/terms",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...(insightSlugs.length
      ? ["/insights", ...insightSlugs.map((slug) => `/insights/${slug}`)]
      : []),
    ...categories
      .filter((category) => populatedCategories.has(category.slug))
      .map((category) => `/work/${category.slug}`),
    ...projects.map((project) => `/work/${project.slug}`),
  ];
  // No guessed lastmod: story/media edits don't reliably update Project.updatedAt.
  return [...new Set(paths)].map((path) => ({ url: absoluteUrl(path) }));
}
