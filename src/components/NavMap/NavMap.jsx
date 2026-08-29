import { useEffect, useState } from "react";

import AnimatedPaper from "../AnimatedPaper/AnimatedPaper.jsx";
import DoodleTrail from "../../svg/DoodleTrail/DoodleTrail.jsx";
import DoodleCompass from "../../svg/DoodleCompass/DoodleCompass.jsx";
import useActiveSection from "../../hooks/useActiveSection.js";
import { NAV_ITEMS, NAV_SECTION_IDS } from "../../constants/nav.js";
import { scrollToSection } from "../../utils/smoothScroll.js";
import { CHARACTER_IMAGES } from "../../constants/constants";

import "./NavMap.css";

/** Shared coordinate space with DoodleTrail's viewBox. */
const MAP_VIEWBOX = { width: 100, height: 140 };

/**
 * Every stop sits on a point the trail curve is anchored to. `side` keeps the
 * label away from the path instead of across it.
 */
const MAP_STOPS = {
  about: { x: 26, y: 22, side: "right" },
  projects: { x: 72, y: 66, side: "left" },
  contact: { x: 30, y: 112, side: "right" },
};

const REVEAL_RATIO = 0.6;

const toPercent = (value, total) => `${(value / total) * 100}%`;

export default function NavMap() {
  const activeSection = useActiveSection(NAV_SECTION_IDS);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const shouldShow = window.scrollY > window.innerHeight * REVEAL_RATIO;
      setIsVisible((current) => (current === shouldShow ? current : shouldShow));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleStopClick = (event, sectionId) => {
    event.preventDefault();
    // The paper folds away while the page is already travelling.
    setIsOpen(false);
    scrollToSection(sectionId);
  };

  const stopItems = NAV_ITEMS.filter((item) => MAP_STOPS[item.key]);
  const cvItem = NAV_ITEMS.find((item) => item.href);
  const activeStop = activeSection ? MAP_STOPS[activeSection] : null;

  return (
    <>
      <button
        type="button"
        className={`nav-map__trigger ${isVisible ? "is-visible" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Map menu"
      >
        <span className="nav-map__trigger-fold" aria-hidden="true" />
        <DoodleCompass className="nav-map__trigger-compass" />
        <span className="nav-map__trigger-label">Map</span>
      </button>

      <AnimatedPaper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        label="Map menu"
      >
        <div className="nav-map">
          <p className="nav-map__title">where to?</p>

          <div className="nav-map__canvas">
            <DoodleTrail className="nav-map__trail" />

            {stopItems.map((item) => {
              const stop = MAP_STOPS[item.key];
              const Icon = item.Icon;
              const isActive = item.sectionId === activeSection;

              return (
                <a
                  key={item.key}
                  className={`nav-map__stop nav-map__stop--${stop.side} nav-map__stop--${item.color}`}
                  href={`#${item.sectionId}`}
                  onClick={(event) => handleStopClick(event, item.sectionId)}
                  aria-current={isActive ? "location" : undefined}
                  style={{
                    left: toPercent(stop.x, MAP_VIEWBOX.width),
                    top: toPercent(stop.y, MAP_VIEWBOX.height),
                  }}
                >
                  <span className="nav-map__marker">
                    <Icon className="nav-map__icon" />
                  </span>
                  <span className="nav-map__label">{item.label}</span>
                </a>
              );
            })}

            {activeStop && (
              <img
                className="nav-map__character"
                src={CHARACTER_IMAGES.FRONT}
                alt=""
                aria-hidden="true"
                draggable={false}
                style={{
                  left: toPercent(activeStop.x, MAP_VIEWBOX.width),
                  top: toPercent(activeStop.y, MAP_VIEWBOX.height),
                }}
              />
            )}
          </div>

          {cvItem && (
            <a
              className="nav-map__cv"
              href={cvItem.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <cvItem.Icon className="nav-map__cv-icon" />
              <span>
                {cvItem.label}
                <span aria-hidden="true"> &#8599;</span>
              </span>
            </a>
          )}
        </div>
      </AnimatedPaper>
    </>
  );
}
