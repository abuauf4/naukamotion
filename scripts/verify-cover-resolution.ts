// End-to-end adapter verification:
// 1. Print all projects and their resolved cover URL
// 2. Confirm projects WITH ProjectMedia cover return Cloudinary URL
// 3. Confirm projects WITHOUT ProjectMedia cover fall back to Project.cover
//
// Run: npx tsx scripts/verify-cover-resolution.ts

import { prisma } from '../src/lib/cms/db';
import { adaptProject } from '../src/lib/cms/adapter';

async function main() {
  const projects = await prisma.project.findMany({
    where: { visibility: 'public', status: { not: 'draft' } },
    orderBy: { sortOrder: 'asc' },
    include: {
      category: true,
      sections: { orderBy: { sortOrder: 'asc' } },
      technologies: { orderBy: { sortOrder: 'asc' } },
      media: { orderBy: { sortOrder: 'asc' } },
    },
  });

  console.log(`Total public projects: ${projects.length}\n`);
  console.log('Resolved cover URLs:');
  console.log('─'.repeat(100));

  let withMedia = 0;
  let withFallback = 0;

  for (const dbProject of projects) {
    const adapted = adaptProject(dbProject);
    const hasMediaCover = !!dbProject.media.find((m) => m.type === 'cover');
    const source = hasMediaCover ? 'Cloudinary (ProjectMedia)' : 'fallback (Project.cover)';
    if (hasMediaCover) withMedia++; else withFallback++;

    console.log(`  ${adapted.slug.padEnd(35).slice(0, 35)}  ${source.padEnd(30)}  ${adapted.cover}`);
  }

  console.log('─'.repeat(100));
  console.log(`\nSummary:`);
  console.log(`  Projects with ProjectMedia cover (Cloudinary): ${withMedia}`);
  console.log(`  Projects falling back to Project.cover:        ${withFallback}`);
  console.log(`  Total:                                         ${projects.length}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
