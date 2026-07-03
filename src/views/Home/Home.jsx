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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan David Moreno Alfonso",
  jobTitle: "Software Engineer & Creative Developer",
  url: "https://juandamoreno.dev",
  sameAs: [
    "https://github.com/heisjuanda",
    "https://www.linkedin.com/in/juan-david-moreno-883a46233/",
    "https://www.instagram.com/soyjuandamoreno/",
  ],
  knowsAbout: [
    "React",
    "JavaScript",
    "TypeScript",
    "Python",
    "Kotlin",
    "AWS",
    "Full Stack Development",
    "Frontend Engineering",
    "Motion Design",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Juan David Moreno — Portfolio",
  url: "https://juandamoreno.dev",
  description:
    "Personal portfolio of Juan David Moreno Alfonso, Full Stack Software Engineer & Creative Developer.",
  author: {
    "@type": "Person",
    name: "Juan David Moreno Alfonso",
  },
};

export default function Home() {
  return (
    <>
      <SEOHead
        description="Juan David Moreno is a Full Stack Software Engineer crafting high-performance, beautiful, and interactive web experiences. Currently leading impact at Truora."
        canonical="/"
      />
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
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

