import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Run from the repository root after changing an original showcase asset.
const output = "public/optimized";
await fs.mkdir(output, { recursive: true });
const sources = ["/logo-navbar-transparent.png"];
for (const folder of ["showcase", "portfolio"]) {
  for (const filename of await fs.readdir(`public/${folder}`)) {
    if (/\.(webp|png|jpe?g)$/i.test(filename)) sources.push(`/${folder}/${filename}`);
  }
}
const variants = {};
for (const src of sources) {
  const input = `public${src}`;
  const metadata = await sharp(input).metadata();
  const widths = [...new Set([320, 640, 960, 1280].map((width) => Math.min(width, metadata.width)))];
  const stem = src.slice(1).replace(/\.[^.]+$/, "").replaceAll("/", "-");
  variants[src] = [];
  for (const width of widths) {
    const filename = `${stem}-${width}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(path.join(output, filename));
    variants[src].push({ width, src: `/optimized/${filename}` });
  }
}
await fs.writeFile("src/lib/image-variants.json", JSON.stringify(variants, null, 2) + "\n");
console.log(`Generated responsive variants for ${sources.length} images.`);
