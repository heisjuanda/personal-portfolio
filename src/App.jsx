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
      <div className="scroll-world" style={{ height: "500vh" }}></div>
    </>
  );
}
