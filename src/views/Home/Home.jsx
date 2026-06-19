import SmoothScroll from "../../components/SmoothScroll/SmoothScroll.jsx";
import Title from "../../components/Title/Title.jsx";
import Character from "../../components/Character/Character.jsx";
import ScrollTip from "../../components/ScrollTip/ScrollTip.jsx";
import About from "../About/About.jsx";
import Projects from "../Projects/Projects.jsx";
import Contact from "../Contact/Contact.jsx";
import PaperContainer from "../../components/PaperContainer/PaperContainer.jsx";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Title />
      <ScrollTip />
      <Character />
      <PaperContainer className="section-separator" />
      <About />
      <PaperContainer className="section-separator" />
      <Projects />
      <PaperContainer className="section-separator" />
      <Contact />
    </>
  );
}
