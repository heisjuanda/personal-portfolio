import { mkdir, writeFile } from "node:fs/promises";
import { statSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS_DIR = resolve(ROOT, "scripts/assets/fonts");
const FONTS_CONF = resolve(ROOT, "scripts/assets/fonts.conf");

// Configure Fontconfig to load project fonts (Poland canned into Kaito & Sharpie)
const fontsXml = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONTS_DIR}</dir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
</fontconfig>`;

await writeFile(FONTS_CONF, fontsXml, "utf8");
process.env.FONTCONFIG_FILE = FONTS_CONF;

// Dynamically import sharp after configuring FONTCONFIG_FILE
const sharp = (await import("sharp")).default;

const OUT_DIR = resolve(ROOT, "public/images/banners");
await mkdir(OUT_DIR, { recursive: true });

// Assets
const ASSETS = {
  juandas: resolve(ROOT, "public/images/title/juanda's.avif"),
  character: resolve(ROOT, "public/images/character/front.avif"),
  pin: resolve(ROOT, "public/images/pin.avif"),
  plane: resolve(ROOT, "public/images/paperPlane/paper-plane.avif"),
};

// Helper: Procedural organic torn paper boundary generator
function generateTornRectPath(x, y, w, h, roughness = 4, step = 5, seedVal = 42) {
  const points = [];
  let seed = seedVal;
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) * 2 - 1;
  }

  // Top edge
  for (let px = x; px <= x + w; px += step) {
    points.push([px, y + rnd() * roughness]);
  }
  // Right edge
  for (let py = y; py <= y + h; py += step) {
    points.push([x + w + rnd() * roughness, py]);
  }
  // Bottom edge
  for (let px = x + w; px >= x; px -= step) {
    points.push([px, y + h + rnd() * roughness]);
  }
  // Left edge
  for (let py = y + h; py >= y; py -= step) {
    points.push([x + rnd() * roughness, py]);
  }

  return "M " + points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L ") + " Z";
}

/**
 * Builds the Master 1584x396 Banner SVG Layer
 */
function buildBannerSvg() {
  const W = 1584;
  const H = 396;

  const paperX = 350;
  const paperY = 36;
  const paperW = 830;
  const paperH = 324;

  const outerTornPath = generateTornRectPath(paperX, paperY, paperW, paperH, 6, 6, 123);
  const innerTornPath = generateTornRectPath(paperX + 5, paperY + 5, paperW - 10, paperH - 10, 4, 5, 876);

  return `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Blueprint Fine Grid -->
      <pattern id="fine" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="1"/>
      </pattern>
      <!-- Blueprint Coarse Grid -->
      <pattern id="coarse" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
      </pattern>
      <!-- Subtle Paper Grid -->
      <pattern id="paper-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(70, 52, 35, 0.05)" stroke-width="1"/>
      </pattern>
      <!-- Shadows -->
      <filter id="shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="8" dy="16" stdDeviation="14" flood-color="rgba(3, 16, 28, 0.55)"/>
        <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="rgba(0, 0, 0, 0.25)"/>
      </filter>
      <filter id="tape-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="3" stdDeviation="3" flood-color="rgba(0, 0, 0, 0.3)"/>
      </filter>
    </defs>

    <!-- Cutting Mat Base -->
    <rect width="100%" height="100%" fill="url(#fine)"/>
    <rect width="100%" height="100%" fill="url(#coarse)"/>

    <!-- Coffee Ring Stain on Cutting Mat -->
    <circle cx="1160" cy="320" r="48" fill="none" stroke="rgba(45, 25, 10, 0.16)" stroke-width="6"/>
    <circle cx="1161" cy="319" r="44" fill="none" stroke="rgba(45, 25, 10, 0.10)" stroke-width="2"/>

    <!-- Technical Annotations -->
    <text x="32" y="26" font-family="Courier New, monospace" font-size="11" fill="rgba(255,255,255,0.4)" letter-spacing="2">// DWG: JM-BANNER-2026 // CALI, COL [3.4516° N, 76.5320° W]</text>
    <text x="1240" y="26" font-family="Courier New, monospace" font-size="11" fill="rgba(255,255,255,0.4)" letter-spacing="2">// STATUS: OPEN TO ROLES</text>

    <!-- Left Ruler markings -->
    <g opacity="0.35" stroke="white" stroke-width="1">
      <line x1="30" y1="60" x2="30" y2="340"/>
      <line x1="30" y1="60" x2="45" y2="60"/>
      <line x1="30" y1="100" x2="40" y2="100"/>
      <line x1="30" y1="140" x2="45" y2="140"/>
      <line x1="30" y1="180" x2="40" y2="180"/>
      <line x1="30" y1="220" x2="45" y2="220"/>
      <line x1="30" y1="260" x2="40" y2="260"/>
      <line x1="30" y1="300" x2="45" y2="300"/>
      <line x1="30" y1="340" x2="45" y2="340"/>
    </g>

    <!-- Wire Paper Clips -->
    <g transform="translate(1080, 20) rotate(15)" opacity="0.5" stroke="white" stroke-width="2" fill="none">
      <path d="M 0 0 L 0 35 A 8 8 0 0 0 16 35 L 16 8 A 6 6 0 0 0 4 8 L 4 30"/>
    </g>

    <!-- Left Pinned Note (Avatar Safe Zone) -->
    <g transform="translate(56, 75) rotate(-5)">
      <polygon points="0,0 164,4 160,72 4,68" fill="#dfd4c0" filter="url(#shadow)"/>
      <text x="14" y="24" font-family="Courier New, monospace" font-size="10" font-weight="bold" fill="#7a6c58" letter-spacing="1">[ REPOSITORY ]</text>
      <text x="14" y="52" font-family="Sharpie" font-size="22" fill="#2c221a">@heisjuanda</text>
      <polygon points="40,-8 110,-6 108,12 38,10" fill="rgba(198, 40, 40, 0.88)"/>
    </g>

    <!-- TORN PAPER SHEET -->
    <g filter="url(#shadow)">
      <path d="${outerTornPath}" fill="#fcf9f2"/>
      <path d="${innerTornPath}" fill="#f5eee0"/>
      <path d="${innerTornPath}" fill="url(#paper-grid)"/>
    </g>

    <!-- 4 Masking Tape Strips -->
    <!-- Top-Left -->
    <g transform="translate(${paperX - 10}, ${paperY - 10}) rotate(-42)" filter="url(#tape-shadow)">
      <polygon points="0,0 80,2 84,32 2,30" fill="rgba(240, 235, 215, 0.78)"/>
      <line x1="2" y1="1" x2="82" y2="3" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2"/>
    </g>
    <!-- Top-Right -->
    <g transform="translate(${paperX + paperW - 45}, ${paperY - 20}) rotate(38)" filter="url(#tape-shadow)">
      <polygon points="0,0 82,2 80,32 -2,30" fill="rgba(240, 235, 215, 0.78)"/>
      <line x1="0" y1="1" x2="80" y2="3" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2"/>
    </g>
    <!-- Bottom-Left -->
    <g transform="translate(${paperX - 20}, ${paperY + paperH - 25}) rotate(40)" filter="url(#tape-shadow)">
      <polygon points="0,0 80,2 82,32 2,30" fill="rgba(240, 235, 215, 0.78)"/>
      <line x1="2" y1="1" x2="80" y2="3" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2"/>
    </g>
    <!-- Bottom-Right -->
    <g transform="translate(${paperX + paperW - 40}, ${paperY + paperH - 15}) rotate(-36)" filter="url(#tape-shadow)">
      <polygon points="0,0 80,2 82,32 2,30" fill="rgba(240, 235, 215, 0.78)"/>
      <line x1="2" y1="1" x2="80" y2="3" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2"/>
    </g>

    <!-- Top Washi Tape with @heisjuanda in Sharpie font -->
    <g transform="translate(${paperX + 25}, ${paperY - 14}) rotate(-2)">
      <polygon points="0,0 160,3 164,30 4,28" fill="rgba(198, 40, 40, 0.95)" filter="url(#tape-shadow)"/>
      <line x1="4" y1="2" x2="4" y2="28" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2" stroke-width="1.5"/>
      <line x1="160" y1="2" x2="160" y2="28" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2" stroke-width="1.5"/>
      <text x="24" y="21" font-family="Sharpie" font-size="16" fill="#ffffff">@heisjuanda</text>
    </g>

    <!-- Red underline -->
    <rect x="${paperX + 45}" y="${paperY + 146}" width="90" height="3.5" fill="#c53030"/>

    <!-- Role in Typewriter Monospace -->
    <text x="${paperX + 45}" y="${paperY + 186}"
          font-family="Courier New, Courier, monospace"
          font-weight="bold"
          font-size="22"
          letter-spacing="3"
          fill="#1f1a16">SOFTWARE ENGINEER</text>

    <!-- Tech Stack Pill Tags (Paper Cutouts) -->
    <g transform="translate(${paperX + 45}, ${paperY + 210})">
      <!-- Go -->
      <g transform="rotate(-1.5)">
        <polygon points="0,0 60,1 58,27 2,26" fill="#ffffff" stroke="#d5cbbb" stroke-width="1"/>
        <text x="14" y="18" font-family="Courier New, monospace" font-weight="bold" font-size="13" fill="#221d18">Go</text>
      </g>
      <!-- Vue -->
      <g transform="translate(70, 0) rotate(1)">
        <polygon points="0,0 68,1 66,27 2,26" fill="#ffffff" stroke="#d5cbbb" stroke-width="1"/>
        <text x="15" y="18" font-family="Courier New, monospace" font-weight="bold" font-size="13" fill="#221d18">Vue</text>
      </g>
      <!-- React -->
      <g transform="translate(148, 0) rotate(-1)">
        <polygon points="0,0 78,1 76,27 2,26" fill="#ffffff" stroke="#d5cbbb" stroke-width="1"/>
        <text x="14" y="18" font-family="Courier New, monospace" font-weight="bold" font-size="13" fill="#221d18">React</text>
      </g>
      <!-- AWS -->
      <g transform="translate(236, 0) rotate(1.5)">
        <polygon points="0,0 68,1 66,27 2,26" fill="#ffffff" stroke="#d5cbbb" stroke-width="1"/>
        <text x="15" y="18" font-family="Courier New, monospace" font-weight="bold" font-size="13" fill="#221d18">AWS</text>
      </g>
      <!-- TypeScript -->
      <g transform="translate(314, 0) rotate(-1)">
        <polygon points="0,0 120,1 118,27 2,26" fill="#ffffff" stroke="#d5cbbb" stroke-width="1"/>
        <text x="12" y="18" font-family="Courier New, monospace" font-weight="bold" font-size="13" fill="#221d18">TypeScript</text>
      </g>
    </g>

    <!-- Tagline in Sharpie Font -->
    <text x="${paperX + 45}" y="${paperY + 282}"
          font-family="Sharpie"
          font-size="21"
          fill="#44392e">Building scalable web &amp; mobile SDKs • APIs • Cloud</text>

    <!-- Web Link Tag in Red Tape with Sharpie font -->
    <g transform="translate(${paperX + 540}, ${paperY + 260}) rotate(-1.5)">
      <polygon points="0,0 196,2 194,28 2,26" fill="#c62828"/>
      <line x1="2" y1="2" x2="2" y2="26" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2" stroke-width="1.5"/>
      <line x1="194" y1="2" x2="194" y2="26" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3,2" stroke-width="1.5"/>
      <text x="18" y="20" font-family="Sharpie" font-size="17" fill="#ffffff">juandamoreno.dev ➔</text>
    </g>

    <!-- Origami Airplane Flight Trail -->
    <path d="M 1060 85 C 1120 90, 1170 65, 1210 40 C 1230 25, 1250 30, 1270 50" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="6,6" fill="none"/>
  </svg>
  `;
}

async function renderMasterBanner() {
  const W = 1584;
  const H = 396;
  const BLUEPRINT = "#0d4f7c";

  const paperX = 350;
  const paperY = 36;
  const paperW = 830;

  // Process Title "JuanDa's" (authentic colorful collage asset)
  const juandasBuf = await sharp(ASSETS.juandas)
    .resize({ width: 440, fit: "inside" })
    .png()
    .toBuffer();
  const juandasMeta = await sharp(juandasBuf).metadata();

  const juandasAlpha = await sharp(juandasBuf)
    .ensureAlpha()
    .extractChannel("alpha")
    .linear(0.35, 0)
    .blur(5)
    .toBuffer();
  const juandasShadow = await sharp({
    create: { width: juandasMeta.width, height: juandasMeta.height, channels: 3, background: { r: 50, g: 35, b: 20 } },
  })
    .joinChannel(juandasAlpha)
    .png()
    .toBuffer();

  // Process Cutout Character
  const charBuf = await sharp(ASSETS.character)
    .resize({ height: 372, fit: "inside" })
    .png()
    .toBuffer();
  const charMeta = await sharp(charBuf).metadata();
  const charX = 1245;
  const charY = 18;

  const charAlpha = await sharp(charBuf)
    .ensureAlpha()
    .extractChannel("alpha")
    .linear(0.55, 0)
    .blur(10)
    .toBuffer();
  const charShadow = await sharp({
    create: { width: charMeta.width, height: charMeta.height, channels: 3, background: { r: 4, g: 18, b: 32 } },
  })
    .joinChannel(charAlpha)
    .png()
    .toBuffer();

  // Red Pushpin & Airplane
  const pinBuf = await sharp(ASSETS.pin).resize(38).png().toBuffer();
  const planeBuf = await sharp(ASSETS.plane).resize(80).png().toBuffer();

  const svgContent = buildBannerSvg();

  // Composite Master Banner at native LinkedIn dimensions (1584x396)
  const masterBuffer = await sharp({
    create: { width: W, height: H, channels: 3, background: BLUEPRINT },
  })
    .composite([
      { input: Buffer.from(svgContent), top: 0, left: 0 },
      { input: juandasShadow, top: paperY + 30, left: paperX + 47 },
      { input: juandasBuf, top: paperY + 26, left: paperX + 45 },
      { input: pinBuf, top: paperY - 8, left: paperX + paperW - 28 },
      { input: planeBuf, top: 22, left: 1100 },
      { input: charShadow, top: charY + 10, left: charX + 8 },
      { input: charBuf, top: charY, left: charX },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return masterBuffer;
}

async function main() {
  console.log("🎨 Generando banners oficiales para LinkedIn y GitHub...\n");

  const masterBuffer = await renderMasterBanner();

  const configs = [
    {
      name: "LinkedIn (1x)",
      file: resolve(OUT_DIR, "banner-linkedin.png"),
      width: 1584,
      height: 396,
    },
    {
      name: "LinkedIn Retina (2x)",
      file: resolve(OUT_DIR, "banner-linkedin-2x.png"),
      width: 3168,
      height: 792,
    },
    {
      name: "GitHub Profile (1x)",
      file: resolve(OUT_DIR, "banner-github.png"),
      width: 1280,
      height: 320,
    },
    {
      name: "GitHub Profile Retina (2x)",
      file: resolve(OUT_DIR, "banner-github-2x.png"),
      width: 2560,
      height: 640,
    },
  ];

  for (const cfg of configs) {
    await sharp(masterBuffer)
      .resize(cfg.width, cfg.height, { fit: "cover", kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(cfg.file);

    const { size } = statSync(cfg.file);
    const sizeKb = (size / 1024).toFixed(0);
    console.log(`  ✓ ${cfg.name.padEnd(26)} -> ${cfg.width}x${cfg.height} px  (${sizeKb} KB)`);
  }

  // Also update root workspace banner preview for convenience
  const rootPreview = resolve(ROOT, "banner_preview.png");
  await sharp(masterBuffer).toFile(rootPreview);
  console.log(`\n  ✓ Vista previa actualizada en: banner_preview.png`);

  console.log(`\n🎉 Todos los banners generados exitosamente en: public/images/banners/\n`);
}

main().catch((err) => {
  console.error("Error generando banners:", err);
  process.exit(1);
});

