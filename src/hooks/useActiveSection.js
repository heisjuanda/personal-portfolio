import { useEffect, useState } from "react";

import { loadMotion } from "../utils/loadMotion.js";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let triggers = [];

    loadMotion().then(({ ScrollTrigger }) => {
      if (cancelled) return;

      triggers = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((element) =>
          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(element.id);
            },
          }),
        );
    });

    return () => {
      cancelled = true;
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [sectionIds]);

  return activeSection;
}
