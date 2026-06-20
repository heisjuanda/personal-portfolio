import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";

import { PROJECTS_DATA } from "../data/projects.data.js";

import "./Projects.css";

export default function Projects() {
  return (
    <section className="projects blueprint-bg" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="sr-only">Projects</h2>
      {PROJECTS_DATA.map((project) => (
        <ProjectCard key={project.id} id={project.id} name={project.name} stack={project.stack} realSrc={project.realSrc} blueprintSrc={project.blueprintSrc} />
      ))}
    </section>
  );
}

