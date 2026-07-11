import { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AnimatedElement from "../../components/AnimatedElement/AnimatedElement.jsx";
import Door from "../../components/Door/Door.jsx";
import AnimatedPaper from "../../components/AnimatedPaper/AnimatedPaper.jsx";

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
      "With +4 years of experience in the field, React is my ultimate playground for building dynamic front-end interfaces. I'm a versatile team player who loves collaborating to ship great products, but I'm equally sharp when diving into solo deep-work sessions to architect full-stack solutions and cloud infrastructure.",
  },
  chair: {
    title: "ReMote headquarters",
    content:
      "A great setup and a good cup of coffee are my foundation for high performance. I thrive in remote environments because they allow me to seamlessly switch between team syncs and intense focus blocks. I believe in engineering clean, simple, and minimalist solutions for complex problems.",
  },
  cressco: {
    title: "Cressco",
    content: "Led frontend architecture, technical SEO overhauls, and infrastructure configurations (DNS) to deliver high-performance web applications and seamless deployments.",
    experience: {
      role: "Software Developer",
      achievement: [
        "Developed an autosave feature for Reddocares forms, eliminating data loss and streamlining staff workflows.",
        "Optimized joshwoodcolour.com performance by 20% and enhanced SEO architecture, directly driving an increase in digital sales."
      ],
    }
  },
  truora: {
    title: "Truora (Current)",
    content: "Architecting high-throughput full-stack features and edge computing workflows across AWS infrastructure (Lambda, DynamoDB, CloudFront Functions), while spearheading technical proposals to optimize backend data processing.",
    experience:
    {
      role: "Software Engineer",
      achievement: [
        "Halved manual review time from 60s to 30s while maintaining strict data quality standards.",
        "Enhanced data extraction and validation for Colombian driver's licenses at InDrive, projected to generate $500K in Annual Recurring Revenue (ARR)."
      ],
    },
  },
  globe: {
    title: "waNDerlust & Curiosity",
    content:
      "Exploring new horizons keeps my mind sharp. My journey to Rio de Janeiro, Brazil, has been my farthest and most unforgettable adventure so far—the energy there was unmatched! I bring that same exploratory mindset to software: I'm always curious to learn and adapt to new tech stacks.",
  },
  gym: {
    title: "Consistency & health",
    content:
      "I hit the gym as a commitment to my health and to continuous self-improvement. It's not just about building a better self-image, but also about cultivating the mental stamina and discipline required to tackle long coding sessions. Consistency inside the rack fuels my consistency in the terminal.",
  },
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
      const sections = contentRef.current.querySelectorAll('.about__section');

      sections.forEach((section) => {
        const elements = section.querySelectorAll('.animated-element');
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
        })
          .to(elements, {
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
              {value.experience.achievement.map((achievement, index) => (
                <p key={index} className="paper-modal__achievement-text">
                  <span>•</span> {achievement}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

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

      <div className="about__sections">
        <section className="about__section about__section--laptop" id="main-content">
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
            <img
              src="images/about/doodles/doodle_arrow.avif"
              alt="Arrow Doodle Opening the Map"
              className="about__doodle about__doodle--arrow"
              loading="lazy"
              draggable={false}
              aria-hidden="true"
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
          <img
            className="about__plane-img"
            src="images/about/plane.avif"
            alt="Airplane flying in the sky"
            aria-hidden="true"
            loading="lazy"
            draggable={false}
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
          <img
            className="about__headsets-img"
            src="images/about/headsets.avif"
            alt="Headset"
            aria-hidden="true"
            loading="lazy"
            draggable={false}
          />
          <img
            className="about__doodle-arrow-img"
            src="images/about/doodles/doodle_arrow.avif"
            alt="Doodle Arrow"
            aria-hidden="true"
            loading="lazy"
            draggable={false}
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
