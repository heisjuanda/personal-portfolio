import SmoothScroll from "../../components/SmoothScroll/SmoothScroll.jsx";
import Title from "../../components/Title/Title.jsx";
import Character from "../../components/Character/Character.jsx";
import ScrollTip from "../../components/ScrollTip/ScrollTip.jsx";
import About from "../About/About.jsx";
import Projects from "../Projects/Projects.jsx";
import Contact from "../Contact/Contact.jsx";
import PaperContainer from "../../components/PaperContainer/PaperContainer.jsx";
import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import JsonLd from "../../components/JsonLd/JsonLd.jsx";
import PlanePaper from "../../components/PlanePaper/PlanePaper.jsx";
import { getSeoForPath } from "../../routes.seo.js";

const homeSeo = getSeoForPath("/");

export default function Home() {
  return (
    <>
      <SEOHead
        description={homeSeo.description}
        canonical={homeSeo.canonicalPath}
      />
      <JsonLd data={homeSeo.jsonLd} />
      <SmoothScroll />
      <PlanePaper />
      <main id="main-content">
        <Title />
        <ScrollTip />
        <Character />
        <PaperContainer className="section-separator" />
        <About />
        <PaperContainer className="section-separator" />
        <Projects />
        <PaperContainer className="section-separator" />
        <Contact />
      </main>
    </>
  );
}

