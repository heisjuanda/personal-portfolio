import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync, statSync } from "node:fs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const OUT = resolve(ROOT, "public/images/og-cover.jpg");
const DESK = resolve(ROOT, "raw/og/desk-clean.jpg");
const CHARACTER = resolve(ROOT, "public/images/character/front.avif");
const TITLE_JUANDAS = resolve(ROOT, "public/images/title/juanda's.avif");
const TITLE_ADVENTURE = resolve(ROOT, "public/images/title/adventure.avif");

const OG = { width: 1200, height: 630 };

const CROP = { topRatio: 0.42 };

const TITLE = {
  juandas: { left: 150, top: 150, width: 480 },
  adventure: { left: 150, top: 291, width: 580 },
  label: { left: 152, top: 448, width: 600, height: 84 },
};

const CHAR = { centerX: 930, top: 78, height: 474 };

const PIN = { asset: "public/images/pin.avif", width: 42, dx: 44, dy: 145 };

const SHADOW = { dx: 9, dy: 13, blur: 10, opacity: 0.42, rgb: { r: 8, g: 28, b: 46 } };

const NAME = "JUAN DAVID MORENO";
const ROLE = "SOFTWARE ENGINEER";

function labelSvg({ width, height }) {
  const fit = (text, size, spacing) => text.length * (size * 0.6 + spacing);

  if (fit(NAME, 28, 2.5) > width || fit(ROLE, 21, 2.5) > width) {
    throw new Error("label does not fit the cream sheet; reduce font-size or shorten the text");
  }

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect x="0" y="0" width="86" height="3" fill="#c53030"/>
    <text x="0" y="40"
          font-family="Courier New, Courier, monospace"
          font-size="28" letter-spacing="2.5" fill="#2d3748">${NAME}</text>
    <text x="0" y="72"
          font-family="Courier New, Courier, monospace"
          font-size="21" letter-spacing="2.5" fill="#8a7a66">${ROLE}</text>
  </svg>`);
}

async function paperShadow(buf, width, height) {
  const alpha = await sharp(buf)
    .ensureAlpha()
    .extractChannel("alpha")
    .linear(SHADOW.opacity, 0)
    .blur(SHADOW.blur)
    .toBuffer();

  return sharp({
    create: { width, height, channels: 3, background: SHADOW.rgb },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

async function main() {
  const deskPath = process.argv[2]?.startsWith("--") ? DESK : process.argv[2] ?? DESK;
  const withCharacter = !process.argv.includes("--no-character");
  const outIdx = process.argv.indexOf("--out");
  const out = outIdx > -1 ? resolve(process.argv[outIdx + 1]) : OUT;

  if (!existsSync(deskPath)) {
    console.error(`missing desk background: ${deskPath}`);
    process.exit(1);
  }

  const desk = sharp(resolve(deskPath));
  const { width: dw, height: dh } = await desk.metadata();

  const targetRatio = OG.width / OG.height;
  let cropW = dw;
  let cropH = Math.round(dw / targetRatio);
  if (cropH > dh) {
    cropH = dh;
    cropW = Math.round(dh * targetRatio);
  }
  const cropTop = Math.round((dh - cropH) * CROP.topRatio);
  const cropLeft = Math.round((dw - cropW) / 2);

  const base = await desk
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .resize(OG.width, OG.height)
    .toBuffer();

  const layers = [];

  if (withCharacter) {
    const char = await sharp(CHARACTER)
      .resize({ height: CHAR.height, fit: "inside" })
      .png()
      .toBuffer();
    const { width: cw, height: ch } = await sharp(char).metadata();
    const left = Math.round(CHAR.centerX - cw / 2);

    layers.push({
      input: await paperShadow(char, cw, ch),
      left: left + SHADOW.dx,
      top: CHAR.top + SHADOW.dy,
    });
    layers.push({ input: char, left, top: CHAR.top });

    if (process.argv.includes("--pin")) {
      layers.push({
        input: await sharp(resolve(ROOT, PIN.asset)).resize({ width: PIN.width }).png().toBuffer(),
        left: left + PIN.dx,
        top: CHAR.top + PIN.dy,
      });
    }
  }

  for (const [asset, box] of [
    [TITLE_JUANDAS, TITLE.juandas],
    [TITLE_ADVENTURE, TITLE.adventure],
  ]) {
    layers.push({
      input: await sharp(asset).resize({ width: box.width }).png().toBuffer(),
      left: box.left,
      top: box.top,
    });
  }

  layers.push({
    input: labelSvg(TITLE.label),
    left: TITLE.label.left,
    top: TITLE.label.top,
  });

  await sharp(base).composite(layers).jpeg({ quality: 80, mozjpeg: true }).toFile(out);

  const { size } = statSync(out);
  console.log(`${out}  ${OG.width}x${OG.height}  ${(size / 1024).toFixed(0)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
