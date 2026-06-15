import { useRef, useEffect } from "react";
import PaperContainer from "../PaperContainer/PaperContainer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectCard.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const realImageRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !realImageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        realImageRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="project-spec-row">
      <div className="project-spec-row__visual">
        <div className="blueprint-card__scanner-zone">
          <img
            src="images/pin.webp"
            alt="Pin"
            className="blueprint-card__pin"
            loading="lazy"
            draggable={false}
          />
          <img
            src={project.realSrc}
            alt={project.name}
            className="blueprint-card__img blueprint-card__img--sketch"
            draggable={false}
            loading="lazy"
          />

          <img
            ref={realImageRef}
            src={project.blueprintSrc}
            alt={project.name}
            className="blueprint-card__img blueprint-card__img--real"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>

      <div className="project-spec-row__details">
        <h3 className="project-spec-row__title">{project.name}</h3>
        <PaperContainer className="project-spec-row__description-container">
          <p className="project-spec-row__description">{project.description}</p>
        </PaperContainer>
      </div>
    </div>
  );
}
