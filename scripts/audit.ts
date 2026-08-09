import {
  studioCategories,
  studioProjects,
  studioStats,
} from '../src/lib/studio-data';

console.log('=== CATEGORIES ===');
console.log('Count:', studioCategories.length);
for (const c of studioCategories) {
  console.log(`  ${c.slug} | index=${c.index} | title=${c.title} | accent=${c.accent}`);
}

console.log('\n=== PROJECTS ===');
console.log('Count:', studioProjects.length);
for (const p of studioProjects) {
  console.log(`\n--- ${p.slug} ---`);
  console.log(`  index=${p.index} | name=${p.name} | cat=${p.categorySlug}`);
  console.log(`  year=${p.year} | client=${p.client} | industry=${p.industry}`);
  console.log(`  cover=${p.cover} | accent=${p.accent} | liveUrl=${p.liveUrl ?? 'null'}`);
  console.log(`  status=${p.status} | order=${p.order}`);
  console.log(`  techStack=[${p.techStack.join(', ')}]`);
  console.log(`  role.id=${p.role.id} | role.en=${p.role.en}`);
  console.log(`  sections=${p.caseStudy.sections.length} | techStory=${p.caseStudy.techStory ? 'YES' : 'NO'}`);
  console.log(`  nextProjectSlug=${p.caseStudy.nextProjectSlug ?? 'null'}`);
  if (p.caseStudy.techStory) {
    console.log(`  techStory.stack=[${p.caseStudy.techStory.stack.join(', ')}]`);
    console.log(`  techStory.details=${p.caseStudy.techStory.details.length}`);
  }
  for (let i = 0; i < p.caseStudy.sections.length; i++) {
    const s = p.caseStudy.sections[i];
    console.log(`  section[${i}]: "${s.heading.id}" | body=${s.body.length} | bullets=${s.bullets?.length ?? 0}`);
  }
}
