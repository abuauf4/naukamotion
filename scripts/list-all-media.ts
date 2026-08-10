// List every ProjectMedia row in Neon.
import { prisma } from '../src/lib/cms/db';

async function main() {
  const allMedia = await prisma.projectMedia.findMany({
    orderBy: [{ projectSlug: 'asc' }, { type: 'asc' }, { sortOrder: 'asc' }],
  });
  console.log(`Total ProjectMedia rows in Neon: ${allMedia.length}\n`);
  if (allMedia.length > 0) {
    for (const m of allMedia) {
      console.log(`[${m.type}] ${m.projectSlug}  url=${m.url}  publicId=${m.publicId}  sortOrder=${m.sortOrder}`);
    }
  } else {
    console.log('No ProjectMedia rows exist. Upload was either never persisted or was deleted.');
  }
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
