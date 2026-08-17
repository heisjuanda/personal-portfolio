import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedElement from "../../components/AnimatedElement/AnimatedElement.jsx";
import Door from "../../components/Door/Door.jsx";
import AnimatedPaper from "../../components/AnimatedPaper/AnimatedPaper.jsx";
import DoodleArrow from "../../svg/DoodleArrow/DoodleArrow.jsx";
import DoodlePlane from "../../svg/DoodlePlane/DoodlePlane.jsx";
import DoodleHeadset from "../../svg/DoodleHeadset/DoodleHeadset.jsx";

import { SIDE } from "../../constants/constants";

import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const LAPTOP_DECORATIONS = [
  { src: "images/about/aws.webp", top: "5%", left: "20%", rotate: -15 },
  { src: "images/about/terraform.webp", top: "8%", left: "72%", rotate: 18 },
  { src: "images/about/javascript.webp", top: "32%", left: "10%", rotate: -12 },
  { src: "images/about/typescript.webp", top: "55%", left: "12%", rotate: 22 },
  { src: "images/about/react.webp", top: "28%", left: "38%", rotate: 8 },
  { src: "images/about/vue.webp", top: "50%", left: "42%", rotate: -20 },
  { src: "images/about/python.webp", top: "30%", left: "75%", rotate: 14 },
  { src: "images/about/golang.webp", top: "52%", left: "68%", rotate: -10 },
  { src: "images/about/java.webp", top: "42%", left: "90%", rotate: 25 },
  { src: "images/about/android.webp", top: "78%", left: "22%", rotate: -18 },
  { src: "images/about/kotlin.webp", top: "82%", left: "48%", rotate: 12 },
  { src: "images/about/shopify.webp", top: "76%", left: "78%", rotate: -8 },
];

const PAPER_CONTENT = {
  laptop: {
    title: "CoDe & Architecture",
    content:
      "I have +4 years of experience building web apps. I love working with React and creating clear, useful interfaces. I work well in a team, and I also enjoy focused solo work on full-stack features and cloud infrastructure.",
  },
  chair: {
    title: "ReMote headquarters",
    content:
      "I am based in Cali, Colombia, and work with distributed teams worldwide. A good desk setup and a cup of coffee help me switch between team meetings and deep focus time. I aim for clean, simple solutions to complex problems.",
  },
  cressco: {
    title: "Cressco",
    content:
      "I led frontend architecture, SEO improvements, and infrastructure setup (DNS) to ship fast web apps with smooth deployments.",
    experience: {
      role: "Software Developer",
      achievement: [
        "Built an autosave feature for Reddocares forms, so staff no longer lose their work.",
        "Improved joshwoodcolour.com speed by 20% and strengthened SEO, helping digital sales grow.",
      ],
    },
  },
  truora: {
    title: "Truora (Current)",
    content:
      "I build full-stack features and edge workflows on AWS (Lambda, DynamoDB, CloudFront Functions). I also propose ways to make backend data processing faster and more reliable.",
    experience: {
      role: "Software Engineer",
      achievement: [
        "Cut manual review time from 60s to 30s without lowering data quality.",
        "Improved data extraction and validation for Colombian driver's licenses at InDrive, with an expected $500K in Annual Recurring Revenue (ARR).",
      ],
    },
  },
  globe: {
    title: "waNDerlust & Curiosity",
    content:
      "Travel keeps me curious. My trip to Rio de Janeiro, Brazil, was my farthest and most memorable so far. I bring that same curiosity to software—I'm always ready to learn new tools and tech stacks.",
  },
  gym: {
    title: "Consistency & health",
    content:
      "I go to the gym to stay healthy and keep improving. It builds the discipline I need for long coding sessions. Being consistent in training helps me stay consistent at work too.",
  },
};

