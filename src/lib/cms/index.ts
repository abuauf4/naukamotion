import { cache } from "react";
import { unstable_cache } from "next/cache";
import { PUBLIC_PORTFOLIO_TAG } from "./cache-policy";
/**
 * CMS Source Selector
 *
 * Default is "database" — Neon CMS is the portfolio source of truth.
 * Set CMS_DATA_SOURCE=static for emergency fallback to studio-data.ts.
 *
 * No silent fallback: if database mode encounters an error, the error
 * propagates visibly rather than silently serving stale static content.
 *
 * Server-side only. Client components receive data via props from
 * server components that call these functions.
 *
 * Usage (server components):
 *   import { getCategories, getProjectBySlug } from "@/lib/cms";
 *
 * Types are re-exported from studio-data.ts for compatibility.
 */

// ─── Re-export types (same regardless of source) ───
export type {
  CategorySlug,
  ProjectStatus,
  LocalizedText,
  StudioCategory,
  StudioProject,
  CaseStudySection,
  TechStory,
  StudioCapability,
  StudioProcessStep,
} from "../studio-data";

// ─── Re-export static-only data (not in DB yet) ───
export { studioStats, studioCapabilities, studioProcess } from "../studio-data";

// ─── Source selection ───
// Default: 'database' (Neon is source of truth)
// Emergency fallback: CMS_DATA_SOURCE=static
const DATA_SOURCE = process.env.CMS_DATA_SOURCE ?? "database";

// ─── Static imports (emergency fallback) ───
import {
  studioCategories,
  studioProjects,
  getProjectBySlug as staticGetProjectBySlug,
  getAllProjectSlugs as staticGetAllProjectSlugs,
  getProjectsByCategory as staticGetProjectsByCategory,
  getPublicProjects as staticGetPublicProjects,
} from "../studio-data";

// ─── Database imports ───
import {
  fetchAllCategories,
  fetchPublicProjects,
  fetchFeaturedProjects,
  fetchPublicPreviewProjects,
  fetchPublicProjectBySlug,
  fetchPublicProjectsByCategory,
  fetchAllPublicSlugs,
  fetchSitemapProjects,
  fetchPublicProjectCountsByCategory,
} from "./repository";
import { adaptCategories, adaptProjects, adaptProject } from "./adapter";
import type {
  StudioCategory,
  StudioProject,
  CategorySlug,
} from "../studio-data";

export type FeaturedProject = {
  slug: string;
  index: string;
  name: string;
  categorySlug: string;
  categoryTitle: string;
  tagline: { id: string; en: string };
  year: string;
  cover: string;
  accent: string;
  isPreview?: boolean;
};

// Only public, locale-independent CMS data is shared across requests.
// Admin mutations immediately expire this tag; TTL also bounds external edits.
const publicCacheOptions = { revalidate: 60, tags: [PUBLIC_PORTFOLIO_TAG] };
const cachedFeaturedProjects = unstable_cache(
  fetchFeaturedProjects,
  ["studio-featured-v3"],
  publicCacheOptions,
);
const cachedPreviewProjects = unstable_cache(
  fetchPublicPreviewProjects,
  ["studio-preview-v3"],
  publicCacheOptions,
);

// ─── Public API ───

async function getCategoriesUncached(): Promise<StudioCategory[]> {
  if (DATA_SOURCE === "static") {
    return studioCategories;
  }
  const dbCategories = await fetchAllCategories();
  return adaptCategories(dbCategories);
}

async function getCategoryBySlugUncached(
  slug: string,
): Promise<StudioCategory | undefined> {
  return (await getCategories()).find((category) => category.slug === slug);
}

async function getProjectBySlugUncached(
  slug: string,
): Promise<StudioProject | undefined> {
  if (DATA_SOURCE === "static") {
    const project = staticGetProjectBySlug(slug);
    return project?.status !== "draft" ? project : undefined;
  }
  const dbProject = await fetchPublicProjectBySlug(slug);
  if (!dbProject) return undefined;
  return adaptProject(dbProject);
}

async function getAllProjectSlugsUncached(): Promise<string[]> {
  if (DATA_SOURCE === "static") {
    return staticGetAllProjectSlugs();
  }
  return fetchAllPublicSlugs();
}

