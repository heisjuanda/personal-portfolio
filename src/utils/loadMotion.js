let motionPromise = null;

export function loadMotion() {
  motionPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
    const gsap = gsapModule.gsap ?? gsapModule.default;
    const { ScrollTrigger } = scrollTriggerModule;
    const Lenis = lenisModule.default ?? lenisModule.Lenis;

    gsap.registerPlugin(ScrollTrigger);

    return { gsap, ScrollTrigger, Lenis };
  });

  return motionPromise;
}
