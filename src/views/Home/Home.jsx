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

const BASE_URL = "https://juandamoreno.dev";
const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Juan David Moreno Alfonso",
      alternateName: [
        "Juan David Moreno",
        "Juanda",
        "heisjuanda",
        "soyjuandamoreno",
      ],
      jobTitle: "Software Engineer & Creative Developer",
      description:
        "Full Stack Software Engineer based in Cali, Colombia, with more than four years of experience building web applications, cloud infrastructure, and reliable user interfaces.",
      url: `${BASE_URL}/`,
      image: `${BASE_URL}/images/og-cover.webp`,
      email: "mailto:heisjuanda@gmail.com",
      nationality: {
        "@type": "Country",
        name: "Colombia",
      },
      homeLocation: {
        "@type": "Place",
        name: "Cali, Colombia",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cali",
          addressRegion: "Valle del Cauca",
          addressCountry: "CO",
        },
      },
      worksFor: {
        "@type": "Organization",
        name: "Truora",
        url: "https://www.truora.com/",
      },
      sameAs: [
        "https://github.com/heisjuanda",
        "https://www.linkedin.com/in/juan-david-moreno-883a46233/",
        "https://www.instagram.com/soyjuandamoreno/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "personal",
        name: "WhatsApp",
        identifier: "@soyjuandamoreno",
        url: "https://wa.me/soyjuandamoreno",
        availableLanguage: ["English", "Spanish"],
      },
      knowsLanguage: ["English", "Spanish"],
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
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Juan David Moreno — Portfolio",
      url: `${BASE_URL}/`,
      description:
        "Personal portfolio of Juan David Moreno Alfonso, a Full Stack Software Engineer and Creative Developer based in Cali, Colombia.",
      inLanguage: "en",
      author: {
        "@id": PERSON_ID,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profile-page`,
      name: "Juan David Moreno — Software Engineer in Colombia",
      url: `${BASE_URL}/`,
      description:
        "Professional profile and portfolio of Juan David Moreno Alfonso.",
      inLanguage: "en",
      dateModified: "2026-08-16",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      mainEntity: {
        "@id": PERSON_ID,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <SEOHead
        description="Juan David Moreno Alfonso (heisjuanda) is a Full Stack Software Engineer at Truora, based in Cali, Colombia, building fast, creative web products worldwide."
        canonical="/"
      />
      <JsonLd data={profileSchema} />
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

