import { useState } from "react";

import AnimatedElement from "../../components/AnimatedElement/AnimatedElement.jsx";
import Door from "../../components/Door/Door.jsx";
import AnimatedPaper from "../../components/AnimatedPaper/AnimatedPaper.jsx";

import { SIDE } from "../../constants/constants";

import "./About.css";

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
    experience: [
      {
        company: "Truora (Current)",
        achievement:
          "Cut manual review time from 60s to 30s without sacrificing quality.",
      },
      {
        company: "Cressco",
        achievement:
          "Added autosave to critical care-record forms, reducing manual re-entry, preventing data loss, and improving documentation efficiency for staff.",
      },
    ],
  },
  chair: {
    title: "ReMote headquarters",
    content:
      "A great setup and a good cup of coffee are my foundation for high performance. I thrive in remote environments because they allow me to seamlessly switch between team syncs and intense focus blocks. I believe in engineering clean, simple, and minimalist solutions for complex problems.",
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

export default function About({ scrollY }) {
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const [paperContent, setPaperContent] = useState(null);

  const laptopValue = "laptop";
  const chairValue = "chair";
  const globeValue = "globe";
  const gymValue = "gym";

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

  const getPaperContent = (value) => {
    return (
      <div className="about__paper-content">
        <h3 className="about__paper-title">{value.title}</h3>
        <p className="about__paper-text">{value.content}</p>
        {value.experience && (
          <div className="paper-modal__experience-section">
            <h4 className="paper-modal__experience-title">AchieveMents:</h4>

            {value.experience.map((work, index) => (
              <div key={index} className="paper-modal__work-item">
                <span className="paper-modal__company-name">
                  {work.company}
                </span>
                <p className="paper-modal__achievement-text">
                  <span>•</span> {work.achievement}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="about">
      <AnimatedPaper isOpen={isPaperOpen} onClose={handlePaperClose}>
        {paperContent}
      </AnimatedPaper>
      <Door
        scrollY={scrollY}
        label="About Me"
        openImage="images/door_open.webp"
        closedImage="images/door_close.webp"
      />
      <h2 className="about__title" aria-label="About Juan David Moreno Alfonso">
        About Juan David Moreno Alfonso
      </h2>

      <div className="about__sections">
        <section className="about__section about__section--laptop">
          <div className="about__main about__main--left">
            <AnimatedElement
              imageSrc="images/about/laptop.webp"
              alt="Laptop on the desk"
              side={SIDE.LEFT}
              onClick={handlePaperOpen}
              value={laptopValue}
            />
            <img
              className="about__secondary-image"
              src="images/about/desk.webp"
              alt="Laptop on the desk"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className="about__doodles" aria-hidden="true">
            <img
              src="images/about/doodles/doodle_arrow.webp"
              alt="Arrow Doodle Opening the Map"
              className="about__doodle about__doodle--arrow"
              loading="lazy"
              draggable={false}
              aria-hidden="true"
            />
            <h4
              className="about__doodle about__doodle--welcome"
              aria-hidden="true"
            >
              Welcome!!!
            </h4>
            <h4
              className="about__doodle about__doodle--floor-scratch"
              aria-hidden="true"
            >
              My Tech Stack
            </h4>
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
              imageSrc="images/about/chair.webp"
              alt="Chair in the office"
              side={SIDE.RIGHT}
              onClick={handlePaperOpen}
              value={chairValue}
            />
            <img
              className="about__secondary-image"
              src="images/about/rug.webp"
              alt="Chair in the office"
              loading="lazy"
              draggable={false}
            />
          </div>
          <div className="about__window-stack" aria-hidden="true">
            <img
              className="about__window-img"
              src="images/about/window.webp"
              alt=""
              loading="lazy"
              draggable={false}
            />
          </div>
        </section>

        <section className="about__section about__section--globe">
          <div className="about__main about__main--left">
            <AnimatedElement
              imageSrc="images/about/travel.webp"
              alt="Traveling earth globe"
              side={SIDE.LEFT}
              onClick={handlePaperOpen}
              value={globeValue}
            />
          </div>
          <img
            className="about__plane-img"
            src="images/about/plane.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            draggable={false}
          />
        </section>

        <section className="about__section about__section--gym">
          <img
            className="about__polaroid-img"
            src="images/about/polaroid.webp"
            alt="Polaroid of Juanda with his friends"
            aria-hidden="true"
            loading="lazy"
            draggable={false}
          />
          <div className="about__main about__main--right">
            <AnimatedElement
              imageSrc="images/about/gym.webp"
              alt="Gym bell weights"
              side={SIDE.RIGHT}
              onClick={handlePaperOpen}
              value={gymValue}
            />
          </div>
          <img
            className="about__headsets-img"
            src="images/about/headsets.webp"
            alt="Headset"
            aria-hidden="true"
            loading="lazy"
            draggable={false}
          />
        </section>
      </div>

      <Door
        scrollY={scrollY}
        label="Projects"
        openImage="images/door_open.webp"
        closedImage="images/door_close.webp"
      />
    </section>
  );
}
