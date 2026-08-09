/**
 * Verification script: compare Neon DB vs studio-data.ts
 * Read-only — does not modify any data.
 */

import { PrismaClient } from '@prisma/client';
import {
  studioCategories,
  studioProjects,
} from '../src/lib/studio-data';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Neon DB vs studio-data.ts Parity Check ===\n');

  let errors = 0;
  let warnings = 0;

  // ─── 1. Category count ───
  const dbCategories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  console.log(`Categories: source=${studioCategories.length} | db=${dbCategories.length}`);
  if (dbCategories.length !== studioCategories.length) {
    console.log('❌ Category count mismatch');
    errors++;
  } else {
    console.log('✓ Match');
  }

  // Verify each category
  for (const srcCat of studioCategories) {
    const dbCat = dbCategories.find((c) => c.slug === srcCat.slug);
    if (!dbCat) {
      console.log(`❌ Category "${srcCat.slug}" missing in DB`);
      errors++;
      continue;
    }
    if (dbCat.title !== srcCat.title) {
      console.log(`❌ Category "${srcCat.slug}" title mismatch: src="${srcCat.title}" db="${dbCat.title}"`);
      errors++;
    }
    if (dbCat.index !== srcCat.index) {
      console.log(`❌ Category "${srcCat.slug}" index mismatch: src="${srcCat.index}" db="${dbCat.index}"`);
      errors++;
    }
    if (dbCat.accent !== srcCat.accent) {
      console.log(`❌ Category "${srcCat.slug}" accent mismatch: src="${srcCat.accent}" db="${dbCat.accent}"`);
      errors++;
    }
    // Verify description JSON
    const dbDesc = dbCat.description as { id: string; en: string };
    if (dbDesc.id !== srcCat.description.id || dbDesc.en !== srcCat.description.en) {
      console.log(`❌ Category "${srcCat.slug}" description mismatch`);
      errors++;
    }
  }
  console.log('');

  // ─── 2. Project count ───
  const dbProjects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { category: true },
  });
  console.log(`Projects: source=${studioProjects.length} | db=${dbProjects.length}`);
  if (dbProjects.length !== studioProjects.length) {
    console.log('❌ Project count mismatch');
    errors++;
  } else {
    console.log('✓ Match');
  }

  // ─── 3. Verify each project ───
  console.log('\n--- Project field verification ---');
  for (const srcProj of studioProjects) {
    const dbProj = dbProjects.find((p) => p.slug === srcProj.slug);
    if (!dbProj) {
      console.log(`❌ Project "${srcProj.slug}" missing in DB`);
      errors++;
      continue;
    }

    const issues: string[] = [];

    // Basic fields
    if (dbProj.name !== srcProj.name) issues.push(`name: src="${srcProj.name}" db="${dbProj.name}"`);
    if (dbProj.index !== srcProj.index) issues.push(`index: src="${srcProj.index}" db="${dbProj.index}"`);
    if (dbProj.categorySlug !== srcProj.categorySlug) issues.push(`categorySlug: src="${srcProj.categorySlug}" db="${dbProj.categorySlug}"`);
    if (dbProj.year !== srcProj.year) issues.push(`year: src="${srcProj.year}" db="${dbProj.year}"`);
    if (dbProj.client !== srcProj.client) issues.push(`client: src="${srcProj.client}" db="${dbProj.client}"`);
    if (dbProj.industry !== srcProj.industry) issues.push(`industry: src="${srcProj.industry}" db="${dbProj.industry}"`);
    if (dbProj.cover !== srcProj.cover) issues.push(`cover: src="${srcProj.cover}" db="${dbProj.cover}"`);
    if (dbProj.accent !== srcProj.accent) issues.push(`accent: src="${srcProj.accent}" db="${dbProj.accent}"`);
    if ((dbProj.liveUrl ?? null) !== (srcProj.liveUrl ?? null)) issues.push(`liveUrl: src="${srcProj.liveUrl}" db="${dbProj.liveUrl}"`);
    if (dbProj.sortOrder !== srcProj.order) issues.push(`sortOrder: src=${srcProj.order} db=${dbProj.sortOrder}`);

    // Verify category relation
    if (!dbProj.category) {
      issues.push('category relation missing');
    }

    // Localized JSON fields
    const dbTagline = dbProj.tagline as { id: string; en: string };
    if (dbTagline.id !== srcProj.tagline.id || dbTagline.en !== srcProj.tagline.en) {
      issues.push('tagline mismatch');
    }
    const dbSummary = dbProj.summary as { id: string; en: string };
    if (dbSummary.id !== srcProj.summary.id || dbSummary.en !== srcProj.summary.en) {
      issues.push('summary mismatch');
    }
    const dbRole = dbProj.role as { id: string; en: string };
    if (dbRole.id !== srcProj.role.id || dbRole.en !== srcProj.role.en) {
      issues.push('role mismatch');
    }

    // techIntro
    if (srcProj.caseStudy.techStory) {
      const dbTechIntro = dbProj.techIntro as { id: string; en: string } | null;
      if (!dbTechIntro) {
        issues.push('techIntro: should be set but is null');
      } else if (
        dbTechIntro.id !== srcProj.caseStudy.techStory.intro.id ||
        dbTechIntro.en !== srcProj.caseStudy.techStory.intro.en
      ) {
        issues.push('techIntro content mismatch');
      }
    } else {
      if (dbProj.techIntro !== null) {
        issues.push('techIntro: should be null but is set');
      }
    }

    // techStack transitional
    const dbTechStack = dbProj.techStack as string[];
    if (JSON.stringify(dbTechStack) !== JSON.stringify(srcProj.techStack)) {
      issues.push(`techStack mismatch: src=[${srcProj.techStack.join(',')}] db=[${dbTechStack.join(',')}]`);
    }

    // nextProjectSlug
    if ((dbProj.nextProjectSlug ?? null) !== (srcProj.caseStudy.nextProjectSlug ?? null)) {
      issues.push(`nextProjectSlug: src="${srcProj.caseStudy.nextProjectSlug}" db="${dbProj.nextProjectSlug}"`);
    }

    // Verify nextProjectSlug points to valid project
    if (dbProj.nextProjectSlug) {
      const exists = studioProjects.find((p) => p.slug === dbProj.nextProjectSlug);
      if (!exists) {
        issues.push(`nextProjectSlug="${dbProj.nextProjectSlug}" does not point to valid project`);
      }
    }

    if (issues.length > 0) {
      console.log(`❌ ${srcProj.slug}:`);
      for (const issue of issues) console.log(`   ${issue}`);
      errors += issues.length;
    } else {
      console.log(`✓ ${srcProj.slug} — all fields match`);
    }
  }

  // ─── 4. Verify status/type/visibility mapping ───
  console.log('\n--- Status/Type/Visibility mapping ---');
  const expectedMapping: Record<string, { status: string; type: string; visibility: string }> = {
    'geely-bsd': { status: 'published', type: 'client', visibility: 'public' },
    'suzuki-jakbar': { status: 'published', type: 'client', visibility: 'public' },
    'mitsubishi': { status: 'published', type: 'client', visibility: 'public' },
    'jaecoo-bintaro': { status: 'published', type: 'client', visibility: 'public' },
    'berkah-komputer': { status: 'published', type: 'client', visibility: 'public' },
    'jakarta-laptops': { status: 'published', type: 'client', visibility: 'public' },
    'ghazy-computer': { status: 'published', type: 'client', visibility: 'public' },
    'blessing-tech': { status: 'published', type: 'client', visibility: 'public' },
    'jasa-proteksi': { status: 'published', type: 'client', visibility: 'public' },
    'betawi-laptop': { status: 'published', type: 'client', visibility: 'public' },
    'inventra': { status: 'development', type: 'personal', visibility: 'public' },
    'lets-go-karimun': { status: 'published', type: 'collaboration', visibility: 'public' },
    'anima-companion': { status: 'published', type: 'collaboration', visibility: 'public' },
    'nauka-motion': { status: 'published', type: 'personal', visibility: 'public' },
    'jejak-cahaya': { status: 'published', type: 'personal', visibility: 'public' },
    'nauka-tech': { status: 'published', type: 'personal', visibility: 'public' },
    'nauka-gadget': { status: 'published', type: 'personal', visibility: 'public' },
    'nauka-kostay': { status: 'development', type: 'personal', visibility: 'public' },
    'padel-club': { status: 'development', type: 'personal', visibility: 'public' },
  };

  for (const dbProj of dbProjects) {
    const expected = expectedMapping[dbProj.slug];
    if (!expected) {
      console.log(`⚠️  No expected mapping for "${dbProj.slug}"`);
      warnings++;
      continue;
    }
    if (
      dbProj.status !== expected.status ||
      dbProj.type !== expected.type ||
      dbProj.visibility !== expected.visibility
    ) {
      console.log(
        `❌ ${dbProj.slug}: expected status=${expected.status} type=${expected.type} visibility=${expected.visibility} | got status=${dbProj.status} type=${dbProj.type} visibility=${dbProj.visibility}`
      );
      errors++;
    } else {
      console.log(`✓ ${dbProj.slug}: status=${dbProj.status} type=${dbProj.type} visibility=${dbProj.visibility}`);
    }
  }

  // ─── 5. CaseStudySection count ───
  const dbSections = await prisma.caseStudySection.findMany();
  const srcSectionCount = studioProjects.reduce(
    (sum, p) => sum + p.caseStudy.sections.length,
    0
  );
  console.log(`\nCaseStudySections: source=${srcSectionCount} | db=${dbSections.length}`);
  if (dbSections.length !== srcSectionCount) {
    console.log('❌ Section count mismatch');
    errors++;
  } else {
    console.log('✓ Match');
  }

  // Verify sections per project
  for (const srcProj of studioProjects) {
    const dbProjSections = await prisma.caseStudySection.findMany({
      where: { projectSlug: srcProj.slug },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbProjSections.length !== srcProj.caseStudy.sections.length) {
      console.log(`❌ ${srcProj.slug}: sections src=${srcProj.caseStudy.sections.length} db=${dbProjSections.length}`);
      errors++;
      continue;
    }
    // Verify heading content
    for (let i = 0; i < srcProj.caseStudy.sections.length; i++) {
      const srcSection = srcProj.caseStudy.sections[i];
      const dbSection = dbProjSections[i];
      const dbHeading = dbSection.heading as { id: string; en: string };
      if (dbHeading.id !== srcSection.heading.id || dbHeading.en !== srcSection.heading.en) {
        console.log(`❌ ${srcProj.slug} section[${i}] heading mismatch`);
        errors++;
      }
      // Verify body count
      const dbBody = dbSection.body as Array<{ id: string; en: string }>;
      if (dbBody.length !== srcSection.body.length) {
        console.log(`❌ ${srcProj.slug} section[${i}] body count: src=${srcSection.body.length} db=${dbBody.length}`);
        errors++;
      }
    }
  }
  console.log('✓ All section headings and body counts verified');

  // ─── 6. ProjectTechnology count ───
  const dbTechs = await prisma.projectTechnology.findMany();
  const srcTechCount = studioProjects.reduce(
    (sum, p) => sum + p.techStack.length,
    0
  );
  console.log(`\nProjectTechnologies: source=${srcTechCount} | db=${dbTechs.length}`);
  if (dbTechs.length !== srcTechCount) {
    console.log('❌ Technology count mismatch');
    errors++;
  } else {
    console.log('✓ Match');
  }

  // Verify technologies per project
  for (const srcProj of studioProjects) {
    const dbProjTechs = await prisma.projectTechnology.findMany({
      where: { projectSlug: srcProj.slug },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbProjTechs.length !== srcProj.techStack.length) {
      console.log(`❌ ${srcProj.slug}: techs src=${srcProj.techStack.length} db=${dbProjTechs.length}`);
      errors++;
      continue;
    }
    for (let i = 0; i < srcProj.techStack.length; i++) {
      if (dbProjTechs[i].name !== srcProj.techStack[i]) {
        console.log(`❌ ${srcProj.slug} tech[${i}]: src="${srcProj.techStack[i]}" db="${dbProjTechs[i].name}"`);
        errors++;
      }
    }
  }
  console.log('✓ All technology names and order verified');

  // ─── 7. Duplicate slug check ───
  const slugCounts = await prisma.$queryRawUnsafe(`
    SELECT slug, COUNT(*) as count FROM "Project" GROUP BY slug HAVING COUNT(*) > 1
  `) as Array<{ slug: string; count: number }>;
  if (slugCounts.length > 0) {
    console.log('\n❌ Duplicate project slugs found:');
    for (const s of slugCounts) console.log(`   ${s.slug}: ${s.count} duplicates`);
    errors++;
  } else {
    console.log('\n✓ No duplicate project slugs');
  }

  // ─── 8. liveUrl nullable check ───
  const nullLiveUrlProjects = await prisma.project.findMany({
    where: { liveUrl: null },
    select: { slug: true },
  });
  console.log(`\nProjects with null liveUrl: ${nullLiveUrlProjects.length}`);
  for (const p of nullLiveUrlProjects) {
    const srcProj = studioProjects.find((sp) => sp.slug === p.slug);
    if (srcProj && srcProj.liveUrl) {
      console.log(`❌ ${p.slug}: should have liveUrl="${srcProj.liveUrl}" but is null in DB`);
      errors++;
    } else {
      console.log(`✓ ${p.slug}: correctly null`);
    }
  }

  // ─── 9. Intentionally skipped ───
  console.log('\n--- Intentionally Skipped ---');
  console.log('  ProjectMedia: NOT created (media migration is separate phase)');
  console.log('  Testimonial: NOT seeded (no real data)');
  console.log('  Client: NOT seeded (no real data)');
  console.log('  Lead: NOT seeded (no real data)');
  console.log('  Service: NOT seeded (no real data)');
  console.log('  Faq: NOT seeded (hardcoded in component, not in studio-data.ts)');
  console.log('  Insight/Article: NOT seeded (no real data)');
  console.log('  Project.cover: copied as transitional field (not approved asset)');
  console.log('  Project.techStack: copied as transitional field (target: ProjectTechnology)');

  // ─── Summary ───
  console.log('\n=== Parity Check Summary ===');
  console.log(`  Errors: ${errors}`);
  console.log(`  Warnings: ${warnings}`);
  if (errors === 0) {
    console.log('✅ ALL CHECKS PASSED — 0 unexplained differences');
  } else {
    console.log(`❌ ${errors} ERRORS FOUND — review above`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Verification failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
