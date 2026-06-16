import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import { PX_PER_HOP, CHARACTER_IMAGES } from "../../constants/constants";
import "./Character.css";

gsap.registerPlugin(ScrollTrigger);

export default function Character() {
  const wrapperRef = useRef(null);
  const hopperRef = useRef(null);
  const shadowRef = useRef(null);
  const flipperRef = useRef(null);
  const isHopping = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const hopper = hopperRef.current;
    const shadow = shadowRef.current;
    const flipper = flipperRef.current;
    if (!wrapper || !hopper || !shadow || !flipper) return;

    const triggerHop = () => {
      if (isHopping.current) return;
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

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const currentScrollY = self.scroll();
        const rawDelta = Math.abs(currentScrollY - prevScrollY);
        const scrollDirection = self.direction;
        prevScrollY = currentScrollY;

        if (idleTimer) clearTimeout(idleTimer);

        gsap.to(wrapper, {
          opacity: 1,
          duration: 0.15,
          overwrite: "auto",
        });

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

        if (isHopping.current) {
          accum = Math.min(accum, PX_PER_HOP * 2);
          return;
        }

        if (accum >= PX_PER_HOP) {
          triggerHop();
          accum -= PX_PER_HOP;
        }

        idleTimer = setTimeout(() => {
          gsap.to(wrapper, {
            opacity: 0.25,
            duration: 0.4,
            ease: "power2.out",
          });
        }, 800);
      },
    });

    return () => {
      trigger.kill();
      hopper.removeEventListener("animationend", onHopEnd);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="character-wrapper">
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
