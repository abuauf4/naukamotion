// End-to-end trace: ProjectMedia cover rendering for one project.
// Usage: npx tsx scripts/trace-cover.ts [projectSlug]
// Defaults to geely-bsd if no slug provided.

import { prisma } from '../src/lib/cms/db';
import { adaptProject } from '../src/lib/cms/adapter';
import { fetchPublicProjectBySlug, fetchPublicProjects, fetchPublicProjectsByCategory } from '../src/lib/cms/repository';

async function main() {
  const targetSlug = process.argv[2] || 'geely-bsd';
  console.log(`\n=== STEP 1: Raw Neon record for "${targetSlug}" ===\n`);

  const project = await prisma.project.findUnique({
    where: { slug: targetSlug },
    select: {
      slug: true,
      name: true,
      categorySlug: true,
      cover: true,            // transitional field
      visibility: true,
      status: true,
      media: {
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          type: true,
          url: true,
          publicId: true,
          width: true,
          height: true,
          format: true,
          bytes: true,
          sortOrder: true,
          createdAt: true,
        },
      },
    },
  });

  if (!project) {
    console.error(`Project not found: ${targetSlug}`);
    process.exit(1);
  }

  console.log(`project.slug          : ${project.slug}`);
  console.log(`project.name          : ${project.name}`);
  console.log(`project.categorySlug  : ${project.categorySlug}`);
  console.log(`project.visibility    : ${project.visibility}`);
  console.log(`project.status        : ${project.status}`);
  console.log(`project.cover         : ${project.cover}  (transitional fallback)`);
  console.log(`project.media count  : ${project.media.length}`);

  const coverMedia = project.media.filter((m) => m.type === 'cover');
  console.log(`ProjectMedia type=cover count: ${coverMedia.length}`);

  if (coverMedia.length > 0) {
    for (const m of coverMedia) {
      console.log(`  -- cover media row --`);
      console.log(`     id        : ${m.id}`);
      console.log(`     type      : ${m.type}`);
      try {
        const u = new URL(m.url);
        console.log(`     url host  : ${u.host}`);
        console.log(`     url path  : ${u.pathname}`);
      } catch {
        console.log(`     url       : ${m.url} (not a URL)`);
      }
      console.log(`     publicId  : ${m.publicId}`);
      console.log(`     sortOrder : ${m.sortOrder}`);
      console.log(`     dims      : ${m.width}x${m.height} ${m.format} ${m.bytes ? Math.round(m.bytes / 1024) + 'KB' : 'null'}`);
      console.log(`     createdAt : ${m.createdAt.toISOString()}`);
    }
  }

  if (coverMedia.length === 0) {
    console.log(`\n!! No ProjectMedia(type=cover) row exists for ${targetSlug}.`);
    console.log(`   The frontend is correctly rendering the transitional Project.cover fallback.`);
    console.log(`   Pick a different slug that HAS an uploaded cover, OR upload one via admin first.`);
  }
  if (coverMedia.length > 1) {
    console.log(`\n!! WARNING: Multiple cover rows exist — adapter will pick first by sortOrder.`);
  }

  // ─────────────────────────────────────────────────────────────
  console.log(`\n=== STEP 2: Repository output (fetchPublicProjectBySlug) ===\n`);

  const repoProject = await fetchPublicProjectBySlug(targetSlug);
  if (!repoProject) {
    console.log(`fetchPublicProjectBySlug returned NULL — visibility or status filtered it out.`);
    console.log(`   project.visibility = ${project.visibility}`);
    console.log(`   project.status     = ${project.status}`);
    console.log(`   Repository filter requires visibility='public' AND status != 'draft'`);
  } else {
    console.log(`repoProject.slug        : ${repoProject.slug}`);
    console.log(`repoProject.cover       : ${repoProject.cover}  (transitional field still on row)`);
    console.log(`repoProject.media count : ${repoProject.media.length}`);
    console.log(`  -- media items returned by repository --`);
    for (const m of repoProject.media) {
      console.log(`   [${m.type}] sortOrder=${m.sortOrder}  url=${m.url}`);
    }
    const repoCover = repoProject.media.find((m) => m.type === 'cover');
    console.log(`\nrepoProject.media.find(type=cover) -> ${repoCover ? repoCover.url : 'NOT FOUND'}`);
  }

  // ─────────────────────────────────────────────────────────────
  console.log(`\n=== STEP 3: Adapter output (adaptProject) ===\n`);

  if (repoProject) {
    const adapted = adaptProject(repoProject);
    console.log(`adapted.slug    : ${adapted.slug}`);
    console.log(`adapted.cover   : ${adapted.cover}`);
    console.log(`                 ^ This is what the frontend receives as project.cover\n`);

    const isCloudinary = adapted.cover.includes('res.cloudinary.com');
    const isOldPath = adapted.cover.startsWith('/portfolio/');
    console.log(`cover is Cloudinary URL? : ${isCloudinary}`);
    console.log(`cover is old /portfolio/?: ${isOldPath}`);

    if (isCloudinary && coverMedia.length > 0) {
      console.log(`\n✅ PASS: Adapter correctly resolved Cloudinary URL for ${targetSlug}.`);
    } else if (isOldPath && coverMedia.length === 0) {
      console.log(`\n✅ PASS: Adapter correctly fell back to transitional Project.cover (no ProjectMedia exists).`);
    } else {
      console.log(`\n❌ FAIL: Adapter returned unexpected cover. Investigate.`);
    }
  }

  // ─────────────────────────────────────────────────────────────
  console.log(`\n=== STEP 4: Batch fetch (fetchPublicProjects + fetchPublicProjectsByCategory) ===\n`);

  const allProjects = await fetchPublicProjects();
  const geelyInAll = allProjects.find((p) => p.slug === targetSlug);
  console.log(`fetchPublicProjects: ${allProjects.length} projects, ${targetSlug} ${geelyInAll ? 'FOUND' : 'NOT FOUND'}`);
  if (geelyInAll) {
    console.log(`  media count: ${geelyInAll.media.length}`);
    const cover = geelyInAll.media.find((m) => m.type === 'cover');
    console.log(`  cover media: ${cover ? cover.url : 'NONE'}`);
    const adapted = adaptProject(geelyInAll);
    console.log(`  adapted.cover: ${adapted.cover}`);
  }

  const categoryProjects = await fetchPublicProjectsByCategory(project.categorySlug);
  const geelyInCat = categoryProjects.find((p) => p.slug === targetSlug);
  console.log(`\nfetchPublicProjectsByCategory('${project.categorySlug}'): ${categoryProjects.length} projects, ${targetSlug} ${geelyInCat ? 'FOUND' : 'NOT FOUND'}`);
  if (geelyInCat) {
    console.log(`  media count: ${geelyInCat.media.length}`);
    const cover = geelyInCat.media.find((m) => m.type === 'cover');
    console.log(`  cover media: ${cover ? cover.url : 'NONE'}`);
    const adapted = adaptProject(geelyInCat);
    console.log(`  adapted.cover: ${adapted.cover}`);
  }

  // ─────────────────────────────────────────────────────────────
  console.log(`\n=== STEP 5: Fallback test (project WITHOUT ProjectMedia) ===\n`);

  const projectsWithoutMedia = await prisma.project.findMany({
    where: {
      visibility: 'public',
      status: { not: 'draft' },
      media: { none: { type: 'cover' } },
    },
    select: { slug: true, cover: true },
    take: 1,
  });

  if (projectsWithoutMedia.length > 0) {
    const fb = projectsWithoutMedia[0];
    console.log(`Project without ProjectMedia cover: ${fb.slug}`);
    console.log(`  Project.cover (transitional): ${fb.cover}`);
    const fbProject = await fetchPublicProjectBySlug(fb.slug);
    if (fbProject) {
      const fbAdapted = adaptProject(fbProject);
      console.log(`  adapted.cover: ${fbAdapted.cover}`);
      const matchesFallback = fbAdapted.cover === fb.cover;
      console.log(`  ${matchesFallback ? '✅ PASS' : '❌ FAIL'}: fallback path ${matchesFallback ? 'correctly' : 'incorrectly'} returned transitional cover.`);
    }
  } else {
    console.log(`All projects have ProjectMedia covers — cannot test fallback path.`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
