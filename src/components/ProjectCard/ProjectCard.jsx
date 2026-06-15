import { useRef, useEffect } from "react";

import PaperContainer from "../PaperContainer/PaperContainer";

import "./ProjectCard.css";

export default function ProjectCard({ project, scrollY }) {
  const cardRef = useRef(null);
  const cardTopRef = useRef(null);
  const windowHeightRef = useRef(window.innerHeight);
  const lastWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        cardTopRef.current = rect.top + window.scrollY;
        windowHeightRef.current = window.innerHeight;
      }
    };

    updateDimensions();

    const handleResize = () => {
      if (window.innerWidth !== lastWidthRef.current) {
        lastWidthRef.current = window.innerWidth;
        updateDimensions();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", updateDimensions);

    const timer = setTimeout(updateDimensions, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current || cardTopRef.current === null) return;

    const cardTopRelativeToDocument = cardTopRef.current;
    const winHeight = windowHeightRef.current;

    const startAnimationAt = cardTopRelativeToDocument - winHeight;
    const endAnimationAt = cardTopRelativeToDocument - winHeight / 8;

    const totalDistance = endAnimationAt - startAnimationAt;
    const currentProgress = scrollY - startAnimationAt;

    let percentage = (currentProgress / totalDistance) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    cardRef.current.style.setProperty("--reveal-progress", `${percentage}%`);
  }, [scrollY]);

  return (
    <div ref={cardRef} className="project-spec-row">
      <div className="project-spec-row__visual">
        <div className="blueprint-card__scanner-zone">
          <img
            src={project.realSrc}
            alt={project.name}
            className="blueprint-card__img blueprint-card__img--sketch"
            draggable={false}
            loading="lazy"
          />

          <img
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
