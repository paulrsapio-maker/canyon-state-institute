// Converts the Nano Banana source PNGs into web-ready WebP (and the OG card).
// Usage: node scripts/optimize-images.mjs <source-dir>
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = process.argv[2];
if (!SRC) {
  console.error("Usage: node scripts/optimize-images.mjs <source-dir>");
  process.exit(1);
}
const OUT = path.join(process.cwd(), "images");
await mkdir(OUT, { recursive: true });

const jobs = [
  { file: "hero-canyon.png", width: 2560, quality: 72 },
  { file: "section-landscape.png", width: 2560, quality: 72 },
  { file: "program-student-success.png", width: 1600, quality: 78 },
  { file: "program-professional.png", width: 1600, quality: 78 },
  { file: "program-graduate.png", width: 1600, quality: 78 },
  { file: "program-enterprise.png", width: 1600, quality: 78 },
  { file: "program-free.png", width: 1600, quality: 78 },
  { file: "about-who.png", width: 1600, quality: 78 },
  { file: "about-commitment.png", width: 1600, quality: 78 },
  { file: "admissions-advisor.png", width: 1600, quality: 78 },
];

for (const { file, width, quality } of jobs) {
  const out = path.join(OUT, file.replace(/\.png$/, ".webp"));
  const info = await sharp(path.join(SRC, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out);
  console.log(`${path.basename(out)} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}

// OG card from the hero (1200x630 center crop)
const og = await sharp(path.join(SRC, "hero-canyon.png"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 80 })
  .toFile(path.join(process.cwd(), "public", "og.jpg"));
console.log(`og.jpg 1200x630 ${(og.size / 1024).toFixed(0)}KB`);
