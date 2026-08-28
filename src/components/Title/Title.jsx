import { useEffect, useRef } from "react";
import gsap from "gsap";

import PaperContainer from "../PaperContainer/PaperContainer";
import useReducedMotion from "../../hooks/useReducedMotion.js";

import "./Title.css";

export default function Title() {
  const imgWrapperRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = imgWrapperRef.current;
    if (!wrapper) return;

    const juandaImg = wrapper.querySelector(".title__img--juanda");
    const adventureImg = wrapper.querySelector(".title__img--adventure");

    // Land on the resting pose directly: no zoom-in, and no "is-idle" class so
    // the floating loop never starts.
    if (reducedMotion) {
      gsap.set(juandaImg, { opacity: 1, scale: 1, rotation: -1 });
      gsap.set(adventureImg, { opacity: 1, scale: 1, rotation: 1 });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        wrapper.classList.add("is-idle");
      }
    });

    gsap.set([juandaImg, adventureImg], { opacity: 0 });

    tl.fromTo(
      juandaImg,
      { scale: 2.5, rotation: -25, opacity: 0 },
      { scale: 1, rotation: -1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }
    ).fromTo(
      adventureImg,
      { scale: 2.5, rotation: 25, opacity: 0 },
      { scale: 1, rotation: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" },
      "-=0.25"
    );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section className="title">
      <div className="title__scraps" aria-hidden="true">
        <span className="title__scrap title__scrap--tape-l" />
        <span className="title__scrap title__scrap--paper-l" />
        <span className="title__scrap title__scrap--map-r" />
        <span className="title__scrap title__scrap--tape-r" />
        <span className="title__scrap title__scrap--stamp" />
      </div>
      <h1 className="title__text sr-only">
        Juan David Moreno | Software Engineer &amp; Creative Developer
      </h1>
      <div className="subtitle__text-wrapper">
        <a
          href="https://github.com/heisjuanda"
          target="_blank"
          rel="noopener noreferrer"
          className="subtitle__handle tape-button"
          aria-label="Juan David Moreno on GitHub (opens in new tab)"
        >
          @heisjuanda
        </a>
        <PaperContainer className="subtitle__year">
          <p>
            @{new Date().getFullYear()}
          </p>
        </PaperContainer>
      </div>
      <div className="title__img-wrapper" ref={imgWrapperRef}>
        <picture>
          <source media="(max-width: 550px)" srcSet="/images/title/juanda's--mobile.avif" />
          <img
            className="title__img title__img--juanda"
            src="/images/title/juanda's.avif"
            alt="Juanda's paper collage style title"
            aria-label="Juanda's"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <picture>
          <source media="(max-width: 550px)" srcSet="/images/title/adventure--mobile.avif" />
          <img
            className="title__img title__img--adventure"
            src="/images/title/adventure.avif"
            alt="Adventure paper collage style title"
            aria-label="Adventure"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>
    </section>
  );
}
