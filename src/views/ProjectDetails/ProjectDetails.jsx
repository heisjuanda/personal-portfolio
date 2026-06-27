import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { PROJECTS_DATA } from "../data/projects.data.js";
import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import JsonLd from "../../components/JsonLd/JsonLd.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Character from "../../components/Character/Character.jsx";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll.jsx"
import PaperContainer from "../../components/PaperContainer/PaperContainer.jsx";

import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = PROJECTS_DATA.find((p) => p.id === id);
  const [copiedHex, setCopiedHex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <NotFound isProjectView />;
  }

  const handleBack = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(-1));
    } else {
      navigate(-1);
    }
  }

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    });
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.solution,
    author: {
      "@type": "Person",
      name: "Juan David Moreno Alfonso",
      url: "https://juandamoreno.dev",
    },
    dateCreated: project.year,
    keywords: project.tags?.join(", "),
    ...(project.links?.live && { url: project.links.live }),
    ...(project.links?.repo && { codeRepository: project.links.repo }),
  };

  return (
    <>
      <SEOHead
        title={project.name}
        description={project.solution || project.context}
        canonical={`/projects/${project.id}`}
        ogImage={`/${project.realSrc}`}
      />
      <JsonLd data={projectSchema} />
      <Character isProjectView />
      <SmoothScroll />

      <main className="project-details blueprint-bg" id="main-content">
        <header className="project-details__header">
          <div className="project-details__header-inner">
            <span className="project-details__meta-tag">
              {project.category}-{project.year}
            </span>
            <h1
              className="project-details__title"
              style={{ viewTransitionName: `project-title-${project.id}` }}
            >
              {project.name}
            </h1>
            <p className="project-details__context">
              <span>&rarr; CONTEXT:</span> {project.context}</p>
          </div>
        </header>

        {/* ── EXPEDIENTE / HOJA TÉCNICA PRINCIPAL ── */}
        <PaperContainer className="section-separator separator-prject--top" />
        <div className="project-details__content">
          <div className="pd-dossier">

            {/* BLOQUE 1: RECUADRO DE ROTULACIÓN (TITLE BLOCK INDUSTRIAL) */}
            <section className="pd-section pd-section--specs">
              <div className="pd-specs-table">
                <div className="pd-specs-cell"><strong>ROLE:</strong> <span>{project.role}</span></div>
                <div className="pd-specs-cell"><strong>YEAR:</strong> <span>{project.year}</span></div>
                <div className="pd-specs-cell"><strong>STACK:</strong> <span>{project.stack}</span></div>
              </div>
            </section>

            {/* BLOQUE 2: MAQUETA INTERACTIVA (BLUEPRINT TO REALITY) */}
            <section className="pd-section pd-section--visual">
              <div className="pd-visual-frame">
                <img
                  className="pd-visual-image"
                  src={`/${project.realSrc}`}
                  alt={`${project.name} Production Interface`}
                  loading="eager"
                />
              </div>
            </section>

            {/* 📝 BLOQUE 3: NARRATIVA CIENTÍFICA (RELAJO VISUAL CON RECORTES Y CINTAS) */}
            <section className="pd-section pd-section--narrative">

              <div className="pd-card pd-card--problem">
                <div className="pd-tape pd-tape--top-left" />
                <div className="pd-tape pd-tape--bottom-right" />

                <div className="pd-card__header">
                  <span className="pd-card__stamp">BLOCK // PROBLEM</span>
                  <span className="pd-card__number">01</span>
                </div>
                <p>{project.problem}</p>
              </div>

              <div className="pd-card pd-card--solution">
                <div className="pd-tape pd-tape--top-left" />
                <div className="pd-tape pd-tape--top-right" />

                <div className="pd-card__header">
                  <span className="pd-card__stamp">BLOCK // SOLUTION</span>
                  <span className="pd-card__number">02</span>
                </div>
                <p>{project.solution}</p>
              </div>

            </section>

            {/* 📊 BLOQUE 4: MÉTRICAS E IMPACTO (ORGANIZACIÓN HORIZONTAL OPTIMIZADA) */}
            {(project.metrics || project.impact) && (
              <section className="pd-section pd-section--impact">

                {project.impact && (
                  <div className="pd-impact-folder pd-swatch">
                    <h2>ENGINEERING IMPACT REPORT</h2>
                    <p>{project.impact}</p>
                  </div>
                )}

                {project.metrics && (
                  <div className="pd-metrics-display">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="pd-metric-circle-item">
                        <div className="pd-metric-circle__wrapper">
                          <span className="pd-metric-circle__value">{metric.value}</span>
                        </div>
                        <span className="pd-metric-circle__label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

              </section>
            )}

            {/* BLOQUE 5: HIGHLIGHTS (NOTAS DE CAMPO) */}
            {project.highlights && (
              <section className="pd-section pd-section--highlights">
                <h2 className="pd-highlights-title">FIELD NOTES & DEVELOPMENT HIGHLIGHTS</h2>

                <div className="pd-highlights-grid">
                  {project.highlights.map((highlight, i) => {
                    const colors = ["yellow", "cyan", "pink"];
                    const colorClass = colors[i % colors.length];

                    return (
                      <div key={i} className={`pd-highlight-note pd-highlight-note--${colorClass}`}>
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

            {/* BLOQUE 6: SISTEMA DE DISEÑO (ACTUALIZADO CON VARIABLE CSS) */}
            {project.designSystem?.palette && (
              <section className="pd-section pd-section--design">
                <h2 className="pd-design-title">CORE SYSTEM PALETTE</h2>
                <div className="pd-palette-strip">
                  {project.designSystem.palette.map((color, idx) => (
                    <div
                      key={idx}
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
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="pd-section pd-section--actions">
              <div className="pd-actions-wrapper">
                {project.links?.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--live">
                    <span>DEPLOYED SYSTEM &rarr;</span>
                  </a>
                )}
                {project.links?.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--repo">
                    <span>SOURCE REPOSITORY &rarr;</span>
                  </a>
                )}
                <button onClick={handleBack} className="pd-action-btn pd-action-btn--back">
                  <span>&larr; BACK TO BLUEPRINTS</span>
                </button>
              </div>
            </section>

          </div>
        </div>
        <PaperContainer className="section-separator separator-prject--bottom" />
      </main>
    </>
  );
}