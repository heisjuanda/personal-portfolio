import { useEffect, useState } from "react";

import { SCROLL_TIP_THRESHOLD } from "../../constants/constants";

import "./ScrollTip.css";

export default function ScrollTip({ scrollY }) {
  const chevronDownIcon = "/icons/chevron.webp";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      if (scrollY <= SCROLL_TIP_THRESHOLD) {
        setIsVisible(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [scrollY]);

  return (
    <div className={`scroll-down-wrapper ${isVisible ? "visible" : "hidden"}`}>
      <p>Scroll down</p>
      <img src={chevronDownIcon} alt="Scroll down" loading="lazy" />
      <img src={chevronDownIcon} alt="Scroll down" loading="lazy" />
    </div>
  );
}
