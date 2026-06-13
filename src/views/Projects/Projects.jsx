import "./Projects.css";

export default function Projects() {

    const projects = [
        {
            name: "Josh Wood Colour",
            description: "Description of Project 1",
            image: "images/projects/jwc_main.webp",
        },
    ];
  return (
    <section className="projects">
        {projects.map((project) => (
            <div key={project.name}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <img src={project.image} alt={project.name} />
            </div>
        ))}
    </section>
  );
}