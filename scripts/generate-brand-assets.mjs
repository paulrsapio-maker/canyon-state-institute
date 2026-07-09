// Generates share/SEO assets from the brand SVGs:
//   app/apple-icon.png (180), public/icon-192.png, public/icon-512.png,
//   public/og.jpg (branded 1200x630 share card: canyon + scrim + reversed lockup)
// Usage: node scripts/generate-brand-assets.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const iconSvg = await readFile("public/csi-logo-icon.svg");

for (const { size, out } of [
  { size: 180, out: "app/apple-icon.png" },
  { size: 192, out: "public/icon-192.png" },
  { size: 512, out: "public/icon-512.png" },
]) {
  await sharp(iconSvg, { density: 300 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log(`${out} ${size}x${size}`);
}

// --- Branded OG card ---
// Reversed lockup (strip its preview background rect), rendered wide and sharp.
const lockupSvg = (await readFile("public/csi-logo-reversed.svg", "utf8")).replace(
  /<rect width="860" height="200" fill="#2B1A10"\/>\n?/,
  ""
);
const lockupPng = await sharp(Buffer.from(lockupSvg), { density: 300 })
  .resize({ width: 840 })
  .png()
  .toBuffer();
const lockupMeta = await sharp(lockupPng).metadata();

// Ink scrim, heavier at the bottom, so the lockup reads on any crop.
const scrim = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3B2314" stop-opacity="0.38"/>
        <stop offset="1" stop-color="#3B2314" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
  </svg>`
);

const og = await sharp("images/hero-canyon.webp")
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .composite([
    { input: scrim },
    {
      input: lockupPng,
      left: Math.round((1200 - (lockupMeta.width ?? 840)) / 2),
      top: Math.round((630 - (lockupMeta.height ?? 195)) / 2),
    },
  ])
  .jpeg({ quality: 84 })
  .toFile("public/og.jpg");
console.log(`public/og.jpg 1200x630 ${(og.size / 1024).toFixed(0)}KB`);
