/**
 * CMS Adapter — Converts Prisma records to frontend data shape
 *
 * Output types match src/lib/studio-data.ts exactly so that
 * server components can use CMS data as a drop-in replacement.
 *
 * Mappings:
 *   DB status/type/visibility → studio-data.ts ProjectStatus
 *   DB JSON columns → LocalizedText / LocalizedText[]
 *   DB ProjectTechnology[] + techIntro → TechStory (optional)
 *
 * Server-side only. Never imported from client components.
 */

import type {
  ProjectWithRelations,
} from './repository';
import type {
  LocalizedText,
  StudioCategory,
  StudioProject,
  CaseStudySection,
  TechStory,
  ProjectStatus,
  CategorySlug,
} from '../studio-data';

// ─── Helpers ───

function asLocalizedText(json: unknown): LocalizedText {
  const obj = json as { id: string; en: string };
  return { id: obj.id, en: obj.en };
}

function asLocalizedTextArray(json: unknown): LocalizedText[] {
  const arr = json as Array<{ id: string; en: string }>;
  return arr.map((item) => ({ id: item.id, en: item.en }));
}

function asStringArray(json: unknown): string[] {
  return json as string[];
}

// ─── Status mapping (reverse of migration) ───
//
// DB has 3 orthogonal dimensions:
//   status:      draft | published | development
//   type:        client | personal | collaboration | internal
//   visibility:  public | private
//
// studio-data.ts has a single `status` field:
//   published | internal | development | draft
//
// Mapping rules:
//   DB: published + type=personal  → frontend: "internal" (Personal Project badge)
//   DB: published + type=internal  → frontend: "internal" (Personal Project badge)
//   DB: published + type=client    → frontend: "published"
//   DB: published + type=collab    → frontend: "published"
//   DB: development                → frontend: "development"
//   DB: draft                      → frontend: "draft" (should not reach adapter)

function mapStatus(
  dbStatus: string,
  dbType: string
): ProjectStatus {
  if (dbStatus === 'development') return 'development';
  if (dbStatus === 'draft') return 'draft';
  // dbStatus === 'published'
  if (dbType === 'personal' || dbType === 'internal') return 'internal';
  return 'published';
}

// ─── Category adapter ───

export function adaptCategory(
  dbCategory: {
    slug: string;
    index: string;
    title: string;
    description: unknown;
    accent: string;
    status: string;
    sortOrder: number;
  }
): StudioCategory {
  return {
    slug: dbCategory.slug as CategorySlug,
    index: dbCategory.index,
    title: dbCategory.title,
    description: asLocalizedText(dbCategory.description),
    accent: dbCategory.accent,
  };
}

// ─── CaseStudySection adapter ───

export function adaptSection(
  dbSection: {
    id: string;
    sortOrder: number;
    heading: unknown;
    body: unknown;
    bullets: unknown;
  }
): CaseStudySection {
  const section: CaseStudySection = {
    heading: asLocalizedText(dbSection.heading),
    body: asLocalizedTextArray(dbSection.body),
  };

  if (dbSection.bullets !== null) {
    section.bullets = asLocalizedTextArray(dbSection.bullets);
  }

  return section;
}

// ─── TechStory adapter ───
//
// Reconstruct TechStory from:
//   - Project.techIntro (LocalizedText JSON, nullable)
//   - ProjectTechnology[] (name + description LocalizedText)
//   - Project.techStack (string[] JSON, transitional)
//
// TechStory is only created when techIntro is not null.
// details only includes technologies with non-empty descriptions.

export function adaptTechStory(
  dbProject: ProjectWithRelations
): TechStory | undefined {
  if (!dbProject.techIntro) return undefined;

  const intro = asLocalizedText(dbProject.techIntro);

  // Filter technologies with non-empty descriptions
  const details: LocalizedText[] = dbProject.technologies
    .filter((t) => {
      const desc = t.description as { id: string; en: string };
      return desc.id !== '' || desc.en !== '';
    })
    .map((t) => asLocalizedText(t.description));

  // Stack from transitional techStack field (matches studio-data.ts)
  const stack: string[] = asStringArray(dbProject.techStack);

  return { intro, details, stack };
}

// ─── Project adapter ───
//
// Cover URL resolution (ProjectMedia → transitional Project.cover):
//   Public cover = first ProjectMedia where type='cover' (sorted by sortOrder)
//   Fallback      = Project.cover (transitional field, kept for unmigrated projects)
//
// This means: once a cover ProjectMedia row exists for a project, the public
// site renders that Cloudinary URL automatically. Projects without a
// ProjectMedia cover row keep showing their legacy Project.cover path.
// We do NOT write uploads back to Project.cover — uploads only create
// ProjectMedia rows. The transitional field stays as-is until cleaned up
// in a future phase.

function resolveCoverUrl(
  dbProject: ProjectWithRelations
): string {
  const coverMedia = dbProject.media.find((m) => m.type === 'cover');
  if (coverMedia && coverMedia.url) return coverMedia.url;
  return dbProject.cover;
}

export function adaptProject(
  dbProject: ProjectWithRelations
): StudioProject {
  const sections = dbProject.sections.map(adaptSection);
  const techStory = adaptTechStory(dbProject);
  const status = mapStatus(dbProject.status, dbProject.type);
  const cover = resolveCoverUrl(dbProject);

  return {
    slug: dbProject.slug,
    index: dbProject.index,
    name: dbProject.name,
    categorySlug: dbProject.categorySlug as CategorySlug,
    tagline: asLocalizedText(dbProject.tagline),
    summary: asLocalizedText(dbProject.summary),
    year: dbProject.year,
    client: dbProject.client,
    industry: dbProject.industry,
    cover,
    accent: dbProject.accent,
    liveUrl: dbProject.liveUrl ?? undefined,
    status,
    order: dbProject.sortOrder,
    techStack: asStringArray(dbProject.techStack),
    role: asLocalizedText(dbProject.role),
    caseStudy: {
      sections,
      techStory,
      nextProjectSlug: dbProject.nextProjectSlug ?? undefined,
    },
  };
}

// ─── Batch adapters ───

export function adaptCategories(
  dbCategories: Array<{
    slug: string;
    index: string;
    title: string;
    description: unknown;
    accent: string;
    status: string;
    sortOrder: number;
  }>
): StudioCategory[] {
  return dbCategories.map(adaptCategory);
}

export function adaptProjects(
  dbProjects: ProjectWithRelations[]
): StudioProject[] {
  return dbProjects.map(adaptProject);
}
