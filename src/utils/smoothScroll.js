let activeLenis = null;

/**
 * SmoothScroll owns the Lenis instance; this makes it reachable from the nav.
 * Anchor jumps fight Lenis (the browser jumps, Lenis eases back), so every
 * programmatic scroll has to go through the instance itself.
 */
export function registerSmoothScroll(instance) {
  activeLenis = instance;

  return () => {
    if (activeLenis === instance) activeLenis = null;
  };
}

export function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  if (activeLenis) {
    activeLenis.scrollTo(target, { duration: 1.4 });
    
    return;
  }

  target.scrollIntoView({ behavior: "auto", block: "start" });
}
