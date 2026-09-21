import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";

import { PROJECTS_DATA } from "../data/projects.data.js";
import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import JsonLd from "../../components/JsonLd/JsonLd.jsx";
import { getSeoForPath } from "../../routes.seo.js";
import Character from "../../components/Character/Character.jsx";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll.jsx"
import PaperContainer from "../../components/PaperContainer/PaperContainer.jsx";
import { scrollToSection, scrollToTop } from "../../utils/smoothScroll.js";
import Figure from "./Figure.jsx";
import Diagram from "./Diagram.jsx";
import CodeSheet from "./CodeSheet.jsx";

import "./ProjectDetails.css";

const NotFound = lazy(() => import("../NotFound/NotFound.jsx"));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(value) {
  if (!value) return null;
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

function formatTimeline(timeline, fallbackYear) {
  if (!timeline?.start) return fallbackYear ?? null;
  const start = formatDate(timeline.start);
  if (timeline.end === null) return `${start} – present`;
  const end = formatDate(timeline.end);
  return !end || end === start ? start : `${start} – ${end}`;
}

const STATUS_LABEL = {
  live: "Live",
  archived: "Archived",
  prototype: "Prototype",
};

const hasGallery = (p) =>
  (p.gallery?.length ?? 0) > 1 || Boolean(p.architecture) || Boolean(p.codeSample);

const SECTION_INDEX = [
  { id: "specs", label: "Specs", when: () => true },
  { id: "brief", label: "Brief", when: () => true },
  { id: "gallery", label: "Gallery", when: hasGallery },
  { id: "impact", label: "Impact", when: (p) => p.metrics || p.impact },
  { id: "decisions", label: "Decisions", when: (p) => p.decisions?.length },
  { id: "learnings", label: "Learnings", when: (p) => p.learnings?.length },
];

export default function ProjectDetails() {
  const { id } = useParams();

  const project = PROJECTS_DATA.find((p) => p.id === id);
  const [copiedHex, setCopiedHex] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    scrollToTop();
  }, [id]);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    if (lightbox && !dialog.open) dialog.showModal();
    if (!lightbox && dialog.open) dialog.close();
  }, [lightbox]);

  if (!project) {
    return (
      <Suspense fallback={<div className="blueprint-bg" />}>
        <NotFound isProjectView />
      </Suspense>
    );
  }

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    });
  };

  const handleIndexClick = (event, sectionId) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  const projectSeo = getSeoForPath(`/projects/${project.id}`);
  const projectIndex = PROJECTS_DATA.findIndex(({ id: projectId }) => projectId === id);
  const relatedProjects = project.related?.length
    ? project.related
        .map((relatedId) => PROJECTS_DATA.find((p) => p.id === relatedId))
        .filter(Boolean)
    : [1, 2].map((offset) => PROJECTS_DATA[(projectIndex + offset) % PROJECTS_DATA.length]);

  const title = project.title ?? project.name;
  const timelineLabel = formatTimeline(project.timeline, project.year);
  const statusLabel = STATUS_LABEL[project.status];
  const stackGroups = project.stackGroups ? Object.entries(project.stackGroups) : null;
  const sections = SECTION_INDEX.filter((section) => section.when(project));

  const heroFigure = project.gallery?.[0] ?? null;
  const galleryFigures = project.gallery?.slice(1) ?? [];
  let figureNumber = heroFigure ? 1 : 0;
  const nextFigure = () => ++figureNumber;

  return (
    <>
      <SEOHead
        title={project.seoTitle ?? project.name}
        description={projectSeo.description}
        canonical={projectSeo.canonicalPath}
        ogImage={projectSeo.ogImage}
        ogImageAlt={projectSeo.ogImageAlt}
      />
      <JsonLd data={projectSeo.jsonLd} />
      <Character isProjectView />
      <SmoothScroll />

      <nav className="pd-index" aria-label="Case study sections">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="pd-index__tab"
            onClick={(event) => handleIndexClick(event, section.id)}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <main className="project-details blueprint-bg" id="main-content">
        <header className="project-details__header">
          <div className={`project-details__header-inner${heroFigure ? " project-details__header-inner--with-vignette" : ""}`}>
            {heroFigure && (
              <div className="project-details__vignette" aria-hidden="true">
                <div className="pd-tape pd-tape--top-left" />
                <img src={`/${project.realSrc}`} alt="" width="160" loading="lazy" decoding="async" />
              </div>
            )}
            <span className="project-details__meta-tag">
              {project.category} · {timelineLabel}
            </span>
            <div className="project-details__title-row">
              <h1
                className={`project-details__title${title.length > 60 ? " project-details__title--xl" : title.length > 20 ? " project-details__title--long" : ""}`}
                style={{ viewTransitionName: `project-title-${project.id}` }}
              >
                {title}
              </h1>
              {project.nickname && (
                <span className="project-details__nickname" aria-label={`Also known as ${project.nickname}`}>
                  a.k.a. {project.nickname}
                </span>
              )}
            </div>
            <p className="project-details__context">
              <span>&rarr; CONTEXT:</span> {project.context}</p>
            {project.alternateName && (
              <p className="project-details__context project-details__alt-name" lang="es">
                <span>&rarr; OFFICIAL TITLE:</span> {project.alternateName}
              </p>
            )}
          </div>
        </header>

        <PaperContainer className="section-separator separator-prject--top" />
        <div className="project-details__content">
          <div className="pd-dossier">

            {/* Title block: the six facts a reader scans first. */}
            <section className="pd-section pd-section--specs" id="specs" aria-label="Project specifications">
              <div className={`pd-specs-table${project.team?.credits?.length ? " pd-specs-table--with-team" : ""}`}>
                <div className="pd-specs-cell pd-specs-cell--role">
                  <strong>ROLE:</strong> <span>{project.role}</span>
                </div>
                <div className="pd-specs-cell pd-specs-cell--timeline">
                  <strong>TIMELINE:</strong> <span>{timelineLabel}</span>
                </div>
                <div className="pd-specs-cell pd-specs-cell--status">
                  <strong>STATUS:</strong>{" "}
                  {statusLabel ? (
                    <span className={`pd-status pd-status--${project.status}`}>{statusLabel}</span>
                  ) : (
                    <span>—</span>
                  )}
                </div>
                <div className="pd-specs-cell pd-specs-cell--org">
                  <strong>FOR:</strong>{" "}
                  <span>
                    {project.org?.url ? (
                      <a href={project.org.url} target="_blank" rel="noopener noreferrer">
                        {project.org.name}
                      </a>
                    ) : (
                      project.org?.name ?? "—"
                    )}
                    {project.org?.client && ` · ${project.org.client}`}
                  </span>
                </div>
                <div className="pd-specs-cell pd-specs-cell--stack">
                  <strong>STACK:</strong>{" "}
                  {stackGroups ? (
                    <div className="pd-stack-groups">
                      {stackGroups.map(([layer, chips]) => (
                        <div key={layer} className="pd-stack-group">
                          <span className="pd-stack-group__layer">{layer}</span>
                          <ul className="pd-stack-group__chips">
                            {chips.map((chip) => (
                              <li key={chip} className="pd-chip">{chip}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>{project.stack}</span>
                  )}
                </div>
                {project.team?.credits?.length > 0 && (
                  <div className="pd-specs-cell pd-specs-cell--team">
                    <strong>TEAM:</strong>{" "}
                    <span>
                      {project.team.size && `${project.team.size} people · with `}
                      {project.team.credits.map((credit, i) => (
                        <span key={credit.name}>
                          {i > 0 && ", "}
                          {credit.url ? (
                            <a href={credit.url} target="_blank" rel="noopener noreferrer">
                              {credit.name}
                            </a>
                          ) : (
                            credit.name
                          )}
                          {credit.role && ` (${credit.role})`}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </section>

            {heroFigure && (
              <section className="pd-section pd-section--visual">
                <Figure
                  figure={heroFigure}
                  index={1}
                  eager
                  sizes="(max-width: 768px) 100vw, min(1100px, 92vw)"
                  onOpen={setLightbox}
                  className="pd-figure--hero"
                />
              </section>
            )}

            {/* Brief: problem, solution and, when known, the constraints. */}
            <section
              className={`pd-section pd-section--narrative${project.constraints?.length ? " pd-section--narrative-3" : ""}`}
              id="brief"
              aria-label="Project brief"
            >

              <div className="pd-card pd-card--problem">
                <div className="pd-tape pd-tape--top-left" />
                <div className="pd-tape pd-tape--bottom-right" />

                <div className="pd-card__header">
                  <h2 className="pd-card__stamp">BLOCK // PROBLEM</h2>
                  <span className="pd-card__number" aria-hidden="true">01</span>
                </div>
                <p>{project.problem}</p>
              </div>

              <div className="pd-card pd-card--solution">
                <div className="pd-tape pd-tape--top-left" />
                <div className="pd-tape pd-tape--top-right" />

                <div className="pd-card__header">
                  <h2 className="pd-card__stamp">BLOCK // SOLUTION</h2>
                  <span className="pd-card__number" aria-hidden="true">02</span>
                </div>
                <p>{project.solution}</p>
              </div>

              {project.constraints?.length > 0 && (
                <div className="pd-card pd-card--constraints">
                  <div className="pd-tape pd-tape--top-right" />
                  <div className="pd-tape pd-tape--bottom-right" />

                  <div className="pd-card__header">
                    <h2 className="pd-card__stamp">BLOCK // CONSTRAINTS</h2>
                    <span className="pd-card__number" aria-hidden="true">03</span>
                  </div>
                  <ul className="pd-card__list">
                    {project.constraints.map((constraint) => (
                      <li key={constraint}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              )}

            </section>

            {/* Evidence: more screens, the code and the architecture, laid out like papers on a desk. */}
            {hasGallery(project) && (
              <section className="pd-section pd-section--gallery" id="gallery" aria-labelledby="pd-gallery-title">
                <h2 id="pd-gallery-title" className="pd-section-title">ATTACHED EVIDENCE</h2>
                <div className="pd-gallery">
                  {galleryFigures.map((figure) => (
                    <Figure
                      key={figure.src}
                      figure={figure}
                      index={nextFigure()}
                      sizes="(max-width: 768px) 100vw, 46vw"
                      onOpen={setLightbox}
                      className={figure.frame === "phone" ? "pd-gallery__item pd-gallery__item--narrow" : "pd-gallery__item"}
                    />
                  ))}
                  {project.codeSample && (
                    <div className="pd-gallery__item pd-gallery__item--wide">
                      <CodeSheet sample={project.codeSample} index={nextFigure()} />
                    </div>
                  )}
                  {project.architecture && (
                    <div className="pd-gallery__item pd-gallery__item--wide">
                      <Diagram spec={project.architecture} index={nextFigure()} />
                    </div>
                  )}
                </div>
              </section>
            )}

            {(project.metrics || project.impact) && (
              <section className="pd-section pd-section--impact" id="impact" aria-label="Impact and metrics">

                {project.impact && (
                  <div className="pd-impact-folder pd-swatch">
                    <h2>ENGINEERING IMPACT REPORT</h2>
                    <p>{project.impact}</p>
                  </div>
                )}

                {project.metrics && (
                  <div className="pd-metrics-display">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="pd-metric-circle-item">
                        <div className="pd-metric-circle__wrapper">
                          <span className="pd-metric-circle__value">{metric.value}</span>
                        </div>
                        <span className="pd-metric-circle__label">{metric.label}</span>
                        {metric.context && (
                          <span className="pd-metric-circle__context">{metric.context}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {project.metricsNote && (
                  <p className="pd-metrics-note">{project.metricsNote}</p>
                )}

              </section>
            )}

            {/* Engineering decisions as index cards: what, why, and the option left on the table. */}
            {project.decisions?.length > 0 && (
              <section className="pd-section pd-section--decisions" id="decisions" aria-labelledby="pd-decisions-title">
                <h2 id="pd-decisions-title" className="pd-section-title">ENGINEERING DECISIONS</h2>

                <div className="pd-decisions-grid">
                  {project.decisions.map((decision, i) => (
                    <article key={decision.title} className="pd-decision-card">
                      <span className="pd-decision-card__tag">DECISION_0{i + 1}</span>
                      <h3 className="pd-decision-card__title">{decision.title}</h3>
                      <p className="pd-decision-card__why">{decision.why}</p>
                      {decision.alternative && (
                        <p className="pd-decision-card__alt">
                          <span>Instead of:</span> {decision.alternative}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {project.highlights?.length > 0 && (
              <section className="pd-section pd-section--highlights" id="notes" aria-labelledby="pd-notes-title">
                <h2 id="pd-notes-title" className="pd-highlights-title">FIELD NOTES & DEVELOPMENT HIGHLIGHTS</h2>

                <div className="pd-highlights-grid">
                  {project.highlights.map((highlight, i) => {
                    const colors = ["yellow", "cyan", "pink"];
                    const colorClass = colors[i % colors.length];

                    return (
                      <div key={highlight} className={`pd-highlight-note pd-highlight-note--${colorClass}`}>
                        <div className="pd-highlight-note__glue" />

                        <div className="pd-highlight-note__content">
                          <span className="pd-highlight-note__tag">NOTE_0{i + 1}</span>
                          <p className="pd-highlight-note__text">{highlight}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {project.learnings?.length > 0 && (
              <section className="pd-section pd-section--learnings" id="learnings" aria-labelledby="pd-learnings-title">
                <div className="pd-learnings-sheet">
                  <div className="pd-tape pd-tape--top-left" />
                  <h2 id="pd-learnings-title" className="pd-section-title">LESSONS LEARNED</h2>
                  <ul className="pd-learnings-list">
                    {project.learnings.map((learning) => (
                      <li key={learning}>{learning}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {project.designSystem?.palette && (
              <section className="pd-section pd-section--design" id="palette" aria-labelledby="pd-palette-title">
                <h2 id="pd-palette-title" className="pd-design-title">CORE SYSTEM PALETTE</h2>
                <div className="pd-palette-strip">
                  {project.designSystem.palette.map((color) => (
                    <button
                      type="button"
                      key={color.hex}
                      className="pd-swatch"
                      style={{ "--swatch-color": color.hex }}
                      onClick={() => handleCopyColor(color.hex)}
                      title={`Click to copy ${color.hex}`}
                    >
                      <div className="pd-swatch__info">
                        <span className="pd-swatch__hex">
                          {copiedHex === color.hex ? "COPIED!" : color.hex}
                        </span>
                        <span className="pd-swatch__name">{color.name}</span>
                        <span className="pd-swatch__usage">{color.usage}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="pd-section pd-section--actions" id="links" aria-label="Links and related case studies">
              <div className="pd-actions-wrapper">
                {project.links?.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--live">
                    <span>{project.links.liveLabel ?? "DEPLOYED SYSTEM"} &rarr;</span>
                  </a>
                )}
                {project.links?.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--repo">
                    <span>SOURCE REPOSITORY &rarr;</span>
                  </a>
                )}
                {project.links?.paper && (
                  <a href={project.links.paper} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--repo">
                    <span>READ THE THESIS &rarr;</span>
                  </a>
                )}
                <Link
                  to="/"
                  viewTransition
                  className="pd-action-btn pd-action-btn--back"
                >
                  <span>&larr; BACK TO BLUEPRINTS</span>
                </Link>
              </div>

              {relatedProjects.length > 0 && (
                <div className="pd-related">
                  <h2 className="pd-section-title">RELATED CASE STUDIES</h2>
                  <div className="pd-related__grid">
                    {relatedProjects.map((relatedProject) => (
                      <Link
                        key={relatedProject.id}
                        to={`/projects/${relatedProject.id}`}
                        className="pd-related-card"
                      >
                        <img
                          src={`/${relatedProject.blueprintSrc}`}
                          alt=""
                          className="pd-related-card__img"
                          loading="lazy"
                          width="400"
                          height="400"
                        />
                        <span className="pd-related-card__body">
                          <span className="pd-related-card__name">{relatedProject.name}</span>
                          <span className="pd-related-card__stack">{relatedProject.stack}</span>
                          <span className="pd-related-card__cta">VIEW CASE STUDY &rarr;</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>

          </div>
        </div>
        <PaperContainer className="section-separator separator-prject--bottom" />
      </main>

      <dialog
        ref={lightboxRef}
        className="pd-lightbox"
        onClose={() => setLightbox(null)}
        onClick={(event) => {
          if (event.target === lightboxRef.current) setLightbox(null);
        }}
      >
        {/* The frame's width is derived from the viewport and the image's own
            aspect ratio (see .pd-lightbox__figure), so it hugs the image. */}
        {lightbox && (
          <figure
            className="pd-lightbox__figure"
            style={{ "--img-w": lightbox.width, "--img-h": lightbox.height }}
          >
            <img
              src={lightbox.full}
              width={lightbox.width}
              height={lightbox.height}
              alt={lightbox.alt}
              decoding="async"
            />
            <figcaption>{lightbox.caption ?? lightbox.alt}</figcaption>
            <button
              type="button"
              className="pd-lightbox__close"
              onClick={() => setLightbox(null)}
              aria-label="Close image"
            >
              &times;
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
