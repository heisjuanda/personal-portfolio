import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL_TIP_THRESHOLD } from "../../constants/constants";
import "./ScrollTip.css";

gsap.registerPlugin(ScrollTrigger);

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
      }, 5000);
    };

    if (window.scrollY <= SCROLL_TIP_THRESHOLD) {
      startIdleTimer();
    }

    const st = ScrollTrigger.create({
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

    return () => {
      if (timer) clearTimeout(timer);
      st.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="scroll-down-wrapper hidden">
      <p>Scroll down</p>
      <img src={chevronDownIcon} alt="Scroll down" loading="lazy" />
      <img src={chevronDownIcon} alt="Scroll down" loading="lazy" />
    </div>
  );
}