async function getProjectsByCategoryUncached(
  categorySlug: CategorySlug,
): Promise<StudioProject[]> {
  if (DATA_SOURCE === "static") {
    return staticGetProjectsByCategory(categorySlug);
  }
  const dbProjects = await fetchPublicProjectsByCategory(categorySlug);
  return adaptProjects(dbProjects);
}

async function getPublicProjectsUncached(): Promise<StudioProject[]> {
  if (DATA_SOURCE === "static") {
    return staticGetPublicProjects();
  }
  const dbProjects = await fetchPublicProjects();
  return adaptProjects(dbProjects);
}

async function getFeaturedProjectsUncached(): Promise<FeaturedProject[]> {
  if (DATA_SOURCE === "static") {
    return studioProjects
      .filter((project) => project.status !== "draft")
      .sort((a, b) => a.order - b.order)
      .slice(0, 3)
      .map((project) => ({
        slug: project.slug,
        index: project.index,
        name: project.name,
        categorySlug: project.categorySlug,
        categoryTitle:
          studioCategories.find(
            (category) => category.slug === project.categorySlug,
          )?.title ?? project.categorySlug,
        tagline: project.tagline,
        year: project.year,
        cover: project.cover,
        accent: project.accent,
      }));
  }

  const projects = await cachedFeaturedProjects();
  const sourceProjects =
    projects.length >= 2 ? projects : await cachedPreviewProjects();
  return sourceProjects.map((project) => ({
    slug: project.slug,
    index: project.index,
    name: project.name,
    categorySlug: project.categorySlug,
    categoryTitle: project.category.title,
    tagline: project.tagline as { id: string; en: string },
    year: project.year,
    cover: project.media[0]?.url ?? project.cover,
    accent: project.accent,
    isPreview: projects.length < 2,
  }));
}

/**
 * Lightweight count of public projects per category.
 *
 * For the homepage only — avoids the V1 N+1 + heavy relations pattern.
 * Single groupBy query returns { [categorySlug]: count }.
 *
 * Static-fallback mode derives counts from studio-data.ts in memory.
 */
async function getPublicProjectCountsByCategoryUncached(): Promise<
  Record<string, number>
> {
  if (DATA_SOURCE === "static") {
    const counts: Record<string, number> = {};
    for (const cat of studioCategories) {
      counts[cat.slug] = staticGetProjectsByCategory(cat.slug).length;
    }
    return counts;
  }
  return fetchPublicProjectCountsByCategory();
}

// Deduplicate CMS reads shared by metadata and page rendering within a request.
export const getCategories = cache(
  unstable_cache(
    getCategoriesUncached,
    ["studio-categories-v3", DATA_SOURCE],
    publicCacheOptions,
  ),
);
export const getCategoryBySlug = cache(getCategoryBySlugUncached);
const cachedProject = unstable_cache(
  async (slug: string) => (await getProjectBySlugUncached(slug)) ?? null,
  ["studio-project-v3", DATA_SOURCE],
  publicCacheOptions,
);
export const getProjectBySlug = cache(
  async (slug: string) => (await cachedProject(slug)) ?? undefined,
);
export const getAllProjectSlugs = cache(
  unstable_cache(
    getAllProjectSlugsUncached,
    ["studio-getAllProjectSlugs-v3", DATA_SOURCE],
    publicCacheOptions,
  ),
);
export const getSitemapProjects = cache(
  unstable_cache(
    async () => {
      if (DATA_SOURCE === "static") {
        return staticGetPublicProjects().map(({ slug, categorySlug }) => ({
          slug,
          categorySlug,
        }));
      }
      return fetchSitemapProjects();
    },
    ["studio-sitemap-v3", DATA_SOURCE],
    publicCacheOptions,
  ),
);
export const getProjectsByCategory = cache(
  unstable_cache(
    getProjectsByCategoryUncached,
    ["studio-getProjectsByCategory-v3", DATA_SOURCE],
    publicCacheOptions,
  ),
);
export const getPublicProjects = cache(
  unstable_cache(
    getPublicProjectsUncached,
    ["studio-getPublicProjects-v3", DATA_SOURCE],
    publicCacheOptions,
  ),
);
export const getFeaturedProjects = cache(getFeaturedProjectsUncached);
export const getPublicProjectCountsByCategory = cache(
  unstable_cache(
    getPublicProjectCountsByCategoryUncached,
    ["studio-getPublicProjectCountsByCategory-v3", DATA_SOURCE],
    publicCacheOptions,
  ),
);
