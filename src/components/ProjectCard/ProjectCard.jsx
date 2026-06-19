import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PaperContainer from "../PaperContainer/PaperContainer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectCard.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ id, name, stack, realSrc, blueprintSrc }) {
  const cardRef = useRef(null);
  const realImageRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !realImageRef.current || !revealRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(revealRef.current, { yPercent: -100 });
      gsap.set(realImageRef.current, { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      tl.to(revealRef.current, { yPercent: 0, ease: "none" }, 0).to(
        realImageRef.current,
        { yPercent: 0, ease: "none" },
        0,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="project-spec-row">
      <div className="project-spec-row__visual">
        <Link to={`/projects/${id}`} viewTransition className="project-spec-row__visual-link">
          <div className="blueprint-card__scanner-zone">
            <img
              src="images/pin.webp"
              alt="Pin"
              className="blueprint-card__pin"
              loading="lazy"
              draggable={false}
            />
            <img
              src={realSrc}
              alt={name}
              className="blueprint-card__img blueprint-card__img--sketch"
              draggable={false}
              loading="lazy"
            />

            <div ref={revealRef} className="blueprint-card__reveal">
              <img
                ref={realImageRef}
                src={blueprintSrc}
                alt={name}
                className="blueprint-card__img blueprint-card__img--real"
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="project-spec-row__details">
        <h3 className="project-spec-row__title" style={{ viewTransitionName: `project-title-${id}` }}>
          {name}
        </h3>
        <PaperContainer className="project-spec-row__description-container">
          <p className="project-spec-row__description">{stack}</p>
        </PaperContainer>
      </div>
    </div>
  );
}

