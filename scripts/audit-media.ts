// One-off audit script: list ProjectMedia rows + project covers
import { prisma } from '../src/lib/cms/db';

async function main() {
  const media = await prisma.projectMedia.findMany({
    orderBy: [{ projectSlug: 'asc' }, { type: 'asc' }, { sortOrder: 'asc' }],
    select: {
      id: true,
      projectSlug: true,
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
  });
  console.log(`Total ProjectMedia rows: ${media.length}\n`);
  for (const m of media) {
    console.log(`  [${m.type}] ${m.projectSlug} (sortOrder=${m.sortOrder})`);
    console.log(`    url: ${m.url}`);
    console.log(`    publicId: ${m.publicId}`);
    console.log(`    dims: ${m.width}x${m.height} ${m.format} ${m.bytes ? Math.round(m.bytes / 1024) + 'KB' : 'null'}`);
    console.log(`    createdAt: ${m.createdAt.toISOString()}`);
    console.log('');
  }
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
