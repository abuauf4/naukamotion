import { studioProjects } from '../src/lib/studio-data';

for (const p of studioProjects) {
  if (!p.caseStudy.techStory) continue;
  console.log(`\n=== ${p.slug} techStory ===`);
  console.log(`intro.id: ${p.caseStudy.techStory.intro.id}`);
  console.log(`intro.en: ${p.caseStudy.techStory.intro.en}`);
  console.log(`stack: [${p.caseStudy.techStory.stack.join(', ')}]`);
  for (let i = 0; i < p.caseStudy.techStory.details.length; i++) {
    const d = p.caseStudy.techStory.details[i];
    console.log(`\ndetail[${i}].id (first 120 chars): ${d.id.substring(0, 120)}`);
    console.log(`detail[${i}].en (first 120 chars): ${d.en.substring(0, 120)}`);
  }
}
