import { useEffect, useRef, useState } from "react";

import useReducedMotion from "../../hooks/useReducedMotion.js";

export default function useRevealOnView(threshold = 0.35) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  return [ref, revealed];
}
