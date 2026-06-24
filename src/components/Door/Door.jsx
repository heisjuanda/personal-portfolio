import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import { DOOR_MARGIN } from "../../constants/constants";

import "./Door.css";

gsap.registerPlugin(ScrollTrigger);

export default function Door({ openImage, closedImage, label }) {
  const doorRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!doorRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = doorRef.current;
      const img = imageRef.current;

      ScrollTrigger.create({
        trigger: wrapper,
        start: `top center+=${DOOR_MARGIN}`,
        end: `bottom center-=${DOOR_MARGIN}`,
        onToggle: (self) => {
          if (self.isActive) {
            wrapper.classList.add("is-open");
            wrapper.classList.remove("is-closed");
            if (img && openImage) img.src = openImage;
          } else {
            wrapper.classList.add("is-closed");
            wrapper.classList.remove("is-open");
            if (img && closedImage) img.src = closedImage;
          }
        },
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            wrapper.classList.add("is-passed");
            wrapper.classList.remove("is-approaching");
          } else {
            wrapper.classList.add("is-approaching");
            wrapper.classList.remove("is-passed");
          }
        },
      });
    });

    return () => ctx.revert();
  }, [openImage, closedImage]);

  return (
    <div ref={doorRef} className="door-wrapper is-closed is-approaching">
      <PaperContainer className="door__paper-container">
        {label && <div className="door-label">{label}</div>}
      </PaperContainer>

      <div className="door-frame">
        {openImage && closedImage ? (
          <img
            ref={imageRef}
            src={closedImage}
            alt="Door"
            className="door-image"
            draggable={false}
            loading="eager"
            width={170}
            height={300}
          />
        ) : (
          <div className="door-placeholder">
            <div className="door-panel"></div>
          </div>
        )}
      </div>
    </div>
  );
}
