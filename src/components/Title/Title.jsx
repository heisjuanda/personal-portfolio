import { useEffect, useRef } from "react";
import gsap from "gsap";

import "./Title.css";

export default function Title() {
  const imgWrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = imgWrapperRef.current;
    if (!wrapper) return;

    const juandaImg = wrapper.querySelector(".title__img--juanda");
    const adventureImg = wrapper.querySelector(".title__img--adventure");

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
  }, []);

  return (
    <section className="title">
      <h1 className="title__text">
        <span>Juanda's</span>
        <span>Adventure</span>
      </h1>
      <div className="subtitle__text-wrapper">
        <p className="subtitle__handle">
          <a href="https://github.com/heisjuanda" target="_blank" rel="noopener noreferrer">
            @heisjuanda
          </a>
        </p>
        <p className="subtitle__year">
          @{new Date().getFullYear()}
        </p>
      </div>
      <div className="title__img-wrapper" ref={imgWrapperRef}>
        <img
          className="title__img title__img--juanda"
          src="images/title/juanda's.webp"
          alt="Juanda's paper collage style title"
          aria-label="Juanda's"
          loading="eager"
          fetchpriority="high"
        />
        <img
          className="title__img title__img--adventure"
          src="images/title/adventure.webp"
          alt="Adventure paper collage style title"
          aria-label="Adventure"
          loading="eager"
          fetchpriority="high"
        />
      </div>
    </section>
  );
}
