let activeLenis = null;

export function registerSmoothScroll(instance) {
  activeLenis = instance;

  return () => {
    if (activeLenis === instance) activeLenis = null;
  };
}

export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true, force: true });
    return;
  }

  window.scrollTo(0, 0);
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