const getPaperContent = (value) => {
  return (
    <div className="about__paper-content">
      <h3 className="about__paper-title">{value.title}</h3>
      <p className="about__paper-text">{value.content}</p>
      {value.experience && (
        <div className="paper-modal__experience-section">
          <h4 className="paper-modal__experience-title">Achievements:</h4>

          <div className="paper-modal__work-item">
            <span className="paper-modal__role-name">
              {value.experience.role}
            </span>
            {value.experience.achievement.map((achievement) => (
              <p key={achievement} className="paper-modal__achievement-text">
                <span>•</span> {achievement}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function About() {
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const [paperContent, setPaperContent] = useState(null);

  const contentRef = useRef(null);

  const laptopValue = "laptop";
  const chairValue = "chair";
  const globeValue = "globe";
  const gymValue = "gym";
  const truoraValue = "truora";
  const cresscoValue = "cressco";

  const handlePaperOpen = (e) => {
    e.preventDefault();
    const value = e.target.dataset.value;
    if (value) {
      setPaperContent(getPaperContent(PAPER_CONTENT[value]));
    }
    setIsPaperOpen(true);
  };

  const handlePaperClose = () => {
    setIsPaperOpen(false);
  };

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const sections = contentRef.current.querySelectorAll(".about__section");

      sections.forEach((section) => {
        const elements = section.querySelectorAll(".animated-element");
        if (elements.length === 0) return;

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.5,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play pause resume pause",
          },
        });

        tl.to(elements, {
          scale: 1.14,
          rotation: () => (Math.random() - 0.5) * 14,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.1,
        }).to(elements, {
          scale: 1,
          rotation: 0,
          duration: 0.25,
          ease: "back.out(1.7)",
          stagger: 0.08,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={contentRef}>
      <AnimatedPaper isOpen={isPaperOpen} onClose={handlePaperClose}>
        {paperContent}
      </AnimatedPaper>
      <Door
        label="About Me"
        openImage="images/door_open.avif"
        closedImage="images/door_close.avif"
      />
      <h2 className="about__title" aria-label="About Juan David Moreno Alfonso">
        About Juan David Moreno Alfonso
      </h2>

      <div className="sr-only">
        {Object.entries(PAPER_CONTENT).map(([key, value]) => (
          <article key={key} id={`about-${key}`}>
            <h3>{value.title}</h3>
            <p>{value.content}</p>
            {value.experience && (
              <>
                <p>{value.experience.role}</p>
                <h4>Achievements:</h4>
                <ul>
                  {value.experience.achievement.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}
      </div>

      <div className="about__sections">
        <section
          className="about__section about__section--laptop"
          id="main-content"
        >
          <div className="about__main about__main--left">
            <AnimatedElement
              imageSrc="images/about/laptop.avif"
              alt="Laptop on the desk"
              side={SIDE.LEFT}
              onClick={handlePaperOpen}
              value={laptopValue}
            />
            <img
              className="about__secondary-image"
              src="images/about/desk.avif"
              alt="Laptop on the desk"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className="about__doodles" aria-hidden="true">
            <DoodleArrow
              className="about__doodle about__doodle--arrow"
              color="#1e1e1e"
            />
            <span
              className="about__doodle about__doodle--welcome"
              aria-hidden="true"
            >
              Welcome!!!
            </span>
            <span
              className="about__doodle about__doodle--floor-scratch"
              aria-hidden="true"
            >
              My Tech Stack
            </span>
          </div>
          <div className="about__scatter" aria-hidden="true">
            {LAPTOP_DECORATIONS.map((deco) => (
              <img
                key={deco.src}
                src={deco.src}
                alt="Tech Stack Decoration"
                className="about__scatter-img"
                style={{
                  top: deco.top,
                  left: deco.left,
                  transform: `rotate(${deco.rotate}deg)`,
                }}
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </section>

        <section className="about__section about__section--chair">
          <div className="about__main about__main--right">
            <AnimatedElement
              imageSrc="images/about/chair.avif"
              alt="Chair in the office"
              side={SIDE.RIGHT}
              onClick={handlePaperOpen}
              value={chairValue}
            />
            <img
              className="about__secondary-image"
              src="images/about/rug.avif"
              alt="Chair in the office"
              loading="lazy"
              draggable={false}
            />
            <p className="about__job--title" aria-hidden="true">
              Work Experience
            </p>
            <div className="about__job">
              <AnimatedElement
                imageSrc="images/about/cressco_logo.avif"
                alt="Cressco Logo"
                side={SIDE.LEFT}
                onClick={handlePaperOpen}
                value={cresscoValue}
              />
              <AnimatedElement
                imageSrc="images/about/truora_logo.avif"
                alt="Truora Logo"
                side={SIDE.LEFT}
                onClick={handlePaperOpen}
                value={truoraValue}
              />
            </div>
          </div>
          <div className="about__window-stack" aria-hidden="true">
            <img
              className="about__window-img"
              src="images/about/window.avif"
              alt="View from the window draw"
              loading="lazy"
              draggable={false}
            />
          </div>
        </section>

        <section className="about__section about__section--globe">
          <div className="about__main about__main--left">
            <AnimatedElement
              imageSrc="images/about/travel.avif"
              alt="Traveling earth globe"
              side={SIDE.LEFT}
              onClick={handlePaperOpen}
              value={globeValue}
            />
          </div>
          <DoodlePlane
            className="about__plane-img"
            color="#1e1e1e"
          />
        </section>

        <section className="about__section about__section--gym">
          <img
            className="about__polaroid-img"
            src="images/about/polaroid.avif"
            alt="Polaroid of Juanda with his friends"
            aria-hidden="true"
            loading="lazy"
            draggable={false}
          />
          <div className="about__main about__main--right">
            <AnimatedElement
              imageSrc="images/about/gym.avif"
              alt="Gym bell weights"
              side={SIDE.RIGHT}
              onClick={handlePaperOpen}
              value={gymValue}
            />
          </div>
          <DoodleHeadset
            className="about__headsets-img"
            color="#1e1e1e"
          />
          <DoodleArrow
            className="about__doodle-arrow-img"
            color="#1e1e1e"
            width="130px"
          />
        </section>
      </div>

      <Door
        label="Projects"
        openImage="images/door_open.avif"
        closedImage="images/door_close.avif"
      />
    </section>
  );
}
