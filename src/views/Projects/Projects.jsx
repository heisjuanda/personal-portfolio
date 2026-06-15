import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";

import "./Projects.css";

export default function Projects({ scrollY }) {
  const projects = [
    {
      name: "Josh Wood Colour",
      description: "React • Shopify • Gatsby • E-commerce",
      realSrc: "images/projects/josh_wood_colour.webp",
      blueprintSrc: "images/projects/josh_wood_colour_blueprint.webp",
    },
    {
        name: "Juanda Bot",
        description: "Python • AI Models • Telegram API",
        realSrc: "images/projects/juandabot.webp",
        blueprintSrc: "images/projects/juandabot_blueprint.webp",
    },
    {
        name: "Lambda Lang",
        description: "Dr Racket • Research • Lambda Calculus",
        realSrc: "images/projects/lambda_lang.webp",
        blueprintSrc: "images/projects/lambda_lang_blueprint.webp",
    },
    {
        name: "Patitas a Casa",
        description: "React • PostgreSQL • Tailwind CSS",
        realSrc: "images/projects/patitas_a_casa.webp",
        blueprintSrc: "images/projects/patitas_a_casa_blueprint.webp",
    },
    {
        name: "My Portfolio",
        description: "React • CSS • JavaScript",
        realSrc: "images/projects/portfolio.webp",
        blueprintSrc: "images/projects/portfolio_blueprint.webp",
    },
    {
        name: "My Thesis",
        description: "Fast API • Python • React • Academic Project",
        realSrc: "images/projects/thesis.webp",
        blueprintSrc: "images/projects/thesis_blueprint.webp",
    }
  ];
  return (
    <section className="projects">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} scrollY={scrollY} />
      ))}
    </section>
  );
}
