import { mkdir, writeFile } from "node:fs/promises";
import { statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS_DIR = resolve(ROOT, "scripts/assets/fonts");
const FONTS_CONF = resolve(ROOT, "scripts/assets/fonts.conf");

// Configure Fontconfig to load project fonts (Sharpie & Poland canned into Kaito)
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

const BLUEPRINT = "#0d4f7c";

// Parse CLI flag to set primary default font
const args = process.argv.slice(2);
const makeSansDefault = args.includes("--default=sans") || args.includes("--sans-primary");

/**
 * Builds shared blueprint SVG defs (grid patterns + tape drop shadow)
 * @param {string} suffix - Unique ID suffix per target SVG
 * @param {number} fineSize - Minor grid spacing in px
 * @param {number} coarseSize - Major grid spacing in px
 */
function buildBlueprintDefs(suffix, fineSize, coarseSize) {
  return `
    <defs>
      <pattern id="fineGrid${suffix}" width="${fineSize}" height="${fineSize}" patternUnits="userSpaceOnUse">
        <path d="M ${fineSize} 0 L 0 0 0 ${fineSize}" fill="none" stroke="rgba(255,255,255,0.11)" stroke-width="${fineSize === 20 ? 1 : 0.8}"/>
      </pattern>
      <pattern id="coarseGrid${suffix}" width="${coarseSize}" height="${coarseSize}" patternUnits="userSpaceOnUse">
        <path d="M ${coarseSize} 0 L 0 0 0 ${coarseSize}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="${coarseSize === 100 ? 1.2 : 1}"/>
      </pattern>
      <filter id="tapeShadow${suffix}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2.5" flood-color="rgba(0, 0, 0, 0.4)"/>
      </filter>
    </defs>`;
}

/**
 * Renders a minimalist blueprint-style paper plane with a delicate dashed flight trail
 */
function buildPaperPlane({ planeX, planeY, scale = 1, rotateDeg = -14, trailPath }) {
  return `
    <g opacity="0.62">
      <!-- Graceful dashed flight trail -->
      <path d="${trailPath}"
            fill="none"
            stroke="rgba(186, 230, 253, 0.55)"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-dasharray="7,7"/>

      <!-- Subtle blueprint origami paper plane -->
      <g transform="translate(${planeX}, ${planeY}) rotate(${rotateDeg}) scale(${scale})">
        <!-- Far / Upper wing -->
        <polygon points="110,24 4,6 24,24"
                 fill="rgba(255, 255, 255, 0.14)"
                 stroke="rgba(255, 255, 255, 0.78)"
                 stroke-width="1.3"
                 stroke-linejoin="round"/>
        <!-- Subtle blueprint crease guide on upper wing -->
        <line x1="110" y1="24" x2="14" y2="15"
              stroke="rgba(186, 230, 253, 0.45)"
              stroke-width="0.9"
              stroke-dasharray="3,3"/>

        <!-- Center fuselage shadow wall -->
        <polygon points="110,24 24,24 20,42"
                 fill="rgba(6, 38, 64, 0.55)"
                 stroke="rgba(255, 255, 255, 0.62)"
                 stroke-width="1.2"
                 stroke-linejoin="round"/>

        <!-- Inner valley fold -->
        <polygon points="110,24 20,42 34,29"
                 fill="rgba(125, 211, 252, 0.14)"
                 stroke="rgba(255, 255, 255, 0.72)"
                 stroke-width="1.2"
                 stroke-linejoin="round"/>

        <!-- Near / Lower wing -->
        <polygon points="110,24 34,29 46,52"
                 fill="rgba(255, 255, 255, 0.18)"
                 stroke="rgba(255, 255, 255, 0.85)"
                 stroke-width="1.3"
                 stroke-linejoin="round"/>
      </g>
    </g>`;
}

/**
 * Renders the row of Tech Stack Blueprint Badges
 */
function buildTechBadges({ x, y, badges, height, fontSize }) {
  const textY = Math.round(height * 0.66);
  const items = badges
    .map(
      (b) => `
      <g transform="translate(${b.offset}, 0)">
        <rect width="${b.width}" height="${height}" fill="${b.highlight ? "rgba(14, 165, 233, 0.22)" : "rgba(255, 255, 255, 0.08)"}" stroke="${b.highlight ? "rgba(56, 189, 248, 0.6)" : "rgba(255, 255, 255, 0.4)"}" stroke-width="1"/>
        <text x="${b.width / 2}" y="${textY}" text-anchor="middle" fill="${b.highlight ? "#7DD3FC" : "#ffffff"}">${b.label}</text>
      </g>`
    )
    .join("");

  return `
    <g transform="translate(${x}, ${y})" font-family="Courier New, monospace" font-size="${fontSize}" font-weight="bold">
      ${items}
    </g>`;
}

/**
 * Builds the LinkedIn SVG (1584x396)
 * Keeps bottom-left avatar zone (x < ~360, y > ~185) and top-right edit button (x > ~1460, y < ~110) clear.
 * @param {boolean} isSans - When true, uses standard geometric sans typography instead of Sharpie font
 */
function buildLinkedInSvg(isSans = false) {
  const W = 1584;
  const H = 396;
  const contentX = 430;

  const fontName = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTagline = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTape = isSans ? "DejaVu Sans Mono, Courier New, monospace" : "Sharpie";

  const badges = [
    { label: "Go", offset: 0, width: 56 },
    { label: "Vue", offset: 66, width: 64 },
    { label: "React", offset: 140, width: 76 },
    { label: "AWS", offset: 226, width: 64 },
    { label: "TypeScript", offset: 300, width: 126 },
    { label: "Distributed", offset: 436, width: 144, highlight: true },
  ];

  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    ${buildBlueprintDefs("Li", 20, 100)}

    <!-- Base Blueprint Solid & Grid -->
    <rect width="${W}" height="${H}" fill="${BLUEPRINT}"/>
    <rect width="${W}" height="${H}" fill="url(#fineGridLi)"/>
    <rect width="${W}" height="${H}" fill="url(#coarseGridLi)"/>

    <!-- Perimeter Architectural Border Frame -->
    <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="rgba(255, 255, 255, 0.28)" stroke-width="1.2"/>
    <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="rgba(255, 255, 255, 0.10)" stroke-width="0.8"/>

    <!-- Corner Framing Markers -->
    <g stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.2">
      <path d="M 20 24 L 32 24 M 24 20 L 24 32"/>
      <path d="M ${W - 32} 24 L ${W - 20} 24 M ${W - 24} 20 L ${W - 24} 32"/>
      <path d="M 20 ${H - 24} L 32 ${H - 24} M 24 ${H - 32} L 24 ${H - 20}"/>
      <path d="M ${W - 32} ${H - 24} L ${W - 20} ${H - 24} M ${W - 24} ${H - 32} L ${W - 24} ${H - 20}"/>
    </g>

    <!-- Left Ruler Markings (Millimetric Drafting Ticks) -->
    <g opacity="0.38" stroke="white" stroke-width="1">
      <line x1="30" y1="50" x2="30" y2="346"/>
      <line x1="30" y1="50" x2="45" y2="50"/>
      <line x1="30" y1="80" x2="38" y2="80"/>
      <line x1="30" y1="110" x2="45" y2="110"/>
      <line x1="30" y1="140" x2="38" y2="140"/>
      <line x1="30" y1="170" x2="45" y2="170"/>
      <line x1="30" y1="200" x2="38" y2="200"/>
      <line x1="30" y1="230" x2="45" y2="230"/>
      <line x1="30" y1="260" x2="38" y2="260"/>
      <line x1="30" y1="290" x2="45" y2="290"/>
      <line x1="30" y1="320" x2="38" y2="320"/>
      <line x1="30" y1="346" x2="45" y2="346"/>
    </g>

    <!-- Technical Drawing Annotations (kept clear of top-right LinkedIn edit button) -->
    <g font-family="Courier New, monospace" font-size="11" fill="rgba(255,255,255,0.5)" letter-spacing="2">
      <text x="48" y="44">// DWG: JM-2026-ARCH // CALI, COL [3.4516° N, 76.5320° W]</text>
      <text x="1430" y="44" text-anchor="end">// STATUS: OPEN TO ROLES</text>
      <text x="48" y="${H - 34}">// SCALE: 1:1 // FULL STACK &amp; CLOUD SYSTEMS</text>
    </g>

    <!-- Red Tape: @heisjuanda -->
    <g transform="translate(${contentX}, 56)" filter="url(#tapeShadowLi)">
      <polygon points="0,0 164,1 162,30 2,29" fill="#c62828"/>
      <line x1="3" y1="2" x2="3" y2="28" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2.5,2" stroke-width="1.2"/>
      <line x1="160" y1="2" x2="160" y2="28" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2.5,2" stroke-width="1.2"/>
      <text x="${isSans ? 23 : 22}" y="${isSans ? 20 : 21}" font-family="${fontTape}" font-size="${isSans ? 13.5 : 16}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff" ${isSans ? 'letter-spacing="1"' : ''}>@heisjuanda</text>
    </g>

    <text x="${contentX + 184}" y="76" font-family="Courier New, monospace" font-size="13.5" font-weight="bold" fill="rgba(255,255,255,0.68)" letter-spacing="2.5">// FULL STACK &amp; CLOUD SYSTEMS</text>

    <!-- Master Name -->
    <text x="${contentX}" y="152"
          font-family="${fontName}"
          font-size="66"
          font-weight="${isSans ? '900' : 'normal'}"
          fill="#ffffff"
          letter-spacing="${isSans ? '-1' : '1'}">Juan David Moreno</text>

    <!-- Role in Courier Monospace -->
    <text x="${contentX}" y="194"
          font-family="Courier New, Courier, monospace"
          font-weight="bold"
          font-size="24"
          letter-spacing="4.5"
          fill="#BAE6FD">SOFTWARE ENGINEER</text>

    <!-- Red underline accent -->
    <rect x="${contentX}" y="207" width="110" height="3.5" fill="#c53030"/>

    <!-- Tagline -->
    <text x="${contentX}" y="244"
          font-family="${fontTagline}"
          font-size="${isSans ? 20.5 : 23}"
          font-weight="${isSans ? '400' : 'normal'}"
          fill="#e2effa"
          letter-spacing="${isSans ? '0.2' : '0.5'}">Building scalable web &amp; mobile SDKs • APIs • Cloud</text>

    <!-- Tech Stack Blueprint Badges -->
    ${buildTechBadges({ x: contentX, y: 268, badges, height: 32, fontSize: 13.5 })}

    <!-- Web Link Pill (Red Washi Tape) -->
    <g transform="translate(${contentX}, 318)" filter="url(#tapeShadowLi)">
      <polygon points="0,0 228,1 226,30 2,29" fill="#c62828"/>
      <text x="19" y="${isSans ? 20 : 21}" font-family="${fontTape}" font-size="${isSans ? 13.5 : 16}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff">juandamoreno.dev ➔</text>
    </g>

    <!-- Minimalist Blueprint Paper Plane -->
    ${buildPaperPlane({
      planeX: 1320,
      planeY: 178,
      scale: 1.15,
      rotateDeg: -16,
      trailPath:
        "M 1055,305 C 1130,305 1175,270 1195,235 C 1210,208 1178,192 1166,216 C 1154,240 1198,262 1255,244 C 1292,232 1318,216 1338,204",
    })}
  </svg>
  `;
}

/**
 * Builds the GitHub SVG (1280x320)
 * @param {boolean} isSans - When true, uses standard geometric sans typography instead of Sharpie font
 */
function buildGitHubSvg(isSans = false) {
  const W_GH = 1280;
  const H_GH = 320;
  const contentX = 76;

  const fontName = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTagline = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTape = isSans ? "DejaVu Sans Mono, Courier New, monospace" : "Sharpie";

  const badges = [
    { label: "Go", offset: 0, width: 48 },
    { label: "Vue", offset: 56, width: 56 },
    { label: "React", offset: 120, width: 64 },
    { label: "AWS", offset: 192, width: 56 },
    { label: "TypeScript", offset: 256, width: 108 },
    { label: "Distributed", offset: 372, width: 124, highlight: true },
  ];

  return `
  <svg width="${W_GH}" height="${H_GH}" viewBox="0 0 ${W_GH} ${H_GH}" xmlns="http://www.w3.org/2000/svg">
    ${buildBlueprintDefs("Gh", 16, 80)}

    <!-- Base Blueprint Solid & Grid -->
    <rect width="${W_GH}" height="${H_GH}" fill="${BLUEPRINT}"/>
    <rect width="${W_GH}" height="${H_GH}" fill="url(#fineGridGh)"/>
    <rect width="${W_GH}" height="${H_GH}" fill="url(#coarseGridGh)"/>

    <!-- Perimeter Architectural Border Frame -->
    <rect x="20" y="20" width="${W_GH - 40}" height="${H_GH - 40}" fill="none" stroke="rgba(255, 255, 255, 0.28)" stroke-width="1"/>
    <rect x="24" y="24" width="${W_GH - 48}" height="${H_GH - 48}" fill="none" stroke="rgba(255, 255, 255, 0.10)" stroke-width="0.8"/>

    <!-- Corner Framing Markers -->
    <g stroke="rgba(255, 255, 255, 0.45)" stroke-width="1">
      <path d="M 16 20 L 26 20 M 20 16 L 20 26"/>
      <path d="M ${W_GH - 26} 20 L ${W_GH - 16} 20 M ${W_GH - 20} 16 L ${W_GH - 20} 26"/>
      <path d="M 16 ${H_GH - 20} L 26 ${H_GH - 20} M 20 ${H_GH - 26} L 20 ${H_GH - 16}"/>
      <path d="M ${W_GH - 26} ${H_GH - 20} L ${W_GH - 16} ${H_GH - 20} M ${W_GH - 20} ${H_GH - 26} L ${W_GH - 20} ${H_GH - 16}"/>
    </g>

    <!-- Left Ruler Markings -->
    <g opacity="0.38" stroke="white" stroke-width="0.9">
      <line x1="26" y1="42" x2="26" y2="278"/>
      <line x1="26" y1="42" x2="38" y2="42"/>
      <line x1="26" y1="72" x2="33" y2="72"/>
      <line x1="26" y1="102" x2="38" y2="102"/>
      <line x1="26" y1="132" x2="33" y2="132"/>
      <line x1="26" y1="162" x2="38" y2="162"/>
      <line x1="26" y1="192" x2="33" y2="192"/>
      <line x1="26" y1="222" x2="38" y2="222"/>
      <line x1="26" y1="252" x2="33" y2="252"/>
      <line x1="26" y1="278" x2="38" y2="278"/>
    </g>

    <!-- Technical Drawing Annotations -->
    <g font-family="Courier New, monospace" font-size="9.5" fill="rgba(255,255,255,0.5)" letter-spacing="1.8">
      <text x="42" y="36">// DWG: JM-2026-ARCH // CALI, COL [3.4516° N, 76.5320° W]</text>
      <text x="${W_GH - 42}" y="36" text-anchor="end">// STATUS: OPEN TO ROLES</text>
      <text x="42" y="${H_GH - 26}">// SCALE: 1:1 // FULL STACK &amp; CLOUD SYSTEMS</text>
    </g>

    <!-- Red Tape: @heisjuanda -->
    <g transform="translate(${contentX}, 48)" filter="url(#tapeShadowGh)">
      <polygon points="0,0 144,1 142,25 2,24" fill="#c62828"/>
      <line x1="3" y1="2" x2="3" y2="23" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2,2" stroke-width="1"/>
      <line x1="140" y1="2" x2="140" y2="23" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2,2" stroke-width="1"/>
      <text x="19" y="17" font-family="${fontTape}" font-size="${isSans ? 12 : 14}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff" ${isSans ? 'letter-spacing="1"' : ''}>@heisjuanda</text>
    </g>

    <text x="${contentX + 162}" y="65" font-family="Courier New, monospace" font-size="11.5" font-weight="bold" fill="rgba(255,255,255,0.68)" letter-spacing="2">// FULL STACK &amp; CLOUD SYSTEMS</text>

    <!-- Master Name -->
    <text x="${contentX}" y="120"
          font-family="${fontName}"
          font-size="56"
          font-weight="${isSans ? '900' : 'normal'}"
          fill="#ffffff"
          letter-spacing="${isSans ? '-1' : '0.8'}">Juan David Moreno</text>

    <!-- Role in Courier Monospace -->
    <text x="${contentX}" y="154"
          font-family="Courier New, Courier, monospace"
          font-weight="bold"
          font-size="20"
          letter-spacing="4"
          fill="#BAE6FD">SOFTWARE ENGINEER</text>

    <!-- Red underline accent -->
    <rect x="${contentX}" y="164" width="94" height="3" fill="#c53030"/>

    <!-- Tagline -->
    <text x="${contentX}" y="193"
          font-family="${fontTagline}"
          font-size="${isSans ? 17.5 : 19}"
          font-weight="${isSans ? '400' : 'normal'}"
          fill="#e2effa"
          letter-spacing="${isSans ? '0.2' : '0.5'}">Building scalable web &amp; mobile SDKs • APIs • Cloud</text>

    <!-- Tech Stack Blueprint Badges -->
    ${buildTechBadges({ x: contentX, y: 211, badges, height: 27, fontSize: 11.5 })}

    <!-- Web Link Pill (Red Washi Tape) -->
    <g transform="translate(${contentX}, 248)" filter="url(#tapeShadowGh)">
      <polygon points="0,0 198,1 196,25 2,24" fill="#c62828"/>
      <text x="16" y="17" font-family="${fontTape}" font-size="${isSans ? 12 : 14}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff">juandamoreno.dev ➔</text>
    </g>

    <!-- Minimalist Blueprint Paper Plane -->
    ${buildPaperPlane({
      planeX: 1035,
      planeY: 124,
      scale: 1,
      rotateDeg: -16,
      trailPath:
        "M 760,245 C 835,245 885,212 905,178 C 920,152 888,136 876,160 C 864,184 908,205 965,186 C 1002,174 1028,159 1050,147",
    })}
  </svg>
  `;
}

async function renderBanners() {
  console.log("🎨 Generando banners oficiales (Variantes: Sharpie y Tipografía Normal Sans)...\n");

  const variants = [
    {
      label: "Sharpie",
      isSans: false,
      primaryPrefix: "",
      previewFile: "banner_preview.png",
    },
    {
      label: "Normal (Sans)",
      isSans: true,
      primaryPrefix: "-sans",
      previewFile: "banner_preview_sans.png",
    },
  ];

  for (const v of variants) {
    console.log(`🔷 Generando paquete: ${v.label}...`);
    const svgLinkedIn = buildLinkedInSvg(v.isSans);
    const svgGitHub = buildGitHubSvg(v.isSans);

    // If makeSansDefault is active, the sans version will overwrite the main file names
    const isPrimaryTarget = makeSansDefault ? v.isSans : !v.isSans;

    const configs = [
      {
        name: `LinkedIn ${v.label} (1x)`,
        file: resolve(OUT_DIR, `banner-linkedin${v.primaryPrefix}.png`),
        svg: svgLinkedIn,
        width: 1584,
        height: 396,
      },
      {
        name: `LinkedIn ${v.label} Retina (2x)`,
        file: resolve(OUT_DIR, `banner-linkedin${v.primaryPrefix}-2x.png`),
        svg: svgLinkedIn,
        width: 3168,
        height: 792,
      },
      {
        name: `GitHub ${v.label} (1x)`,
        file: resolve(OUT_DIR, `banner-github${v.primaryPrefix}.png`),
        svg: svgGitHub,
        width: 1280,
        height: 320,
      },
      {
        name: `GitHub ${v.label} Retina (2x)`,
        file: resolve(OUT_DIR, `banner-github${v.primaryPrefix}-2x.png`),
        svg: svgGitHub,
        width: 2560,
        height: 640,
      },
    ];

    for (const cfg of configs) {
      await sharp(Buffer.from(cfg.svg))
        .resize(cfg.width, cfg.height)
        .png({ compressionLevel: 9, effort: 10 })
        .toFile(cfg.file);

      const { size } = statSync(cfg.file);
      const sizeKb = (size / 1024).toFixed(0);
      console.log(`  ✓ ${cfg.name.padEnd(30)} -> ${cfg.width}x${cfg.height} px  (${sizeKb} KB)`);
    }

    // Root preview for this variant
    const previewPath = resolve(ROOT, v.previewFile);
    await sharp(Buffer.from(svgLinkedIn))
      .png({ compressionLevel: 9 })
      .toFile(previewPath);
    console.log(`  ✓ Vista previa actualizada: ${v.previewFile}\n`);
  }

  console.log(`🎉 Todos los banners generados exitosamente en: public/images/banners/\n`);
}

renderBanners().catch((err) => {
  console.error("Error generando banners:", err);
  process.exit(1);
});
