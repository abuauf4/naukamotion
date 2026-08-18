/**
 * CMS Repository — Raw Prisma queries (server-side only)
 *
 * Reads from Neon PostgreSQL and returns Prisma records.
 * Does NOT shape data for frontend — use adapter.ts for that.
 *
 * Public queries respect:
 *   - visibility = 'public' (exclude private projects)
 *   - status != 'draft' (exclude drafts)
 */

import { prisma } from './db';
import type { Prisma } from '@prisma/client';

// ─── Types (re-exported for adapter) ───

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    category: true;
    sections: { orderBy: { sortOrder: 'asc' } };
    technologies: { orderBy: { sortOrder: 'asc' } };
    media: { orderBy: { sortOrder: 'asc' } };
  };
}>;

export type FeaturedProjectRecord = Prisma.ProjectGetPayload<{
  select: {
    slug: true;
    index: true;
    name: true;
    categorySlug: true;
    tagline: true;
    year: true;
    cover: true;
    accent: true;
    category: { select: { title: true } };
    media: {
      where: { type: 'cover' };
      orderBy: { sortOrder: 'asc' };
      take: 1;
      select: { url: true };
    };
  };
}>;

// ─── Category queries ───

export async function fetchAllCategories(): Promise<
  Prisma.CategoryGetPayload<{}>[]
> {
  return prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  });
}

export async function fetchCategoryBySlug(
  slug: string
): Promise<Prisma.CategoryGetPayload<{}> | null> {
  return prisma.category.findUnique({ where: { slug } });
}

// ─── Project queries ───

/**
 * Fetch all public projects (visibility=public, status != draft).
 * Includes category, sections, and technologies.
 */
export async function fetchPublicProjects(): Promise<ProjectWithRelations[]> {
  return prisma.project.findMany({
    where: {
      visibility: 'public',
      status: { not: 'draft' },
    },
    orderBy: { sortOrder: 'asc' },
    include: {
      category: true,
      sections: { orderBy: { sortOrder: 'asc' } },
      technologies: { orderBy: { sortOrder: 'asc' } },
      media: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

export async function fetchFeaturedProjects(): Promise<FeaturedProjectRecord[]> {
  return prisma.project.findMany({
    where: {
      featured: true,
      visibility: 'public',
      status: { not: 'draft' },
    },
    orderBy: { sortOrder: 'asc' },
    select: {
      slug: true,
      index: true,
      name: true,
      categorySlug: true,
      tagline: true,
      year: true,
      cover: true,
      accent: true,
      category: { select: { title: true } },
      media: {
        where: { type: 'cover' },
        orderBy: { sortOrder: 'asc' },
        take: 1,
        select: { url: true },
      },
    },
  });
}

/**
 * Fetch a single public project by slug.
 * Returns null if not found, private, or draft.
 */
export async function fetchPublicProjectBySlug(
  slug: string
): Promise<ProjectWithRelations | null> {
  return prisma.project.findFirst({
    where: {
      slug,
      visibility: 'public',
      status: { not: 'draft' },
    },
    include: {
      category: true,
      sections: { orderBy: { sortOrder: 'asc' } },
      technologies: { orderBy: { sortOrder: 'asc' } },
      media: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

/**
 * Fetch public projects for a specific category.
 */
export async function fetchPublicProjectsByCategory(
  categorySlug: string
): Promise<ProjectWithRelations[]> {
  return prisma.project.findMany({
    where: {
      categorySlug,
      visibility: 'public',
      status: { not: 'draft' },
    },
    orderBy: { sortOrder: 'asc' },
    include: {
      category: true,
      sections: { orderBy: { sortOrder: 'asc' } },
      technologies: { orderBy: { sortOrder: 'asc' } },
      media: { orderBy: { sortOrder: 'asc' } },
    },
  });
}

/**
 * Fetch all public project slugs (for sitemap, generateStaticParams).
 */
export async function fetchAllPublicSlugs(): Promise<string[]> {
  const projects = await prisma.project.findMany({
    where: {
      visibility: 'public',
      status: { not: 'draft' },
    },
    select: { slug: true },
    orderBy: { sortOrder: 'asc' },
  });
  return projects.map((p) => p.slug);
}

/**
 * Lightweight category → public-project-count query for the homepage.
 *
 * Returns a map of categorySlug → count using a single groupBy query,
 * avoiding the V1 N+1 pattern where each category triggered a separate
 * findMany with full relations (sections, technologies, media) just to
 * compute `.length`.
 *
 * Used by the homepage only. Project detail routes still load full
 * relations via fetchPublicProjectBySlug.
 */
export async function fetchPublicProjectCountsByCategory(): Promise<
  Record<string, number>
> {
  const grouped = await prisma.project.groupBy({
    by: ['categorySlug'],
    where: {
      visibility: 'public',
      status: { not: 'draft' },
    },
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const row of grouped) {
    counts[row.categorySlug] = row._count._all;
  }
  return counts;
}
