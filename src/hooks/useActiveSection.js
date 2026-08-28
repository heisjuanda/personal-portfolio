import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Id of the section currently crossing the middle of the viewport. Keeps the
 * last one while the visitor is between sections, so the indicator never
 * blanks out over a separator.
 *
 * `sectionIds` must be a stable reference (see NAV_SECTION_IDS).
 */
export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const triggers = sectionIds
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

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [sectionIds]);

  return activeSection;
}
