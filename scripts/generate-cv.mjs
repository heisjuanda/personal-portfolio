import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

import { getCvData } from "./cv.data.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONTS_DIR = resolve(ROOT, "scripts/assets/fonts");
const OUTPUT_PATH = resolve(ROOT, "public/cv/cv.pdf");

const MARGIN_X = 36;
const MARGIN_TOP = 26;
const MARGIN_BOTTOM = 24;
const PAGE_WIDTH = 612; // US Letter
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
const BULLET_INDENT = 12;

const COLORS = {
  text: "#111111",
  muted: "#333333",
  rule: "#222222",
};

/**
 * Renders inline rich text segments (supporting bold and clickable links) sequentially.
 */
function renderSegments(doc, segments, options = {}) {
  const { fontSize = 9.2, lineGap = 1.5, width = CONTENT_WIDTH, x } = options;

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    doc
      .font(segment.bold ? "Lato-Bold" : "Lato-Regular")
      .fontSize(fontSize)
      .fillColor(COLORS.text);

    const textOpts = {
      width,
      lineGap,
      continued: !isLast,
      link: segment.link ?? null,
      underline: false,
    };

    if (index === 0 && x !== undefined) {
      doc.text(segment.text, x, doc.y, textOpts);
    } else {
      doc.text(segment.text, textOpts);
    }
  });
}

/**
 * Draws an uppercase section heading with a clean horizontal divider below it.
 */
function renderSectionHeading(doc, title) {
  doc.moveDown(0.45);
  doc
    .font("Lato-Bold")
    .fontSize(10)
    .fillColor(COLORS.text)
    .text(title, MARGIN_X, doc.y, { width: CONTENT_WIDTH });

  const ruleY = doc.y + 1.5;
  doc
    .save()
    .moveTo(MARGIN_X, ruleY)
    .lineTo(PAGE_WIDTH - MARGIN_X, ruleY)
    .lineWidth(0.6)
    .strokeColor(COLORS.rule)
    .stroke()
    .restore();

  doc.y = ruleY + 4;
}

/**
 * Renders a bulleted list item with a hanging indent.
 */
function renderBullet(doc, segments) {
  const startY = doc.y;
  doc
    .font("Lato-Regular")
    .fontSize(9.2)
    .fillColor(COLORS.text)
    .text("•", MARGIN_X + 2, startY, { lineBreak: false });

  doc.y = startY;
  renderSegments(doc, segments, {
    x: MARGIN_X + BULLET_INDENT,
    width: CONTENT_WIDTH - BULLET_INDENT,
    fontSize: 9.2,
    lineGap: 1.4,
  });
  doc.y += 1.8;
}

/**
 * Generates public/cv/cv.pdf as a single-page US Letter document.
 */
