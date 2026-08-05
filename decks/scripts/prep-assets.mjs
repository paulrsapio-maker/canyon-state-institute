// Rasterize CSI brand assets for the PowerPoint deck.
// PowerPoint handles PNG/JPEG reliably everywhere; SVG + WebP support varies by version.
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const __dir = dirname(fileURLToPath(import.meta.url));
const DECK = resolve(__dir, "..");        // canyon-state-institute/decks
const SITE = resolve(__dir, "..", "..");  // canyon-state-institute



const OUT = resolve(DECK, "assets");
await mkdir(OUT, { recursive: true });

// --- Logos (transparent PNG, high res so they stay crisp when projected) ---
const emblem = await readFile(`${SITE}/public/csi-logo-icon.svg`);
await sharp(emblem, { density: 600 }).resize(1000, 1000).png().toFile(`${OUT}/emblem.png`);

const horiz = await readFile(`${SITE}/public/csi-logo-horizontal.svg`);
await sharp(horiz, { density: 600 }).resize({ width: 2400 }).png().toFile(`${OUT}/logo-horizontal.png`);

// Reversed lockup ships with a dark preview rect baked in — strip it so it composites
// onto our own ink-brown background cleanly.
const rev = (await readFile(`${SITE}/public/csi-logo-reversed.svg`, "utf8")).replace(
  /<rect width="860" height="200" fill="#2B1A10"\/>\s*/,
  ""
);
await sharp(Buffer.from(rev), { density: 600 })
  .resize({ width: 2400 })
  .png()
  .toFile(`${OUT}/logo-reversed.png`);

// --- Photography: WebP -> JPEG for universal PowerPoint compatibility ---
// Only the images the deck actually places. hero-canyon is used directly on the
// closing slide and is also the source bake-hero.mjs scrims for slide 1.
const photos = {
  "hero-canyon": { w: 2400 },
  "high-school-hero": { w: 1800 },
  "veteran-band": { w: 2400 },
  "section-landscape": { w: 2400 },
};
for (const [name, { w }] of Object.entries(photos)) {
  const info = await sharp(`${SITE}/images/${name}.webp`)
    .resize({ width: w })
    .jpeg({ quality: 86 })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`${name}.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

for (const f of ["emblem.png", "logo-horizontal.png", "logo-reversed.png"]) {
  const m = await sharp(`${OUT}/${f}`).metadata();
  console.log(`${f}  ${m.width}x${m.height}`);
}
