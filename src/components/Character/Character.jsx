import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PX_PER_HOP, CHARACTER_IMAGES } from "../../constants/constants";
import "./Character.css";

gsap.registerPlugin(ScrollTrigger);

export default function Character() {
  const hopperRef = useRef(null);
  const shadowRef = useRef(null);
  const flipperRef = useRef(null);
  const hopTimeline = useRef(null);

  const appendHop = (tl, hopper, shadow) => {
    tl.to(hopper, {
      y: -20,
      scaleY: 1.1,
      scaleX: 0.92,
      duration: 0.12,
      ease: "power2.out",
    })
      .to(
        shadow,
        { scaleX: 0.55, opacity: 0.15, duration: 0.12, ease: "power2.out" },
        "<",
      )
      .to(hopper, {
        y: 0,
        scaleY: 0.88,
        scaleX: 1.1,
        duration: 0.1,
        ease: "power2.in",
      })
      .to(
        shadow,
        { scaleX: 1.25, opacity: 0.55, duration: 0.1, ease: "power2.in" },
        "<",
      )
      .to(hopper, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.09,
        ease: "elastic.out(1, 0.5)",
      })
      .to(
        shadow,
        { scaleX: 1, opacity: 0.4, duration: 0.09, ease: "power1.out" },
        "<",
      );
  };

  useEffect(() => {
    const hopper = hopperRef.current;
    const shadow = shadowRef.current;
    const flipper = flipperRef.current;
    if (!hopper || !shadow || !flipper) return;

    const tl = gsap.timeline({ paused: true });
    appendHop(tl, hopper, shadow);
    hopTimeline.current = tl;

    let prevScrollY = window.scrollY;
    let accum = 0;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const currentScrollY = self.scroll();
        const rawDelta = Math.abs(currentScrollY - prevScrollY);
        const scrollDirection = self.direction;
        prevScrollY = currentScrollY;

        if (rawDelta === 0) return;

        if (scrollDirection === 1) {
          flipper.classList.remove("character-flipper--back");
        } else if (scrollDirection === -1) {
          flipper.classList.add("character-flipper--back");
        }

        if (rawDelta < 0.5) {
          accum = 0;
          return;
        }

        accum += rawDelta;

        if (tl.isActive()) {
          accum = Math.min(accum, PX_PER_HOP * 2);
          return;
        }

        if (accum >= PX_PER_HOP) {
          tl.restart();
          accum -= PX_PER_HOP;
        }
      },
    });

    return () => {
      trigger.kill();
      if (hopTimeline.current) hopTimeline.current.kill();
    };
  }, []);

  return (
    <div className="character-wrapper">
      <div className="character-hopper" ref={hopperRef}>
        <div ref={flipperRef} className="character-flipper">
          <img
            loading="eager"
            src={CHARACTER_IMAGES.FRONT}
            alt="Character front"
            className="character__img character__img--front"
            draggable={false}
            fetchpriority="high"
          />
          <img
            loading="eager"
            src={CHARACTER_IMAGES.BACK}
            alt="Character back"
            className="character__img character__img--back"
            draggable={false}
            fetchpriority="high"
          />
        </div>
      </div>

      <div className="character-shadow" ref={shadowRef} />
    </div>
  );
}
