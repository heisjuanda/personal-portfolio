import AnimatedElement from "../../components/AnimatedElement/AnimatedElement.jsx";
import Door from "../../components/Door/Door.jsx";

import { SIDE } from "../../constants/constants";

import "./About.css";

export default function About({ scrollY }) {
  const animatedElements = [
    {
      imageSrc: "images/about/chair.webp",
      alt: "Chair in the office",
      side: SIDE.LEFT,
    },
    {
      imageSrc: "images/about/laptop.webp",
      alt: "Laptop on the desk",
      side: SIDE.RIGHT,
    },
    {
      imageSrc: "images/about/gym.webp",
      alt: "Gym bell weights",
      side: SIDE.LEFT,
    },
    {
      imageSrc: "images/about/travel.webp",
      alt: "Traveling earth globe",
      side: SIDE.RIGHT,
    },
  ];

  return (
    <section className="about">
      <Door
        scrollY={scrollY}
        label="About Me"
        openImage="images/door_open.webp"
        closedImage="images/door_close.webp"
      />
      <h2 className="about__title" aria-label="About Juan David Moreno Alfonso">
        About Juan David Moreno Alfonso
      </h2>
      <div className="about__animated-elements">
        {animatedElements.map((element) => (
          <AnimatedElement
            key={element.alt}
            imageSrc={element.imageSrc}
            alt={element.alt}
            side={element.side}
          />
        ))}
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
