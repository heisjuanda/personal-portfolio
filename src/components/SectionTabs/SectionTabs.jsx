import { useEffect, useState } from "react";

import useActiveSection from "../../hooks/useActiveSection.js";
import { NAV_ITEMS, NAV_SECTION_IDS } from "../../constants/nav.js";
import { scrollToSection } from "../../utils/smoothScroll.js";
import { NAV_PEEK_DELAY, NAV_PEEK_DURATION } from "../../constants/constants";

import "./SectionTabs.css";

const REVEAL_RATIO = 0.6;

export default function SectionTabs() {
  const activeSection = useActiveSection(NAV_SECTION_IDS);
  const [isVisible, setIsVisible] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);

  useEffect(() => {
    const update = () => {
      const shouldShow = window.scrollY > window.innerHeight * REVEAL_RATIO;
      setIsVisible((current) => (current === shouldShow ? current : shouldShow));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const showTimer = setTimeout(() => setIsPeeking(true), NAV_PEEK_DELAY);
    const hideTimer = setTimeout(
      () => setIsPeeking(false),
      NAV_PEEK_DELAY + NAV_PEEK_DURATION,
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible]);

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav
      className={`section-tabs ${isVisible ? "is-visible" : ""} ${isPeeking ? "is-peeking" : ""}`}
      aria-label="Sections"
    >
      <ul className="section-tabs__list">
        {NAV_ITEMS.map((item) => {
          const isActive = item.sectionId === activeSection;
          const Icon = item.Icon;

          return (
            <li
              key={item.key}
              className={`section-tabs__item section-tabs__item--${item.color}`}
            >
              <a
                className={`section-tab ${isActive ? "is-active" : ""}`}
                href={item.href ?? `#${item.sectionId}`}
                onClick={
                  item.sectionId
                    ? (event) => handleSectionClick(event, item.sectionId)
                    : undefined
                }
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noopener noreferrer" : undefined}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="section-tab__label">
                  {item.label}
                  {item.href && <span aria-hidden="true"> &#8599;</span>}
                </span>
                <Icon className="section-tab__icon" />

                <span className="section-tab__glue" aria-hidden="true" />
                <span className="section-tab__curl" aria-hidden="true" />

                <img
                  className="section-tab__pin"
                  src="/images/pin.avif"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  draggable={false}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
