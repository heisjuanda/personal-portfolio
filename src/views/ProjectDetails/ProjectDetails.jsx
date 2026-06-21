import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

import { PROJECTS_DATA } from "../data/projects.data.js";
import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import JsonLd from "../../components/JsonLd/JsonLd.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Character from "../../components/Character/Character.jsx";

import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = PROJECTS_DATA.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <NotFound isProjectView />
    );
  }

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
        <header className="project-details__header">
          <h1
            className="project-details__title"
            style={{ viewTransitionName: `project-title-${project.id}` }}
          >
            {project.name}
          </h1>
        </header>
        <div className="project-details__content">

        </div>
      </main>
    </>
  );
}

