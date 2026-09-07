/**
 * Builds the 1200x630 Open Graph cards from each project's hand-drawn artwork.
 *
 * Why: social crawlers (LinkedIn, X, Facebook, WhatsApp, Slack) do not decode
 * AVIF, so sharing a project page produced no preview image at all. The site
 * keeps using the original .avif files for display — these JPEGs exist only to
 * be referenced by og:image / twitter:image.
 *
 * The artwork is mounted at native-ish size on a blueprint sheet rather than
 * upscaled to fill the frame: the sources are only ~400px on the short side,
 * and social previews render around 500px wide anyway.
 *
 * Run: node scripts/make-og-images.mjs
 */
import { mkdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { PROJECTS_DATA } from "../src/views/data/projects.data.js";

const OUT_DIR = "public/images/og";
const PUBLIC_DIR = "public";

const W = 1200;
const H = 630;
const ART_BOX = 540;
const FRAME = 12;

const BLUEPRINT = "#0d4f7c";
const GRID = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="fine" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M20 0 L0 0 0 20" fill="none"
            stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    </pattern>
    <pattern id="coarse" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M100 0 L0 0 0 100" fill="none"
            stroke="rgba(255,255,255,0.30)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#fine)"/>
  <rect width="100%" height="100%" fill="url(#coarse)"/>
</svg>`);

await mkdir(OUT_DIR, { recursive: true });

const results = [];

for (const project of PROJECTS_DATA) {
  const source = project.blueprintSrc ?? project.realSrc;
  const src = path.join(PUBLIC_DIR, source);
  const out = path.join(OUT_DIR, `${project.id}.jpg`);

  const meta = await sharp(src).metadata();

  const art = await sharp(src)
    .resize(ART_BOX, ART_BOX, { fit: "inside", withoutEnlargement: false })
    .extend({
      top: FRAME,
      bottom: FRAME,
      left: FRAME,
      right: FRAME,
      background: "#ffffff",
    })
    .toBuffer();

  await sharp({
    create: { width: W, height: H, channels: 3, background: BLUEPRINT },
  })
    .composite([
      { input: GRID, top: 0, left: 0 },
      { input: art, gravity: "centre" },
    ])
    .jpeg({ quality: 84, progressive: true, chromaSubsampling: "4:4:4" })
    .toFile(out);

  const outMeta = await sharp(out).metadata();
  results.push({
    id: project.id,
    from: `${meta.width}x${meta.height} ${meta.format}`,
    to: `${outMeta.width}x${outMeta.height} ${outMeta.format}`,
    kb: (statSync(out).size / 1024).toFixed(0),
  });
}

for (const r of results) {
  console.log(
    `  ${r.id.padEnd(18)} ${r.from.padEnd(16)} ->  ${r.to.padEnd(16)} ${r.kb}KB`,
  );
}
console.log(`\n  ${results.length} cards written to ${OUT_DIR}/`);
