import { writeFile } from "node:fs/promises";
import { statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS_DIR = resolve(ROOT, "scripts/assets/fonts");
const FONTS_CONF = resolve(ROOT, "scripts/assets/fonts.conf");

// Configure Fontconfig so project fonts and system weights resolve cleanly
const fontsXml = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONTS_DIR}</dir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
</fontconfig>`;

await writeFile(FONTS_CONF, fontsXml, "utf8");
process.env.FONTCONFIG_FILE = FONTS_CONF;

const sharp = (await import("sharp")).default;

const OUT = resolve(ROOT, "public/images/og-cover.jpg");
const CHARACTER = resolve(ROOT, "public/images/character/character.avif");

const OG = { width: 1200, height: 630 };
const BLUEPRINT = "#0d4f7c";

const AVATAR = {
  cx: 600,
  cy: 315,
  radius: 196,
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a smooth, slightly imperfect hand-drawn pencil/chalk circle path.
 */
function buildHandCirclePath({
  cx,
  cy,
  r,
  startAngle = -Math.PI * 0.65,
  sweep = Math.PI * 2.08,
  steps = 48,
  wobble = 3.6,
  seed = 11,
}) {
  const rand = mulberry32(seed);
  const pts = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = startAngle + t * sweep;
    const drift =
      Math.sin(angle * 2 + seed) * (wobble * 0.55) +
      Math.cos(angle * 3 - seed * 0.5) * (wobble * 0.45) +
      (rand() - 0.5) * (wobble * 0.6);
    const rad = r + drift;
    pts.push([cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad]);
  }

  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = ((pts[i][0] + pts[i + 1][0]) / 2).toFixed(1);
    const my = ((pts[i][1] + pts[i + 1][1]) / 2).toFixed(1);
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx} ${my}`;
  }
  const last = pts.at(-1);
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

/**
 * Computes character angles & SVG elements along a circular arc, returning both markup and angular span.
 */
