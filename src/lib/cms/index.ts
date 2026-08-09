/**
 * CMS Source Selector
 *
 * Exports the same data shape as studio-data.ts, but reads from
 * Neon database when CMS_DATA_SOURCE=database.
 *
 * Default is "static" — production stays on studio-data.ts.
 * Set CMS_DATA_SOURCE=database to test Neon output locally.
 *
 * Server-side only. Client components continue to import
 * from @/lib/studio-data directly.
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

const DATA_SOURCE = process.env.CMS_DATA_SOURCE ?? 'static';

// ─── Static imports (fallback / default) ───
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
  fetchPublicProjectBySlug,
  fetchPublicProjectsByCategory,
  fetchAllPublicSlugs,
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

// ─── Public API (async — works for both static and database) ───

export async function getCategories(): Promise<StudioCategory[]> {
  if (DATA_SOURCE === 'database') {
    const dbCategories = await fetchAllCategories();
    return adaptCategories(dbCategories);
  }
  return studioCategories;
}

export async function getCategoryBySlug(
  slug: string
): Promise<StudioCategory | undefined> {
  if (DATA_SOURCE === 'database') {
    const dbCategory = await fetchCategoryBySlug(slug);
    if (!dbCategory) return undefined;
    return adaptCategory(dbCategory);
  }
  return staticGetCategoryBySlug(slug);
}

export async function getProjectBySlug(
  slug: string
): Promise<StudioProject | undefined> {
  if (DATA_SOURCE === 'database') {
    const dbProject = await fetchPublicProjectBySlug(slug);
    if (!dbProject) return undefined;
    return adaptProject(dbProject);
  }
  return staticGetProjectBySlug(slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (DATA_SOURCE === 'database') {
    return fetchAllPublicSlugs();
  }
  return staticGetAllProjectSlugs();
}

export async function getProjectsByCategory(
  categorySlug: CategorySlug
): Promise<StudioProject[]> {
  if (DATA_SOURCE === 'database') {
    const dbProjects = await fetchPublicProjectsByCategory(categorySlug);
    return adaptProjects(dbProjects);
  }
  return staticGetProjectsByCategory(categorySlug);
}

export async function getPublicProjects(): Promise<StudioProject[]> {
  if (DATA_SOURCE === 'database') {
    const dbProjects = await fetchPublicProjects();
    return adaptProjects(dbProjects);
  }
  return staticGetPublicProjects();
}

// ─── Also export static arrays for backward compat ───
// (server components that need synchronous access during static mode)
export { studioCategories, studioProjects } from '../studio-data';
