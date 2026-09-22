import { useEffect, useRef } from "react";

import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import { SCROLL_TIP_DELAY, SCROLL_TIP_THRESHOLD } from "../../constants/constants";
import { loadMotion } from "../../utils/loadMotion.js";
import "./ScrollTip.css";

export default function ScrollTip() {
  const chevronDownIcon = "/icons/chevron.webp";
  const wrapperRef = useRef(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    let timer = null;
    let isElementVisible = false;

    const hideTip = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (isElementVisible) {
        element.classList.add("hidden");
        element.classList.remove("visible");
        isElementVisible = false;
      }
    };

    const startIdleTimer = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        if (!isElementVisible) {
          element.classList.add("visible");
          element.classList.remove("hidden");
          isElementVisible = true;
        }
      }, SCROLL_TIP_DELAY);
    };

    if (window.scrollY <= SCROLL_TIP_THRESHOLD) {
      startIdleTimer();
    }

    let cancelled = false;
    let st = null;

    loadMotion().then(({ ScrollTrigger }) => {
      if (cancelled) return;

      st = ScrollTrigger.create({
        onUpdate: (self) => {
          const currentScroll = self.scroll();

          if (currentScroll > SCROLL_TIP_THRESHOLD) {
            hideTip();
          } else {
            hideTip();
            startIdleTimer();
          }
        },
      });
    });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      st?.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="scroll-down-wrapper hidden">
      <PaperContainer className="scroll-tip__note" tearScale={6} edgeTearScale={8}>
        <span className="scroll-tip__tape" aria-hidden="true" />
        <p className="scroll-tip__text">Scroll down</p>
        <span className="scroll-tip__chevrons" aria-hidden="true">
          <img src={chevronDownIcon} alt="" loading="lazy" width={24} height={24} />
          <img src={chevronDownIcon} alt="" loading="lazy" width={24} height={24} />
        </span>
      </PaperContainer>
    </div>
  );
}
