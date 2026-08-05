// Bake a smooth left-to-right ink scrim into the title-slide hero.
// PowerPoint can't do gradient fills via pptxgenjs, and stacking two flat
// translucent rects leaves a visible vertical seam — so composite it here.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const __dir = dirname(fileURLToPath(import.meta.url));
const DECK = resolve(__dir, "..");        // canyon-state-institute/decks
const SITE = resolve(__dir, "..", "..");  // canyon-state-institute


const A = resolve(DECK, "assets");
const W = 2400;
const H = 1350; // 16:9 to match the 13.333 x 7.5 slide

const scrim = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"    stop-color="#3B2314" stop-opacity="0.92"/>
      <stop offset="0.42" stop-color="#3B2314" stop-opacity="0.80"/>
      <stop offset="0.72" stop-color="#3B2314" stop-opacity="0.50"/>
      <stop offset="1"    stop-color="#3B2314" stop-opacity="0.28"/>
    </linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0"   stop-color="#3B2314" stop-opacity="0.34"/>
      <stop offset="0.5" stop-color="#3B2314" stop-opacity="0.10"/>
      <stop offset="1"   stop-color="#3B2314" stop-opacity="0.40"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#h)"/>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
</svg>`);

const out = await sharp(`${A}/hero-canyon.jpg`)
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([{ input: scrim }])
  .jpeg({ quality: 88 })
  .toFile(`${A}/hero-title.jpg`);
console.log(`hero-title.jpg ${out.width}x${out.height} ${(out.size / 1024).toFixed(0)}KB`);
