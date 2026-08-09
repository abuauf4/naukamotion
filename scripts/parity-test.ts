/**
 * Parity Test: studio-data.ts (static) vs Neon CMS (database)
 *
 * Compares all 19 projects and 7 categories field-by-field.
 * Run: CMS_DATA_SOURCE=database bun run scripts/parity-test.ts
 *
 * Target: 0 unexplained differences.
 * Media differences are intentionally excluded (ProjectMedia not migrated).
 */

import {
  studioCategories,
  studioProjects,
} from '../src/lib/studio-data';
import {
  fetchAllCategories,
  fetchPublicProjects,
} from '../src/lib/cms/repository';
import {
  adaptCategory,
  adaptCategories,
  adaptProjects,
} from '../src/lib/cms/adapter';
import type { StudioProject, StudioCategory } from '../src/lib/studio-data';

let errors = 0;
let warnings = 0;

function fail(msg: string) {
  console.log(`  ❌ ${msg}`);
  errors++;
}

function pass(msg: string) {
  console.log(`  ✓ ${msg}`);
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function main() {
  console.log('=== Parity Test: studio-data.ts vs Neon CMS ===\n');

  // ─── 1. Categories ───
  console.log('--- Categories ---');
  const dbCats = await fetchAllCategories();
  const cmsCats = adaptCategories(dbCats);

  console.log(`Count: static=${studioCategories.length} | db=${cmsCats.length}`);
  if (cmsCats.length !== studioCategories.length) fail('Category count mismatch');
  else pass('Category count match');

  for (const srcCat of studioCategories) {
    const cmsCat = cmsCats.find((c) => c.slug === srcCat.slug);
    if (!cmsCat) {
      fail(`Category "${srcCat.slug}" missing from DB`);
      continue;
    }

    if (cmsCat.index !== srcCat.index) fail(`"${srcCat.slug}" index: static="${srcCat.index}" db="${cmsCat.index}"`);
    if (cmsCat.title !== srcCat.title) fail(`"${srcCat.slug}" title: static="${srcCat.title}" db="${cmsCat.title}"`);
    if (cmsCat.accent !== srcCat.accent) fail(`"${srcCat.slug}" accent: static="${srcCat.accent}" db="${cmsCat.accent}"`);
    if (!deepEqual(cmsCat.description, srcCat.description)) fail(`"${srcCat.slug}" description mismatch`);
  }
  pass('All category fields verified');

  // ─── 2. Projects ───
  console.log('\n--- Projects ---');
  const dbProjs = await fetchPublicProjects();
  const cmsProjs = adaptProjects(dbProjs);

  console.log(`Count: static=${studioProjects.length} | db=${cmsProjs.length}`);
  if (cmsProjs.length !== studioProjects.length) fail('Project count mismatch');
  else pass('Project count match');

  // ─── 3. Verify each project ───
  console.log('\n--- Project field-by-field ---');
  for (const srcProj of studioProjects) {
    const cmsProj = cmsProjs.find((p) => p.slug === srcProj.slug);
    if (!cmsProj) {
      fail(`Project "${srcProj.slug}" missing from DB`);
      continue;
    }

    const issues: string[] = [];

    // Basic fields
    if (cmsProj.name !== srcProj.name) issues.push(`name: s="${srcProj.name}" d="${cmsProj.name}"`);
    if (cmsProj.index !== srcProj.index) issues.push(`index: s="${srcProj.index}" d="${cmsProj.index}"`);
    if (cmsProj.categorySlug !== srcProj.categorySlug) issues.push(`categorySlug: s="${srcProj.categorySlug}" d="${cmsProj.categorySlug}"`);
    if (cmsProj.year !== srcProj.year) issues.push(`year: s="${srcProj.year}" d="${cmsProj.year}"`);
    if (cmsProj.client !== srcProj.client) issues.push(`client: s="${srcProj.client}" d="${cmsProj.client}"`);
    if (cmsProj.industry !== srcProj.industry) issues.push(`industry: s="${srcProj.industry}" d="${cmsProj.industry}"`);
    if (cmsProj.cover !== srcProj.cover) issues.push(`cover: s="${srcProj.cover}" d="${cmsProj.cover}"`);
    if (cmsProj.accent !== srcProj.accent) issues.push(`accent: s="${srcProj.accent}" d="${cmsProj.accent}"`);
    if ((cmsProj.liveUrl ?? null) !== (srcProj.liveUrl ?? null)) issues.push(`liveUrl: s="${srcProj.liveUrl}" d="${cmsProj.liveUrl}"`);
    if (cmsProj.order !== srcProj.order) issues.push(`order: s=${srcProj.order} d=${cmsProj.order}`);

    // Status mapping
    if (cmsProj.status !== srcProj.status) {
      issues.push(`status: s="${srcProj.status}" d="${cmsProj.status}"`);
    }

    // Localized JSON fields
    if (!deepEqual(cmsProj.tagline, srcProj.tagline)) issues.push('tagline mismatch');
    if (!deepEqual(cmsProj.summary, srcProj.summary)) issues.push('summary mismatch');
    if (!deepEqual(cmsProj.role, srcProj.role)) issues.push('role mismatch');

    // techStack
    if (!deepEqual(cmsProj.techStack, srcProj.techStack)) {
      issues.push(`techStack: s=[${srcProj.techStack.join(',')}] d=[${cmsProj.techStack.join(',')}]`);
    }

    // Case study sections
    const srcSections = srcProj.caseStudy.sections;
    const cmsSections = cmsProj.caseStudy.sections;

    if (cmsSections.length !== srcSections.length) {
      issues.push(`sections count: s=${srcSections.length} d=${cmsSections.length}`);
    } else {
      for (let i = 0; i < srcSections.length; i++) {
        if (!deepEqual(cmsSections[i].heading, srcSections[i].heading)) {
          issues.push(`section[${i}] heading mismatch`);
        }
        if (!deepEqual(cmsSections[i].body, srcSections[i].body)) {
          issues.push(`section[${i}] body mismatch`);
        }
        if (!deepEqual(cmsSections[i].bullets ?? null, srcSections[i].bullets ?? null)) {
          issues.push(`section[${i}] bullets mismatch`);
        }
      }
    }

    // TechStory
    const srcTech = srcProj.caseStudy.techStory;
    const cmsTech = cmsProj.caseStudy.techStory;

    if (srcTech && !cmsTech) {
      issues.push('techStory: source has it, DB does not');
    } else if (!srcTech && cmsTech) {
      issues.push('techStory: DB has it, source does not');
    } else if (srcTech && cmsTech) {
      if (!deepEqual(cmsTech.intro, srcTech.intro)) issues.push('techStory.intro mismatch');
      if (!deepEqual(cmsTech.details, srcTech.details)) issues.push(`techStory.details mismatch (s=${srcTech.details.length} d=${cmsTech.details.length})`);
      if (!deepEqual(cmsTech.stack, srcTech.stack)) issues.push('techStory.stack mismatch');
    }

    // nextProjectSlug
    if ((cmsProj.caseStudy.nextProjectSlug ?? null) !== (srcProj.caseStudy.nextProjectSlug ?? null)) {
      issues.push(`nextProjectSlug: s="${srcProj.caseStudy.nextProjectSlug}" d="${cmsProj.caseStudy.nextProjectSlug}"`);
    }

    if (issues.length > 0) {
      console.log(`❌ ${srcProj.slug}:`);
      for (const issue of issues) console.log(`   ${issue}`);
      errors += issues.length;
    } else {
      pass(`${srcProj.slug} — all fields match`);
    }
  }

  // ─── 4. Ordering check ───
  // studioProjects is in file order (global), DB sorts by per-category sortOrder.
  // Compare per-category ordering instead (which is what the frontend actually uses).
  console.log('\n--- Ordering (per-category) ---');
  const categorySlugs = [...new Set(studioProjects.map((p) => p.categorySlug))];
  for (const catSlug of categorySlugs) {
    const srcCatProjs = studioProjects
      .filter((p) => p.categorySlug === catSlug)
      .sort((a, b) => a.order - b.order)
      .map((p) => p.slug);
    const cmsCatProjs = cmsProjs
      .filter((p) => p.categorySlug === catSlug)
      .map((p) => p.slug);
    if (deepEqual(srcCatProjs, cmsCatProjs)) {
      pass(`${catSlug}: ${srcCatProjs.join(' → ')}`);
    } else {
      fail(`${catSlug} ordering mismatch`);
      console.log(`   static: ${srcCatProjs.join(' → ')}`);
      console.log(`   db:     ${cmsCatProjs.join(' → ')}`);
    }
  }

  // ─── 5. Category ordering ───
  const srcCatOrder = studioCategories.map((c) => c.slug);
  const cmsCatOrder = cmsCats.map((c) => c.slug);
  if (deepEqual(srcCatOrder, cmsCatOrder)) {
    pass('Category ordering matches');
  } else {
    fail('Category ordering mismatch');
  }

  // ─── 6. Status/type/visibility mapping summary ───
  console.log('\n--- Status Mapping Summary ---');
  const statusMap: Record<string, string[]> = {};
  for (const srcProj of studioProjects) {
    const cmsProj = cmsProjs.find((p) => p.slug === srcProj.slug);
    if (cmsProj) {
      const key = `${srcProj.status} → ${cmsProj.status}`;
      if (!statusMap[key]) statusMap[key] = [];
      statusMap[key].push(srcProj.slug);
    }
  }
  for (const [key, slugs] of Object.entries(statusMap)) {
    console.log(`  ${key}: ${slugs.length} projects`);
  }

  // ─── 7. No private/draft leaks ───
  console.log('\n--- Private/Draft Leak Check ---');
  const privateProjects = dbProjs.filter((p) => p.visibility === 'private');
  const draftProjects = dbProjs.filter((p) => p.status === 'draft');
  if (privateProjects.length === 0 && draftProjects.length === 0) {
    pass('No private or draft projects in public query results');
  } else {
    if (privateProjects.length > 0) fail(`${privateProjects.length} private projects leaked`);
    if (draftProjects.length > 0) fail(`${draftProjects.length} draft projects leaked`);
  }

  // ─── Summary ───
  console.log('\n=== Parity Test Summary ===');
  console.log(`  Errors:   ${errors}`);
  console.log(`  Warnings: ${warnings}`);
  console.log(`  Media differences: intentionally excluded (ProjectMedia not migrated)`);
  if (errors === 0) {
    console.log('✅ ALL CHECKS PASSED — 0 unexplained differences');
  } else {
    console.log(`❌ ${errors} ERRORS — review above`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('❌ Parity test failed:', e);
  process.exit(1);
});
