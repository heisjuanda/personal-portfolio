import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { PROJECTS_DATA } from "../data/projects.data.js";
import PaperContainer from "../../components/PaperContainer/PaperContainer.jsx";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = PROJECTS_DATA.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="project-details__error">
        hola
      </div>
    );
  }

  return (
    <main className="project-details">
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
  );
}
