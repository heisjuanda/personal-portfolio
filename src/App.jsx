import { useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll.jsx";
import Title from "./components/Title/Title.jsx";
import Character from "./components/Character/Character.jsx";
import useScrollDirection from "./hooks/useScrollDirection.js";
import ScrollTip from "./components/ScrollTip/ScrollTip.jsx";
import About from "./views/About/About.jsx";
import Projects from "./views/Projects/Projects.jsx";

import PaperContainer from "./components/PaperContainer/PaperContainer.jsx";
export default function App() {
  const { direction, scrollY } = useScrollDirection({ threshold: 0 });

  useEffect(() => {
    const calculateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    calculateVh();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        calculateVh();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", calculateVh);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", calculateVh);
    };
  }, []);

  return (
    <>
      <SmoothScroll />
      <Title />
      <ScrollTip scrollY={scrollY} />
      <Character direction={direction} scrollY={scrollY} />
      <PaperContainer className="section-separator" />
      <About scrollY={scrollY} />
      <PaperContainer className="section-separator" />
      <Projects scrollY={scrollY} />
      <PaperContainer className="section-separator" />
      <div className="scroll-world" style={{ height: "500vh" }}></div>
    </>
  );
}
