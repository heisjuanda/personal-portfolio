import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { PX_PER_HOP, FACING, DIRECTION, CHARACTER_IMAGES } from "../../constants/constants";
import "./Character.css";

export default function Character({ direction, scrollY }) {
  const hopperRef = useRef(null);
  const shadowRef = useRef(null);
  const prevScrollY = useRef(0);
  const accumRef = useRef(0);
  const hopTimeline = useRef(null);
  const [facing, setFacing] = useState(FACING.FRONT);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setFacing(direction === DIRECTION.FORWARD ? FACING.FRONT : FACING.BACK);
  }, [direction]);

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
    if (!hopper || !shadow) return;

    if (isFirstRender.current) {
      prevScrollY.current = scrollY;
      isFirstRender.current = false;
      return;
    }

    const rawDelta = Math.abs(scrollY - prevScrollY.current);
    prevScrollY.current = scrollY;

    if (rawDelta === 0) return;

    if (rawDelta < 0.5) {
      accumRef.current = 0;
      return;
    }

    accumRef.current += rawDelta;

    if (hopTimeline.current?.isActive()) {
      accumRef.current = Math.min(accumRef.current, PX_PER_HOP * 2);
      return;
    }

    if (accumRef.current >= PX_PER_HOP) {
      const tl = gsap.timeline({
        onComplete: () => {
          hopTimeline.current = null;
        },
      });

      hopTimeline.current = tl;

      appendHop(tl, hopper, shadow);
      accumRef.current -= PX_PER_HOP;
    }
  }, [scrollY]);

  return (
    <div className="character-wrapper">
      <div className="character-hopper" ref={hopperRef}>
        <div
          className={`character-flipper ${facing === FACING.BACK ? "character-flipper--back" : ""}`}
        >
          <img
            loading="eager"
            src={CHARACTER_IMAGES.FRONT}
            alt="Character front"
            className="character__img character__img--front"
            draggable={false}
          />
          <img
            loading="eager"
            src={CHARACTER_IMAGES.BACK}
            alt="Character back"
            className="character__img character__img--back"
            draggable={false}
          />
        </div>
      </div>

      <div className="character-shadow" ref={shadowRef} />
    </div>
  );
}
