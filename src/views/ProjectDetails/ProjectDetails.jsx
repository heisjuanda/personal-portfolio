import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { PROJECTS_DATA } from "../data/projects.data.js";
import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import JsonLd from "../../components/JsonLd/JsonLd.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Character from "../../components/Character/Character.jsx";

import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = PROJECTS_DATA.find((p) => p.id === id);
  const [copiedHex, setCopiedHex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <NotFound isProjectView />;
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

      <main className="project-details blueprint-bg" id="main-content">

        {/* ── ENCABEZADO ESTILO PLANO DE DISEÑO ── */}
        <header className="project-details__header">
          <div className="project-details__header-inner">
            <span className="project-details__meta-tag">
              {project.category} // SYSTEM-SPEC-{project.year}
            </span>
            <h1
              className="project-details__title"
              style={{ viewTransitionName: `project-title-${project.id}` }}
            >
              {project.name}
            </h1>
            <p className="project-details__context">➔ CONTEXT: {project.context}</p>
          </div>
        </header>

        {/* ── EXPEDIENTE / HOJA TÉCNICA PRINCIPAL ── */}
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
                <div className="pd-tech-line pd-tech-line--horiz"><span>MEASURE_SCALE_100%</span></div>
                <img
                  className="pd-visual-image"
                  src={`/${project.realSrc}`}
                  alt={`${project.name} Production Interface`}
                  loading="eager"
                />
              </div>
            </section>

            {/* BLOQUE 3: NARRATIVA CIENTÍFICA (PROBLEMA Y SOLUCIÓN) */}
            <section className="pd-section pd-section--narrative">
              <div className="pd-card pd-card--problem">
                <span className="pd-card__stamp">BLOCK 01 // PROBLEM</span>
                <p>{project.problem}</p>
              </div>
              <div className="pd-card pd-card--solution">
                <span className="pd-card__stamp">BLOCK 02 // SOLUTION</span>
                <p>{project.solution}</p>
              </div>
            </section>

            {/* BLOQUE 4: MÉTRICAS E IMPACTO (SELLOS INDUSTRIALES) */}
            {(project.metrics || project.impact) && (
              <section className="pd-section pd-section--impact">
                {project.impact && (
                  <div className="pd-impact-folder">
                    <h3>ENGINEERING IMPACT REPORT</h3>
                    <p>{project.impact}</p>
                  </div>
                )}
                {project.metrics && (
                  <div className="pd-metrics-grid">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="pd-metric-stamp">
                        <span className="pd-metric-stamp__value">{metric.value}</span>
                        <span className="pd-metric-stamp__label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* BLOQUE 5: HIGHLIGHTS (NOTAS DE CAMPO) */}
            {project.highlights && (
              <section className="pd-section pd-section--highlights">
                <div className="pd-highlights-sheet">
                  <h3>FIELD NOTES & DEVELOPMENT HIGHLIGHTS</h3>
                  <ul>
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>
                        <span className="pd-bullet">✓</span> {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* BLOQUE 6: SISTEMA DE DISEÑO (CINTAS AISLANTES EXPANDIBLES :HAS) */}
            {project.designSystem?.palette && (
              <section className="pd-section pd-section--design">
                <h3 className="pd-design-title">CORE SYSTEM PALETTE</h3>
                <div className="pd-palette-strip">
                  {project.designSystem.palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="pd-swatch"
                      style={{ backgroundColor: color.hex }}
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

            {/* BLOQUE 7: ENLACES DE ACCIÓN (CINTAS ROJAS DE SALIDA DE EMERGENCIA) */}
            <section className="pd-section pd-section--actions">
              <div className="pd-actions-wrapper">
                {project.links?.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--live">
                    <span>DEPLOYED SYSTEM ➔</span>
                  </a>
                )}
                {project.links?.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="pd-action-btn pd-action-btn--repo">
                    <span>SOURCE REPOSITORY ➔</span>
                  </a>
                )}
                <Link to="/" className="pd-action-btn pd-action-btn--back">
                  <span>{"\uFE0E"}← BACK TO BLUEPRINTS</span>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}