function buildCurvedText({
  text,
  cx,
  cy,
  r,
  topArc = true,
  stepDeg = 5.4,
  fontFamily,
  fontSize,
  fontWeight = "bold",
  fill = "#ffffff",
}) {
  const chars = [...text];
  const weights = chars.map((c) => {
    if (c === " ") return 0.56;
    if ("Iil|·.".includes(c)) return 0.46;
    if ("JFTL".includes(c)) return 0.86;
    if ("AERVNSUD".includes(c)) return 0.98;
    if ("COQG".includes(c)) return 1.08;
    if ("MWmw".includes(c)) return 1.26;
    return 1.0;
  });

  const totalUnits = weights.reduce((a, b) => a + b, 0) - (weights[0] + weights.at(-1)) * 0.5;
  const totalAngle = totalUnits * stepDeg;
  const centerAngle = topArc ? -90 : 90;

  const startDeg = topArc ? centerAngle - totalAngle / 2 : centerAngle + totalAngle / 2;
  const endDeg = topArc ? centerAngle + totalAngle / 2 : centerAngle - totalAngle / 2;

  let cursorDeg = startDeg;

  const svg = chars
    .map((ch, idx) => {
      if (idx > 0) {
        const advance = ((weights[idx - 1] + weights[idx]) * 0.5) * stepDeg;
        cursorDeg += topArc ? advance : -advance;
      }
      if (ch === " ") return "";

      const rad = (cursorDeg * Math.PI) / 180;
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;
      const rot = topArc ? cursorDeg + 90 : cursorDeg - 90;
      const safe = ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch;

      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" transform="rotate(${rot.toFixed(2)} ${x.toFixed(1)} ${y.toFixed(1)})" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}">${safe}</text>`;
    })
    .join("\n    ");

  return { svg, startDeg, endDeg };
}

/**
 * Builds a curved red washi tape ribbon (with stitched ends and subtle slant)
 * matching the signature `.tape-button` aesthetic along the bottom circular text.
 */
function buildCurvedRedTape({ cx, cy, rMid, bandHalf = 21, startDeg, endDeg, padDeg = 9 }) {
  // For bottom arc, startDeg is on the left (~145°) and endDeg is on the right (~35°)
  const aLeft = startDeg + padDeg;
  const aRight = endDeg - padDeg;

  const pt = (deg, r) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + Math.cos(rad) * r, cy + Math.sin(rad) * r];
  };

  const rIn = rMid - bandHalf;
  const rOut = rMid + bandHalf;

  // Slight angled tape cut at each end
  const [lxOut, lyOut] = pt(aLeft + 0.8, rOut);
  const [rxOut, ryOut] = pt(aRight - 0.8, rOut);
  const [rxIn, ryIn] = pt(aRight + 0.6, rIn);
  const [lxIn, lyIn] = pt(aLeft - 0.6, rIn);

  const ribbonPath = [
    `M ${lxOut.toFixed(1)} ${lyOut.toFixed(1)}`,
    `A ${rOut} ${rOut} 0 0 0 ${rxOut.toFixed(1)} ${ryOut.toFixed(1)}`,
    `L ${rxIn.toFixed(1)} ${ryIn.toFixed(1)}`,
    `A ${rIn} ${rIn} 0 0 1 ${lxIn.toFixed(1)} ${lyIn.toFixed(1)}`,
    "Z",
  ].join(" ");

  // Dashed white stitch marks inside both cut ends
  const [ls1x, ls1y] = pt(aLeft - 1.2, rOut - 4);
  const [ls2x, ls2y] = pt(aLeft - 2.0, rIn + 4);
  const [rs1x, rs1y] = pt(aRight + 1.2, rOut - 4);
  const [rs2x, rs2y] = pt(aRight + 2.0, rIn + 4);

  return `
    <g filter="url(#tapeShadow)">
      <path d="${ribbonPath}" fill="#c62828"/>
      <line x1="${ls1x.toFixed(1)}" y1="${ls1y.toFixed(1)}" x2="${ls2x.toFixed(1)}" y2="${ls2y.toFixed(1)}"
            stroke="rgba(255,255,255,0.44)" stroke-dasharray="3,2.5" stroke-width="1.4"/>
      <line x1="${rs1x.toFixed(1)}" y1="${rs1y.toFixed(1)}" x2="${rs2x.toFixed(1)}" y2="${rs2y.toFixed(1)}"
            stroke="rgba(255,255,255,0.44)" stroke-dasharray="3,2.5" stroke-width="1.4"/>
    </g>`;
}

function buildBackgroundSvg() {
  // Architectural left-margin drafting ticks matching generate-banners.mjs
  const rulerTicks = [];
  for (let y = 52; y <= OG.height - 52; y += 26) {
    const major = (y - 52) % 52 === 0;
    rulerTicks.push(`<line x1="30" y1="${y}" x2="${major ? 44 : 37}" y2="${y}"/>`);
  }

  return Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${OG.width}" height="${OG.height}" viewBox="0 0 ${OG.width} ${OG.height}">
    <defs>
      <pattern id="fineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.095)" stroke-width="1"/>
      </pattern>
      <pattern id="coarseGrid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.19)" stroke-width="1.1"/>
      </pattern>
      <radialGradient id="vignette" cx="50%" cy="50%" r="74%">
        <stop offset="32%" stop-color="rgba(255,255,255,0.04)"/>
        <stop offset="100%" stop-color="rgba(4,20,36,0.34)"/>
      </radialGradient>
    </defs>

    <!-- Blueprint Base & Grid -->
    <rect width="${OG.width}" height="${OG.height}" fill="${BLUEPRINT}"/>
    <rect width="${OG.width}" height="${OG.height}" fill="url(#fineGrid)"/>
    <rect width="${OG.width}" height="${OG.height}" fill="url(#coarseGrid)"/>
    <rect width="${OG.width}" height="${OG.height}" fill="url(#vignette)"/>

    <!-- Architectural Perimeter Margin Frame (matching banners) -->
    <rect x="24" y="24" width="${OG.width - 48}" height="${OG.height - 48}" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.2"/>
    <rect x="28" y="28" width="${OG.width - 56}" height="${OG.height - 56}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="0.8"/>

    <!-- Corner Framing Crosshairs -->
    <g stroke="rgba(255,255,255,0.48)" stroke-width="1.3">
      <path d="M 18 24 L 34 24 M 24 18 L 24 34"/>
      <path d="M ${OG.width - 34} 24 L ${OG.width - 18} 24 M ${OG.width - 24} 18 L ${OG.width - 24} 34"/>
      <path d="M 18 ${OG.height - 24} L 34 ${OG.height - 24} M 24 ${OG.height - 34} L 24 ${OG.height - 18}"/>
      <path d="M ${OG.width - 34} ${OG.height - 24} L ${OG.width - 18} ${OG.height - 24} M ${OG.width - 24} ${OG.height - 34} L ${OG.width - 24} ${OG.height - 18}"/>
    </g>

    <!-- Left & Right Millimetric Ruler Markings -->
    <g opacity="0.38" stroke="#ffffff" stroke-width="1">
      <line x1="30" y1="52" x2="30" y2="${OG.height - 52}"/>
      ${rulerTicks.join("\n      ")}
    </g>

    <!-- Technical Drawing Margin Annotations -->
    <g font-family="DejaVu Sans Mono, Courier New, monospace" font-size="11" fill="rgba(255,255,255,0.48)" letter-spacing="2">
      <text x="46" y="44">// DWG: JM-2026-PORTFOLIO // CALI, COL [3.4516° N, 76.5320° W]</text>
      <text x="${OG.width - 46}" y="44" text-anchor="end">// STATUS: OPEN TO ROLES</text>
      <text x="46" y="${OG.height - 36}">// SCALE: 1:1 // FULL STACK &amp; CLOUD SYSTEMS</text>
      <text x="${OG.width - 46}" y="${OG.height - 36}" text-anchor="end">// @HEISJUANDA</text>
    </g>
  </svg>`);
}

function buildPencilCircleAndCurvedTextSvg() {
  const pass1 = buildHandCirclePath({
    cx: AVATAR.cx,
    cy: AVATAR.cy,
    r: AVATAR.radius,
    startAngle: -Math.PI * 0.72,
    sweep: Math.PI * 2.12,
    steps: 48,
    wobble: 3.6,
    seed: 14,
  });

  const pass2 = buildHandCirclePath({
    cx: AVATAR.cx + 1.5,
    cy: AVATAR.cy - 1,
    r: AVATAR.radius + 4,
    startAngle: Math.PI * 0.18,
    sweep: Math.PI * 1.92,
    steps: 48,
    wobble: 4.3,
    seed: 53,
  });

  const pass3 = buildHandCirclePath({
    cx: AVATAR.cx - 1,
    cy: AVATAR.cy + 1.5,
    r: AVATAR.radius - 3,
    startAngle: -Math.PI * 0.25,
    sweep: Math.PI * 1.35,
    steps: 32,
    wobble: 3.8,
    seed: 91,
  });

  const topText = buildCurvedText({
    text: "JUAN DAVID MORENO",
    cx: AVATAR.cx,
    cy: AVATAR.cy,
    r: AVATAR.radius + 35,
    topArc: true,
    stepDeg: 6.4,
    fontFamily: "Lato Black, Lato Heavy, Lato, DejaVu Sans, sans-serif",
    fontSize: 36,
    fontWeight: "900",
    fill: "#ffffff",
  });

  const bottomRadius = AVATAR.radius + 37;
  const bottomText = buildCurvedText({
    text: "SOFTWARE ENGINEER · JUANDAMORENO.DEV",
    cx: AVATAR.cx,
    cy: AVATAR.cy,
    r: bottomRadius,
    topArc: false,
    stepDeg: 4.15,
    fontFamily: "Lato, DejaVu Sans, sans-serif",
    fontSize: 21.5,
    fontWeight: "bold",
    fill: "#ffffff",
  });

  const redTape = buildCurvedRedTape({
    cx: AVATAR.cx,
    cy: AVATAR.cy,
    rMid: bottomRadius,
    bandHalf: 20,
    startDeg: bottomText.startDeg,
    endDeg: bottomText.endDeg,
    padDeg: 8.5,
  });

  return Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${OG.width}" height="${OG.height}" viewBox="0 0 ${OG.width} ${OG.height}">
    <defs>
      <filter id="pencilRough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="9" result="grain"/>
        <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="tapeShadow" x="-15%" y="-15%" width="130%" height="140%">
        <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="rgba(4, 18, 32, 0.45)"/>
      </filter>
    </defs>

    <!-- Very soft highlight inside sketch circle -->
    <circle cx="${AVATAR.cx}" cy="${AVATAR.cy}" r="${AVATAR.radius - 2}" fill="rgba(255, 255, 255, 0.045)"/>

    <!-- Hand-drawn pencil strokes -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#pencilRough)">
      <path d="${pass1}" stroke="rgba(245, 240, 232, 0.88)" stroke-width="3.4"/>
      <path d="${pass2}" stroke="rgba(186, 230, 253, 0.56)" stroke-width="2.1"/>
      <path d="${pass3}" stroke="rgba(245, 240, 232, 0.36)" stroke-width="1.6" stroke-dasharray="16 7 4 7"/>
    </g>

    <!-- Subtle blueprint crosshairs flanking left & right of the seal -->
    <g stroke="rgba(186, 230, 253, 0.45)" stroke-width="1.4">
      <path d="M ${AVATAR.cx - AVATAR.radius - 42} ${AVATAR.cy} h 14 M ${AVATAR.cx - AVATAR.radius - 35} ${AVATAR.cy - 7} v 14"/>
      <path d="M ${AVATAR.cx + AVATAR.radius + 28} ${AVATAR.cy} h 14 M ${AVATAR.cx + AVATAR.radius + 35} ${AVATAR.cy - 7} v 14"/>
    </g>

    <!-- Curved Red Tape behind bottom text -->
    ${redTape}

    <!-- Curved Circular Texts -->
    ${topText.svg}
    ${bottomText.svg}
  </svg>`);
}

/**
 * Extracts and centers the high-res collage head inside the pencil circle.
 */
async function buildHeadInsideCircle() {
  const size = AVATAR.radius * 2;
  const targetFaceSize = Math.round(size * 0.96);

  const head = await sharp(CHARACTER)
    .extract({ left: 166, top: 64, width: 650, height: 650 })
    .resize(targetFaceSize, targetFaceSize, { fit: "cover" })
    .png()
    .toBuffer();

  const innerR = AVATAR.radius - 7;
  const clipMask = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${AVATAR.radius}" cy="${AVATAR.radius}" r="${innerR}" fill="#ffffff"/>
    </svg>`);

  const offset = Math.round((size - targetFaceSize) / 2);

  const canvas = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: head, left: offset + 6, top: offset + 6 }])
    .png()
    .toBuffer();

  return {
    buffer: await sharp(canvas)
      .composite([{ input: clipMask, blend: "dest-in" }])
      .png()
      .toBuffer(),
    left: Math.round(AVATAR.cx - AVATAR.radius),
    top: Math.round(AVATAR.cy - AVATAR.radius),
  };
}

async function main() {
  const outIdx = process.argv.indexOf("--out");
  const out = outIdx > -1 ? resolve(process.argv[outIdx + 1]) : OUT;

  const base = await sharp(buildBackgroundSvg()).png().toBuffer();
  const headLayer = await buildHeadInsideCircle();

  await sharp(base)
    .composite([
      { input: buildPencilCircleAndCurvedTextSvg(), left: 0, top: 0 },
      { input: headLayer.buffer, left: headLayer.left, top: headLayer.top },
    ])
    .jpeg({ quality: 90, progressive: true, chromaSubsampling: "4:4:4" })
    .toFile(out);

  const { size } = statSync(out);
  console.log(`${out}  ${OG.width}x${OG.height}  ${(size / 1024).toFixed(0)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
