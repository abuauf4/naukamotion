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
} from '../studio-data';

// ─── Re-export static-only data (not in DB yet) ───
export { studioStats, studioCapabilities, studioProcess } from '../studio-data';

// ─── Source selection ───
// Default: 'database' (Neon is source of truth)
// Emergency fallback: CMS_DATA_SOURCE=static
const DATA_SOURCE = process.env.CMS_DATA_SOURCE ?? 'database';

// ─── Static imports (emergency fallback) ───
import {
  studioCategories,
  studioProjects,
  getCategoryBySlug as staticGetCategoryBySlug,
  getProjectBySlug as staticGetProjectBySlug,
  getAllProjectSlugs as staticGetAllProjectSlugs,
  getProjectsByCategory as staticGetProjectsByCategory,
  getPublicProjects as staticGetPublicProjects,
} from '../studio-data';

// ─── Database imports ───
import {
  fetchAllCategories,
  fetchCategoryBySlug,
  fetchPublicProjects,
  fetchFeaturedProjects,
  fetchPublicProjectBySlug,
  fetchPublicProjectsByCategory,
  fetchAllPublicSlugs,
  fetchPublicProjectCountsByCategory,
} from './repository';
import {
  adaptCategory,
  adaptCategories,
  adaptProjects,
  adaptProject,
} from './adapter';
import type {
  StudioCategory,
  StudioProject,
  CategorySlug,
} from '../studio-data';

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
};

// ─── Public API ───

export async function getCategories(): Promise<StudioCategory[]> {
  if (DATA_SOURCE === 'static') {
    return studioCategories;
  }
  const dbCategories = await fetchAllCategories();
  return adaptCategories(dbCategories);
}

export async function getCategoryBySlug(
  slug: string
): Promise<StudioCategory | undefined> {
  if (DATA_SOURCE === 'static') {
    return staticGetCategoryBySlug(slug);
  }
  const dbCategory = await fetchCategoryBySlug(slug);
  if (!dbCategory) return undefined;
  return adaptCategory(dbCategory);
}

export async function getProjectBySlug(
  slug: string
): Promise<StudioProject | undefined> {
  if (DATA_SOURCE === 'static') {
    return staticGetProjectBySlug(slug);
  }
  const dbProject = await fetchPublicProjectBySlug(slug);
  if (!dbProject) return undefined;
  return adaptProject(dbProject);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (DATA_SOURCE === 'static') {
    return staticGetAllProjectSlugs();
  }
  return fetchAllPublicSlugs();
}

export async function getProjectsByCategory(
  categorySlug: CategorySlug
): Promise<StudioProject[]> {
  if (DATA_SOURCE === 'static') {
    return staticGetProjectsByCategory(categorySlug);
  }
  const dbProjects = await fetchPublicProjectsByCategory(categorySlug);
  return adaptProjects(dbProjects);
}

export async function getPublicProjects(): Promise<StudioProject[]> {
  if (DATA_SOURCE === 'static') {
    return staticGetPublicProjects();
  }
  const dbProjects = await fetchPublicProjects();
  return adaptProjects(dbProjects);
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  if (DATA_SOURCE === 'static') {
    return studioProjects
      .filter((project) => project.status !== 'draft')
      .sort((a, b) => a.order - b.order)
      .slice(0, 3)
      .map((project) => ({
        slug: project.slug,
        index: project.index,
        name: project.name,
        categorySlug: project.categorySlug,
        categoryTitle: studioCategories.find((category) => category.slug === project.categorySlug)?.title ?? project.categorySlug,
        tagline: project.tagline,
        year: project.year,
        cover: project.cover,
        accent: project.accent,
      }));
  }

  const projects = await fetchFeaturedProjects();
  return projects.map((project) => ({
    slug: project.slug,
    index: project.index,
    name: project.name,
    categorySlug: project.categorySlug,
    categoryTitle: project.category.title,
    tagline: project.tagline as { id: string; en: string },
    year: project.year,
    cover: project.media[0]?.url ?? project.cover,
    accent: project.accent,
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
export async function getPublicProjectCountsByCategory(): Promise<
  Record<string, number>
> {
  if (DATA_SOURCE === 'static') {
    const counts: Record<string, number> = {};
    for (const cat of studioCategories) {
      counts[cat.slug] = staticGetProjectsByCategory(cat.slug).length;
    }
    return counts;
  }
  return fetchPublicProjectCountsByCategory();
}
