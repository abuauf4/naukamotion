/**
 * Idempotent migration script: studio-data.ts → Neon CMS V2
 *
 * Usage: bun run scripts/migrate-to-neon.ts
 *
 * Safe to rerun — uses upsert for Category/Project, delete+recreate for
 * CaseStudySection/ProjectTechnology.
 *
 * Does NOT seed: Testimonial, Client, Lead, Service, Faq, Insight, Article.
 * Does NOT create ProjectMedia (media migration is a separate phase).
 * Does NOT switch frontend — studio-data.ts remains source of truth.
 */

import { PrismaClient } from '@prisma/client';
import {
  studioCategories,
  studioProjects,
  type StudioProject,
} from '../src/lib/studio-data';

const prisma = new PrismaClient();

// ─── Project state mapping ───
// studio-data.ts status → DB (status, type, visibility)
function mapProjectState(p: StudioProject): {
  status: 'draft' | 'published' | 'development';
  type: 'client' | 'personal' | 'collaboration' | 'internal';
  visibility: 'public' | 'private';
} {
  // Known collaboration projects (from brief)
  if (p.slug === 'lets-go-karimun' || p.slug === 'anima-companion') {
    return { status: 'published', type: 'collaboration', visibility: 'public' };
  }

  // Personal projects (studio-data.ts status=internal)
  if (p.status === 'internal') {
    return { status: 'published', type: 'personal', visibility: 'public' };
  }

  // Development projects (Inventra, Nauka Kostay, Padel Club)
  if (p.status === 'development') {
    return { status: 'development', type: 'personal', visibility: 'public' };
  }

  // Default: published client work
  return { status: 'published', type: 'client', visibility: 'public' };
}

// ─── Parse techStory details into per-technology descriptions ───
function parseTechDescriptions(
  techStory: StudioProject['caseStudy']['techStory']
): Map<string, { id: string; en: string }> {
  const map = new Map<string, { id: string; en: string }>();
  if (!techStory) return map;

  for (const detail of techStory.details) {
    // Find which technology this detail describes
    for (const tech of techStory.stack) {
      if (
        detail.id.startsWith(tech) ||
        detail.en.startsWith(tech)
      ) {
        map.set(tech, { id: detail.id, en: detail.en });
        break;
      }
    }
  }
  return map;
}

async function main() {
  console.log('=== Starting migration: studio-data.ts → Neon ===\n');

  // ─── Validate nextProjectSlug references ───
  const allSlugs = new Set(studioProjects.map((p) => p.slug));
  console.log('Validating nextProjectSlug references...');
  for (const p of studioProjects) {
    const next = p.caseStudy.nextProjectSlug;
    if (next && !allSlugs.has(next)) {
      throw new Error(
        `Project "${p.slug}" has nextProjectSlug="${next}" which does not exist`
      );
    }
  }
  console.log('✓ All nextProjectSlug references valid\n');

  // ─── 1. Create Categories ───
  console.log('Migrating categories...');
  for (const cat of studioCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: {
        slug: cat.slug,
        index: cat.index,
        title: cat.title,
        description: cat.description,
        accent: cat.accent,
        status: 'published',
        sortOrder: parseInt(cat.index) - 1,
      },
      update: {
        index: cat.index,
        title: cat.title,
        description: cat.description,
        accent: cat.accent,
        status: 'published',
        sortOrder: parseInt(cat.index) - 1,
      },
    });
    console.log(`  ✓ ${cat.slug}`);
  }
  console.log(`✓ ${studioCategories.length} categories migrated\n`);

  // ─── 2. Create Projects ───
  console.log('Migrating projects...');
  for (const p of studioProjects) {
    const state = mapProjectState(p);
    const techIntro = p.caseStudy.techStory
      ? p.caseStudy.techStory.intro
      : null;

    await prisma.project.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        index: p.index,
        name: p.name,
        categorySlug: p.categorySlug,
        tagline: p.tagline,
        summary: p.summary,
        year: p.year,
        client: p.client,
        industry: p.industry,
        cover: p.cover, // transitional field
        accent: p.accent,
        liveUrl: p.liveUrl ?? null,
        status: state.status,
        type: state.type,
        visibility: state.visibility,
        sortOrder: p.order,
        featured: false,
        techStack: p.techStack, // transitional field
        role: p.role,
        techIntro: techIntro,
        nextProjectSlug: p.caseStudy.nextProjectSlug ?? null,
      },
      update: {
        index: p.index,
        name: p.name,
        categorySlug: p.categorySlug,
        tagline: p.tagline,
        summary: p.summary,
        year: p.year,
        client: p.client,
        industry: p.industry,
        cover: p.cover,
        accent: p.accent,
        liveUrl: p.liveUrl ?? null,
        status: state.status,
        type: state.type,
        visibility: state.visibility,
        sortOrder: p.order,
        featured: false,
        techStack: p.techStack,
        role: p.role,
        techIntro: techIntro,
        nextProjectSlug: p.caseStudy.nextProjectSlug ?? null,
      },
    });

    console.log(
      `  ✓ ${p.slug} | status=${state.status} type=${state.type} visibility=${state.visibility}`
    );
  }
  console.log(`✓ ${studioProjects.length} projects migrated\n`);

  // ─── 3. Create CaseStudySections (delete + recreate) ───
  console.log('Migrating case study sections...');
  let totalSections = 0;
  for (const p of studioProjects) {
    // Delete existing sections for this project
    await prisma.caseStudySection.deleteMany({
      where: { projectSlug: p.slug },
    });

    // Create new sections
    for (let i = 0; i < p.caseStudy.sections.length; i++) {
      const s = p.caseStudy.sections[i];
      await prisma.caseStudySection.create({
        data: {
          projectSlug: p.slug,
          sortOrder: i,
          heading: s.heading,
          body: s.body,
          bullets: s.bullets ?? undefined,
        },
      });
      totalSections++;
    }
  }
  console.log(`✓ ${totalSections} case study sections migrated\n`);

  // ─── 4. Create ProjectTechnology (delete + recreate) ───
  console.log('Migrating project technologies...');
  let totalTech = 0;
  for (const p of studioProjects) {
    // Delete existing technologies for this project
    await prisma.projectTechnology.deleteMany({
      where: { projectSlug: p.slug },
    });

    // Parse tech descriptions from techStory if available
    const techDescriptions = parseTechDescriptions(p.caseStudy.techStory);

    // Create technology rows from techStack
    for (let i = 0; i < p.techStack.length; i++) {
      const techName = p.techStack[i];
      const desc = techDescriptions.get(techName) ?? { id: '', en: '' };

      await prisma.projectTechnology.create({
        data: {
          projectSlug: p.slug,
          name: techName,
          description: desc,
          sortOrder: i,
        },
      });
      totalTech++;
    }
  }
  console.log(`✓ ${totalTech} project technologies migrated\n`);

  // ─── Summary ───
  console.log('=== Migration Summary ===');
  console.log(`  Categories: ${studioCategories.length}`);
  console.log(`  Projects: ${studioProjects.length}`);
  console.log(`  CaseStudySections: ${totalSections}`);
  console.log(`  ProjectTechnologies: ${totalTech}`);
  console.log(`  TechStories (techIntro set): ${studioProjects.filter((p) => p.caseStudy.techStory).length}`);
  console.log('\n✅ Migration complete.');
}

main()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