async function buildCvPdf(data) {
  const doc = new PDFDocument({
    size: "LETTER",
    margins: {
      top: MARGIN_TOP,
      bottom: MARGIN_BOTTOM,
      left: MARGIN_X,
      right: MARGIN_X,
    },
    bufferPages: true,
    info: {
      Title: `${data.name} — CV`,
      Author: data.name,
      Subject: data.role,
    },
  });

  doc.registerFont("Lato-Regular", resolve(FONTS_DIR, "Lato-Regular.ttf"));
  doc.registerFont("Lato-Bold", resolve(FONTS_DIR, "Lato-Bold.ttf"));

  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const finished = new Promise((resolvePromise, reject) => {
    doc.on("end", () => resolvePromise(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  // Header: Name & Role
  doc
    .font("Lato-Bold")
    .fontSize(15)
    .fillColor(COLORS.text)
    .text(data.name, MARGIN_X, MARGIN_TOP, {
      width: CONTENT_WIDTH,
      align: "center",
    });

  doc
    .font("Lato-Regular")
    .fontSize(10.5)
    .fillColor(COLORS.muted)
    .text(data.role, MARGIN_X, doc.y + 1, {
      width: CONTENT_WIDTH,
      align: "center",
    });

  // Contact line (centered manually so clickable link rects align accurately)
  doc.font("Lato-Regular").fontSize(8.8).fillColor(COLORS.text);
  const sep = " | ";
  const sepWidth = doc.widthOfString(sep);
  const totalContactWidth = data.contact.reduce(
    (sum, item, idx) =>
      sum + doc.widthOfString(item.text) + (idx > 0 ? sepWidth : 0),
    0,
  );
  let contactX = MARGIN_X + (CONTENT_WIDTH - totalContactWidth) / 2;
  const contactY = doc.y + 3;

  data.contact.forEach((item, idx) => {
    if (idx > 0) {
      doc.text(sep, contactX, contactY, { lineBreak: false });
      contactX += sepWidth;
    }
    const w = doc.widthOfString(item.text);
    doc.text(item.text, contactX, contactY, {
      lineBreak: false,
      ...(item.link ? { link: item.link, underline: false } : {}),
    });
    contactX += w;
  });
  doc.y = contactY + 12;

  // Summary
  renderSectionHeading(doc, "SUMMARY");
  doc
    .font("Lato-Regular")
    .fontSize(9.2)
    .fillColor(COLORS.text)
    .text(data.summary, MARGIN_X, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 1.5,
    });

  // Work Experience
  renderSectionHeading(doc, "WORK EXPERIENCE");
  data.experience.forEach((job, jobIndex) => {
    if (jobIndex > 0) {
      doc.y += 4;
    }

    const rowY = doc.y;
    const roleLabel = `${job.role}`;
    const companyLabel = `, ${job.company}`;

    doc.font("Lato-Bold").fontSize(9.5).fillColor(COLORS.text);
    doc.text(roleLabel, MARGIN_X, rowY, { continued: true });
    doc.font("Lato-Regular").text(companyLabel, { continued: false });

    doc
      .font("Lato-Bold")
      .fontSize(9.2)
      .fillColor(COLORS.text)
      .text(job.period, MARGIN_X, rowY, {
        width: CONTENT_WIDTH,
        align: "right",
      });

    doc.y = Math.max(doc.y, rowY + 13) + 1.5;

    for (const bullet of job.bullets) {
      renderBullet(doc, bullet);
    }
  });

  // Technical Skills
  renderSectionHeading(doc, "TECHNICAL SKILLS");
  for (const group of data.skills) {
    renderSegments(
      doc,
      [
        { text: `${group.label}: `, bold: true },
        { text: group.items },
      ],
      {
        x: MARGIN_X,
        width: CONTENT_WIDTH,
        fontSize: 9.2,
        lineGap: 1.4,
      },
    );
    doc.y += 1.5;
  }

  // Selected Projects
  renderSectionHeading(doc, "SELECTED PROJECTS");
  for (const project of data.projects) {
    renderBullet(doc, project);
  }

  // Education
  renderSectionHeading(doc, "EDUCATION");
  const eduY = doc.y;
  doc
    .font("Lato-Bold")
    .fontSize(9.2)
    .fillColor(COLORS.text)
    .text(data.education.institution, MARGIN_X, eduY, { continued: true })
    .font("Lato-Regular")
    .text(`, ${data.education.degree}`, { continued: false });
  doc
    .font("Lato-Bold")
    .fontSize(9.2)
    .fillColor(COLORS.text)
    .text(data.education.period, MARGIN_X, eduY, {
      width: CONTENT_WIDTH,
      align: "right",
    });
  doc.y = Math.max(doc.y, eduY + 13);

  // Languages
  renderSectionHeading(doc, "LANGUAGES");
  doc
    .font("Lato-Regular")
    .fontSize(9.2)
    .fillColor(COLORS.text)
    .text(data.languages, MARGIN_X, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 1.4,
    });

  const pageCount = doc.bufferedPageRange().count;
  if (pageCount !== 1) {
    throw new Error(
      `Expected CV to fit on 1 page, but rendered ${pageCount} pages. Tighten spacing or copy.`,
    );
  }

  doc.end();
  return finished;
}

const data = getCvData();
const pdfBuffer = await buildCvPdf(data);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, pdfBuffer);

const { size } = statSync(OUTPUT_PATH);
console.log(
  `  cv.pdf: ${(size / 1024).toFixed(1)} KB (experience: ${data.summary.match(/\d+\+ years/)?.[0] ?? "unknown"})`,
);
