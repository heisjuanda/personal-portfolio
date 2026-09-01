import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedElement from "../../components/AnimatedElement/AnimatedElement.jsx";
import Door from "../../components/Door/Door.jsx";
import AnimatedPaper from "../../components/AnimatedPaper/AnimatedPaper.jsx";
import DoodleArrow from "../../svg/DoodleArrow/DoodleArrow.jsx";
import DoodlePlane from "../../svg/DoodlePlane/DoodlePlane.jsx";
import DoodleHeadset from "../../svg/DoodleHeadset/DoodleHeadset.jsx";

import PaperContent from "../../components/PaperContent/PaperContent.jsx";

import { PAPER_CONTENT } from "../data/about.data.js";
import { SIDE } from "../../constants/constants";
import useReducedMotion from "../../hooks/useReducedMotion.js";

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

export default function About() {
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const [paperKey, setPaperKey] = useState(null);

  const contentRef = useRef(null);
  const reducedMotion = useReducedMotion();

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
      setPaperKey(value);
    }
    setIsPaperOpen(true);
  };

  const handlePaperClose = () => {
    setIsPaperOpen(false);
  };

  useEffect(() => {
    if (!contentRef.current) return;

    if (reducedMotion) return;

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
  }, [reducedMotion]);

  return (
    <section className="about" id="about" ref={contentRef}>
      <AnimatedPaper
        isOpen={isPaperOpen}
        onClose={handlePaperClose}
        label={paperKey ? PAPER_CONTENT[paperKey].title : undefined}
      >
        {paperKey && <PaperContent entry={PAPER_CONTENT[paperKey]} />}
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
            <PaperContent entry={value} variant="outline" />
          </article>
        ))}
      </div>

      <div className="about__sections">
        <section className="about__section about__section--laptop">
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
              alt=""
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
                alt=""
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
              alt=""
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
              alt=""
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
            alt=""
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
