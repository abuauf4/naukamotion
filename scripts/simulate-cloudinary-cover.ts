// Step 6 — Render proof: simulate a Cloudinary URL through the adapter
// without touching the database. This proves that IF a ProjectMedia row
// with a Cloudinary URL existed, the adapter would return it correctly.
//
// Usage: npx tsx scripts/simulate-cloudinary-cover.ts

import { prisma } from '../src/lib/cms/db';
import { adaptProject } from '../src/lib/cms/adapter';
import { fetchPublicProjectBySlug } from '../src/lib/cms/repository';

async function main() {
  const targetSlug = process.argv[2] || 'geely-bsd';

  // 1. Fetch real project from Neon
  const dbProject = await fetchPublicProjectBySlug(targetSlug);
  if (!dbProject) {
    console.error(`Project not found: ${targetSlug}`);
    process.exit(1);
  }

  console.log(`\n=== BEFORE (real state, no ProjectMedia) ===`);
  const before = adaptProject(dbProject);
  console.log(`  adapted.cover: ${before.cover}`);
  console.log(`  is Cloudinary: ${before.cover.includes('res.cloudinary.com')}`);

  // 2. Simulate: append a fake ProjectMedia row with Cloudinary URL
  const simulatedCloudinaryUrl = `https://res.cloudinary.com/test-cloud/image/upload/v12345/nauka-motion/projects/${targetSlug}/cover/current.png`;
  const simulatedDbProject = {
    ...dbProject,
    media: [
      ...(dbProject.media || []),
      {
        id: 'simulated-cover-row',
        projectSlug: targetSlug,
        sectionId: null,
        type: 'cover' as const,
        url: simulatedCloudinaryUrl,
        publicId: `nauka-motion/projects/${targetSlug}/cover/current`,
        width: 1600,
        height: 900,
        format: 'png',
        bytes: 450000,
        alt: null,
        caption: null,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  console.log(`\n=== AFTER SIMULATION (fake ProjectMedia cover row injected) ===`);
  const after = adaptProject(simulatedDbProject);
  console.log(`  adapted.cover: ${after.cover}`);
  console.log(`  is Cloudinary: ${after.cover.includes('res.cloudinary.com')}`);
  console.log(`  matches simulated URL: ${after.cover === simulatedCloudinaryUrl}`);

  if (after.cover === simulatedCloudinaryUrl) {
    console.log(`\n✅ PROVEN: If a ProjectMedia(type=cover) row existed in Neon with a Cloudinary URL,`);
    console.log(`   the adapter would correctly return that URL as project.cover.`);
    console.log(`   The read path is correct. The bug is upstream: no ProjectMedia row exists.`);
  } else {
    console.log(`\n❌ FAIL: Adapter did NOT return the simulated Cloudinary URL.`);
    console.log(`   This would indicate a real adapter bug.`);
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
