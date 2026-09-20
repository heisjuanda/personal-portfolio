import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";

import { PROJECTS_DATA } from "../data/projects.data.js";

import "./Projects.css";

const ORDERED_PROJECTS = [...PROJECTS_DATA].sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99),
);

export default function Projects() {
  return (
    <section className="projects blueprint-bg" id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="sr-only">Projects</h2>
      {ORDERED_PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          hook={project.hook}
          stack={project.stack}
          realSrc={project.realSrc}
          blueprintSrc={project.blueprintSrc}
        />
      ))}
    </section>
  );
}

