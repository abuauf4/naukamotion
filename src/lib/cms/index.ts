import { cache } from "react";
import { unstable_cache } from "next/cache";
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
  getCategoryBySlug as staticGetCategoryBySlug,
  getProjectBySlug as staticGetProjectBySlug,
  getAllProjectSlugs as staticGetAllProjectSlugs,
  getProjectsByCategory as staticGetProjectsByCategory,
  getPublicProjects as staticGetPublicProjects,
} from "../studio-data";

// ─── Database imports ───
import {
  fetchAllCategories,
  fetchCategoryBySlug,
  fetchPublicProjects,
  fetchFeaturedProjects,
  fetchPublicPreviewProjects,
  fetchPublicProjectBySlug,
  fetchPublicProjectsByCategory,
  fetchAllPublicSlugs,
  fetchPublicProjectCountsByCategory,
} from "./repository";
import {
  adaptCategory,
  adaptCategories,
  adaptProjects,
  adaptProject,
} from "./adapter";
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

// Only public showcase data is shared across requests. Locale and admin data
// remain request-specific. Existing admin revalidatePath calls invalidate it.
const cachedFeaturedProjects = unstable_cache(
  fetchFeaturedProjects,
  ["studio-featured-v2"],
  { revalidate: 60 },
);
const cachedPreviewProjects = unstable_cache(
  fetchPublicPreviewProjects,
  ["studio-preview-v2"],
  { revalidate: 60 },
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
  if (DATA_SOURCE === "static") {
    return staticGetCategoryBySlug(slug);
  }
  const dbCategory = await fetchCategoryBySlug(slug);
  if (!dbCategory) return undefined;
  return adaptCategory(dbCategory);
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
export const getCategories = cache(getCategoriesUncached);
export const getCategoryBySlug = cache(getCategoryBySlugUncached);
export const getProjectBySlug = cache(getProjectBySlugUncached);
export const getAllProjectSlugs = cache(getAllProjectSlugsUncached);
export const getProjectsByCategory = cache(getProjectsByCategoryUncached);
export const getPublicProjects = cache(getPublicProjectsUncached);
export const getFeaturedProjects = cache(getFeaturedProjectsUncached);
export const getPublicProjectCountsByCategory = cache(
  getPublicProjectCountsByCategoryUncached,
);
