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
 * Builds the LinkedIn SVG (1584x396)
 * @param {boolean} isSans - When true, uses standard geometric sans typography instead of Sharpie font
 */
function buildLinkedInSvg(isSans = false) {
  const W = 1584;
  const H = 396;
  const contentX = 360;

  const fontName = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTagline = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTape = isSans ? "DejaVu Sans Mono, Courier New, monospace" : "Sharpie";

  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Blueprint Fine Grid (20px) -->
      <pattern id="fineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.11)" stroke-width="1"/>
      </pattern>
      <!-- Blueprint Major Grid (100px) -->
      <pattern id="coarseGrid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
      </pattern>
      <!-- Tape Drop Shadow -->
      <filter id="tapeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2.5" flood-color="rgba(0, 0, 0, 0.4)"/>
      </filter>
    </defs>

    <!-- Base Blueprint Solid & Grid -->
    <rect width="${W}" height="${H}" fill="${BLUEPRINT}"/>
    <rect width="${W}" height="${H}" fill="url(#fineGrid)"/>
    <rect width="${W}" height="${H}" fill="url(#coarseGrid)"/>

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

    <!-- Technical Drawing Annotations -->
    <g font-family="Courier New, monospace" font-size="11" fill="rgba(255,255,255,0.5)" letter-spacing="2">
      <text x="48" y="44">// DWG: JM-2026-ARCH // CALI, COL [3.4516° N, 76.5320° W]</text>
      <text x="${W - 320}" y="44">// STATUS: OPEN TO ROLES</text>
      <text x="48" y="${H - 34}">// SCALE: 1:1 // FULL STACK &amp; CLOUD SYSTEMS</text>
    </g>

    <!-- Red Tape: @heisjuanda -->
    <g transform="translate(${contentX}, 66)" filter="url(#tapeShadow)">
      <polygon points="0,0 152,1 150,28 2,27" fill="#c62828"/>
      <line x1="3" y1="2" x2="3" y2="26" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2.5,2" stroke-width="1.2"/>
      <line x1="148" y1="2" x2="148" y2="26" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2.5,2" stroke-width="1.2"/>
      <text x="${isSans ? 22 : 20}" y="${isSans ? 19 : 20}" font-family="${fontTape}" font-size="${isSans ? 12.5 : 15}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff" ${isSans ? 'letter-spacing="1"' : ''}>@heisjuanda</text>
    </g>

    <text x="${contentX + 172}" y="85" font-family="Courier New, monospace" font-size="12.5" font-weight="bold" fill="rgba(255,255,255,0.65)" letter-spacing="2.5">// FULL STACK &amp; CLOUD SYSTEMS</text>

    <!-- Master Name -->
    <text x="${contentX}" y="152"
          font-family="${fontName}"
          font-size="52"
          font-weight="${isSans ? '900' : 'normal'}"
          fill="#ffffff"
          letter-spacing="${isSans ? '-0.8' : '1'}">Juan David Moreno</text>

    <!-- Role in Courier Monospace -->
    <text x="${contentX}" y="194"
          font-family="Courier New, Courier, monospace"
          font-weight="bold"
          font-size="22"
          letter-spacing="4"
          fill="#BAE6FD">SOFTWARE ENGINEER</text>

    <!-- Red underline accent -->
    <rect x="${contentX}" y="206" width="90" height="3" fill="#c53030"/>

    <!-- Tagline -->
    <text x="${contentX}" y="242"
          font-family="${fontTagline}"
          font-size="${isSans ? 18.5 : 21}"
          font-weight="${isSans ? '400' : 'normal'}"
          fill="#e2effa"
          letter-spacing="${isSans ? '0.2' : '0.5'}">Building scalable web &amp; mobile SDKs • APIs • Cloud</text>

    <!-- Tech Stack Blueprint Badges -->
    <g transform="translate(${contentX}, 268)" font-family="Courier New, monospace" font-size="12.5" font-weight="bold">
      <!-- Go -->
      <g transform="translate(0, 0)">
        <rect width="52" height="28" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="26" y="19" text-anchor="middle" fill="#ffffff">Go</text>
      </g>
      <!-- Vue -->
      <g transform="translate(62, 0)">
        <rect width="60" height="28" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="30" y="19" text-anchor="middle" fill="#ffffff">Vue</text>
      </g>
      <!-- React -->
      <g transform="translate(132, 0)">
        <rect width="70" height="28" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="35" y="19" text-anchor="middle" fill="#ffffff">React</text>
      </g>
      <!-- AWS -->
      <g transform="translate(212, 0)">
        <rect width="60" height="28" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="30" y="19" text-anchor="middle" fill="#ffffff">AWS</text>
      </g>
      <!-- TypeScript -->
      <g transform="translate(282, 0)">
        <rect width="118" height="28" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="59" y="19" text-anchor="middle" fill="#ffffff">TypeScript</text>
      </g>
      <!-- Distributed / Cloud -->
      <g transform="translate(410, 0)">
        <rect width="138" height="28" fill="rgba(14, 165, 233, 0.22)" stroke="rgba(56, 189, 248, 0.6)" stroke-width="1"/>
        <text x="69" y="19" text-anchor="middle" fill="#7DD3FC">Distributed</text>
      </g>
    </g>

    <!-- Web Link Pill (Red Washi Tape) -->
    <g transform="translate(${contentX}, 314)" filter="url(#tapeShadow)">
      <polygon points="0,0 206,1 204,27 2,26" fill="#c62828"/>
      <text x="18" y="${isSans ? 18.5 : 19}" font-family="${fontTape}" font-size="${isSans ? 12.5 : 15}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff">juandamoreno.dev ➔</text>
    </g>

    <!-- Architectural Drafting Title Block (Cartela Técnica en Esquina Derecha) -->
    <g transform="translate(${W - 380}, 200)" font-family="Courier New, monospace">
      <rect width="330" height="142" fill="rgba(0, 0, 0, 0.18)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="1.2"/>
      <line x1="0" y1="34" x2="330" y2="34" stroke="rgba(255, 255, 255, 0.25)"/>
      <text x="16" y="22" font-size="10" font-weight="bold" fill="#7DD3FC" letter-spacing="1.5">ENGINEERING SPECIFICATION</text>
      <text x="314" y="22" text-anchor="end" font-size="10" fill="rgba(255,255,255,0.4)">REV 2026.1</text>

      <line x1="0" y1="70" x2="330" y2="70" stroke="rgba(255, 255, 255, 0.15)"/>
      <text x="16" y="54" font-size="9" fill="rgba(255, 255, 255, 0.5)">TITLE:</text>
      <text x="80" y="54" font-size="11" font-weight="bold" fill="#ffffff">Software Engineer</text>

      <line x1="0" y1="106" x2="330" y2="106" stroke="rgba(255, 255, 255, 0.15)"/>
      <text x="16" y="90" font-size="9" fill="rgba(255, 255, 255, 0.5)">LOCATION:</text>
      <text x="80" y="90" font-size="11" fill="#BAE6FD">Cali, Colombia → Worldwide</text>

      <text x="16" y="126" font-size="9" fill="rgba(255, 255, 255, 0.5)">CONTACT:</text>
      <text x="80" y="126" font-size="11" fill="#7DD3FC">juandamoreno.dev</text>
    </g>
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
  const contentX = 96;

  const fontName = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTagline = isSans ? "Lato, DejaVu Sans, sans-serif" : "Sharpie";
  const fontTape = isSans ? "DejaVu Sans Mono, Courier New, monospace" : "Sharpie";

  return `
  <svg width="${W_GH}" height="${H_GH}" viewBox="0 0 ${W_GH} ${H_GH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Blueprint Fine Grid (16px) -->
      <pattern id="fineGridGh" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.11)" stroke-width="0.8"/>
      </pattern>
      <!-- Blueprint Major Grid (80px) -->
      <pattern id="coarseGridGh" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
      </pattern>
      <!-- Tape Drop Shadow -->
      <filter id="tapeShadowGh" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2.5" flood-color="rgba(0, 0, 0, 0.4)"/>
      </filter>
    </defs>

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

    <!-- Technical Drawing Annotations -->
    <g font-family="Courier New, monospace" font-size="9.5" fill="rgba(255,255,255,0.5)" letter-spacing="1.8">
      <text x="40" y="36">// DWG: JM-2026-ARCH // CALI, COL [3.4516° N, 76.5320° W]</text>
      <text x="${W_GH - 260}" y="36">// STATUS: OPEN TO ROLES</text>
      <text x="40" y="${H_GH - 28}">// SCALE: 1:1 // FULL STACK &amp; CLOUD SYSTEMS</text>
    </g>

    <!-- Red Tape: @heisjuanda -->
    <g transform="translate(${contentX}, 56)" filter="url(#tapeShadowGh)">
      <polygon points="0,0 134,1 132,24 2,23" fill="#c62828"/>
      <line x1="3" y1="2" x2="3" y2="22" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2,2" stroke-width="1"/>
      <line x1="130" y1="2" x2="130" y2="22" stroke="rgba(255,255,255,0.4)" stroke-dasharray="2,2" stroke-width="1"/>
      <text x="18" y="16.5" font-family="${fontTape}" font-size="${isSans ? 11 : 13}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff" ${isSans ? 'letter-spacing="1"' : ''}>@heisjuanda</text>
    </g>

    <text x="${contentX + 152}" y="72" font-family="Courier New, monospace" font-size="11" font-weight="bold" fill="rgba(255,255,255,0.65)" letter-spacing="2">// FULL STACK &amp; CLOUD SYSTEMS</text>

    <!-- Master Name -->
    <text x="${contentX}" y="126"
          font-family="${fontName}"
          font-size="44"
          font-weight="${isSans ? '900' : 'normal'}"
          fill="#ffffff"
          letter-spacing="${isSans ? '-0.8' : '0.8'}">Juan David Moreno</text>

    <!-- Role in Courier Monospace -->
    <text x="${contentX}" y="158"
          font-family="Courier New, Courier, monospace"
          font-weight="bold"
          font-size="18"
          letter-spacing="3.5"
          fill="#BAE6FD">SOFTWARE ENGINEER</text>

    <!-- Red underline accent -->
    <rect x="${contentX}" y="168" width="76" height="2.5" fill="#c53030"/>

    <!-- Tagline -->
    <text x="${contentX}" y="198"
          font-family="${fontTagline}"
          font-size="${isSans ? 15 : 17}"
          font-weight="${isSans ? '400' : 'normal'}"
          fill="#e2effa"
          letter-spacing="${isSans ? '0.2' : '0.5'}">Building scalable web &amp; mobile SDKs • APIs • Cloud</text>

    <!-- Tech Stack Blueprint Badges -->
    <g transform="translate(${contentX}, 220)" font-family="Courier New, monospace" font-size="11" font-weight="bold">
      <g transform="translate(0, 0)">
        <rect width="46" height="24" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="23" y="16" text-anchor="middle" fill="#ffffff">Go</text>
      </g>
      <g transform="translate(54, 0)">
        <rect width="52" height="24" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="26" y="16" text-anchor="middle" fill="#ffffff">Vue</text>
      </g>
      <g transform="translate(114, 0)">
        <rect width="60" height="24" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="30" y="16" text-anchor="middle" fill="#ffffff">React</text>
      </g>
      <g transform="translate(182, 0)">
        <rect width="52" height="24" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="26" y="16" text-anchor="middle" fill="#ffffff">AWS</text>
      </g>
      <g transform="translate(242, 0)">
        <rect width="102" height="24" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1"/>
        <text x="51" y="16" text-anchor="middle" fill="#ffffff">TypeScript</text>
      </g>
      <g transform="translate(352, 0)">
        <rect width="118" height="24" fill="rgba(14, 165, 233, 0.22)" stroke="rgba(56, 189, 248, 0.6)" stroke-width="1"/>
        <text x="59" y="16" text-anchor="middle" fill="#7DD3FC">Distributed</text>
      </g>
    </g>

    <!-- Web Link Pill (Red Washi Tape) -->
    <g transform="translate(${contentX}, 258)" filter="url(#tapeShadowGh)">
      <polygon points="0,0 182,1 180,24 2,23" fill="#c62828"/>
      <text x="14" y="${isSans ? 16.5 : 16.5}" font-family="${fontTape}" font-size="${isSans ? 11 : 13}" font-weight="${isSans ? 'bold' : 'normal'}" fill="#ffffff">juandamoreno.dev ➔</text>
    </g>

    <!-- Architectural Drafting Title Block in Right Corner -->
    <g transform="translate(${W_GH - 320}, 160)" font-family="Courier New, monospace">
      <rect width="280" height="118" fill="rgba(0, 0, 0, 0.18)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="1"/>
      <line x1="0" y1="28" x2="280" y2="28" stroke="rgba(255, 255, 255, 0.25)"/>
      <text x="12" y="18" font-size="8.5" font-weight="bold" fill="#7DD3FC" letter-spacing="1.5">ENGINEERING SPECIFICATION</text>
      <text x="268" y="18" text-anchor="end" font-size="8.5" fill="rgba(255,255,255,0.4)">REV 2026.1</text>

      <line x1="0" y1="58" x2="280" y2="58" stroke="rgba(255, 255, 255, 0.15)"/>
      <text x="12" y="45" font-size="8" fill="rgba(255, 255, 255, 0.5)">TITLE:</text>
      <text x="68" y="45" font-size="9.5" font-weight="bold" fill="#ffffff">Software Engineer</text>

      <line x1="0" y1="88" x2="280" y2="88" stroke="rgba(255, 255, 255, 0.15)"/>
      <text x="12" y="75" font-size="8" fill="rgba(255, 255, 255, 0.5)">LOCATION:</text>
      <text x="68" y="75" font-size="9.5" fill="#BAE6FD">Cali, Colombia → Worldwide</text>

      <text x="12" y="105" font-size="8" fill="rgba(255, 255, 255, 0.5)">CONTACT:</text>
      <text x="68" y="105" font-size="9.5" fill="#7DD3FC">juandamoreno.dev</text>
    </g>
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
