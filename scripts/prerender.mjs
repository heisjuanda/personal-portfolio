import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { brotliCompressSync, constants as zlib, gzipSync } from "node:zlib";
import { pathToFileURL } from "node:url";

import { SEO_ROUTES } from "../src/routes.seo.js";

const CLIENT_DIR = resolve("dist/client");
const TEMPLATE_PATH = resolve(CLIENT_DIR, "index.html");
const SERVER_ENTRY = resolve(".prerender/entry-server.js");
const ROOT_PLACEHOLDER = '<div id="root"></div>';

const NOT_FOUND_PATH = "/__not_found__";

if (!existsSync(TEMPLATE_PATH)) {
  throw new Error(`Missing ${TEMPLATE_PATH}. Run \`vite build\` first.`);
}
if (!existsSync(SERVER_ENTRY)) {
  throw new Error(
    `Missing ${SERVER_ENTRY}. Run \`vite build --config vite.prerender.config.js\` first.`,
  );
}

let template = readFileSync(TEMPLATE_PATH, "utf8");
if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(`index.html no longer contains ${ROOT_PLACEHOLDER}; cannot inject markup.`);
}

const STYLESHEET_LINK = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
const linkMatch = template.match(STYLESHEET_LINK);
if (!linkMatch) {
  throw new Error("index.html has no entry stylesheet <link> to inline.");
}
const css = readFileSync(resolve(CLIENT_DIR, `.${linkMatch[1]}`), "utf8");
if (css.includes("</style")) {
  throw new Error("Stylesheet contains '</style'; cannot be inlined safely.");
}
template = template.replace(linkMatch[0], `<style>${css}</style>`);
console.log(`  inline css: ${linkMatch[1]} (${(css.length / 1024).toFixed(1)} KB)`);

const { render } = await import(pathToFileURL(SERVER_ENTRY).href);

function outputFileFor(pathname) {
  if (pathname === "/") return "index.html";
  if (pathname === NOT_FOUND_PATH) return "404.html";
  return `${pathname.replace(/^\//, "")}.html`;
}

function writeWithSidecars(relativePath, html) {
  const target = resolve(CLIENT_DIR, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");

  const bytes = Buffer.from(html, "utf8");
  writeFileSync(
    `${target}.br`,
    brotliCompressSync(bytes, {
      params: { [zlib.BROTLI_PARAM_QUALITY]: 11, [zlib.BROTLI_PARAM_SIZE_HINT]: bytes.length },
    }),
  );
  writeFileSync(`${target}.gz`, gzipSync(bytes, { level: 9 }));
}

const targets = [...Object.keys(SEO_ROUTES), NOT_FOUND_PATH];

for (const pathname of targets) {
  let markup = await render(pathname);
  if (!markup.trim()) {
    throw new Error(`Empty render for ${pathname}`);
  }

  markup = markup.replace(/<link rel="preload"[^>]*\/>/g, "");

  const markupWithoutSvg = markup.replace(/<svg\b[\s\S]*?<\/svg>/g, "");
  if (/<(title|meta|link)\b/.test(markupWithoutSvg)) {
    throw new Error(`Head tags found inside the body markup for ${pathname}`);
  }

  const html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${markup}</div>`);
  const file = outputFileFor(pathname);
  writeWithSidecars(file, html);

  const words = markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`  prerender: ${pathname.padEnd(28)} -> ${file.padEnd(30)} ${words} words`);
}

for (const leftover of ["index.html.br.tmp", "index.html.gz.tmp"]) {
  const p = resolve(CLIENT_DIR, leftover);
  if (existsSync(p)) unlinkSync(p);
}
