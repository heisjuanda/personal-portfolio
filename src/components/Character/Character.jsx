import { useEffect, useRef } from "react";

import { PX_PER_HOP, CHARACTER_IDLE_DELAY, CHARACTER_IMAGES } from "../../constants/constants";
import useReducedMotion from "../../hooks/useReducedMotion.js";
import "./Character.css";

export default function Character({ isProjectView }) {
  const wrapperRef = useRef(null);
  const hopperRef = useRef(null);
  const shadowRef = useRef(null);
  const flipperRef = useRef(null);
  const isHopping = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const hopper = hopperRef.current;
    const shadow = shadowRef.current;
    const flipper = flipperRef.current;
    if (!wrapper || !hopper || !shadow || !flipper) return;

    const triggerHop = () => {
      if (reducedMotion || isHopping.current) return;
      isHopping.current = true;
      hopper.classList.add("character-hopper--hop");
      shadow.classList.add("character-shadow--hop");
    };

    const onHopEnd = () => {
      isHopping.current = false;
      hopper.classList.remove("character-hopper--hop");
      shadow.classList.remove("character-shadow--hop");
    };

    hopper.addEventListener("animationend", onHopEnd);

    let prevScrollY = window.scrollY;
    let accum = 0;
    let idleTimer = null;

    const NAV_KEYS = new Set([
      "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Spacebar",
    ]);

    const markActive = () => {
      wrapper.classList.remove("character-wrapper--idle");
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        wrapper.classList.add("character-wrapper--idle");
      }, CHARACTER_IDLE_DELAY);
    };

    const onNavKey = (event) => {
      if (NAV_KEYS.has(event.key)) markActive();
    };

    const onScroll = () => {
      markActive();

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - prevScrollY;
      const rawDelta = Math.abs(delta);
      prevScrollY = currentScrollY;

      if (rawDelta === 0) return;

      if (delta > 0) {
        flipper.classList.remove("character-flipper--back");
      } else {
        flipper.classList.add("character-flipper--back");
      }

      if (rawDelta < 0.5) {
        accum = 0;
        return;
      }

      accum += rawDelta;

      if (isHopping.current) {
        accum = Math.min(accum, PX_PER_HOP * 2);
        return;
      }

      if (accum >= PX_PER_HOP) {
        triggerHop();
        accum -= PX_PER_HOP;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", markActive, { passive: true });
    window.addEventListener("touchstart", markActive, { passive: true });
    window.addEventListener("touchmove", markActive, { passive: true });
    window.addEventListener("keydown", onNavKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", markActive);
      window.removeEventListener("touchstart", markActive);
      window.removeEventListener("touchmove", markActive);
      window.removeEventListener("keydown", onNavKey);
      hopper.removeEventListener("animationend", onHopEnd);
      if (idleTimer) clearTimeout(idleTimer);
      wrapper.classList.remove("character-wrapper--idle");
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef} className="character-wrapper">
      <div className="character-hopper" ref={hopperRef}>
        <div ref={flipperRef} className="character-flipper">
          <img
            loading="eager"
            src={isProjectView ? CHARACTER_IMAGES.THINKING_FRONT : CHARACTER_IMAGES.FRONT}
            alt="Character front"
            className="character__img character__img--front"
            draggable={false}
            fetchPriority="high"
          />
          <img
            loading="eager"
            src={isProjectView ? CHARACTER_IMAGES.THINKING_BACK : CHARACTER_IMAGES.BACK}
            alt="Character back"
            className="character__img character__img--back"
            draggable={false}
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="character-shadow" ref={shadowRef} />
    </div>
  );
}
