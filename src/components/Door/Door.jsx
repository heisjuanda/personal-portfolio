import React, { useState, useEffect, useRef } from "react";

import PaperContainer from "../PaperContainer/PaperContainer.jsx";

import { DOOR_MARGIN } from '../../constants/constants';
import "./Door.css";

export default function Door({ scrollY, openImage, closedImage, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const doorRef = useRef(null);

  useEffect(() => {
    if (doorRef.current) {
      const rect = doorRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      if (
        rect.top < viewportCenter + DOOR_MARGIN &&
        rect.bottom > viewportCenter - DOOR_MARGIN
      ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }

      if ((rect.bottom) < viewportCenter) {
        setIsPassed(true);
      } else {
        setIsPassed(false);
      }
    }
  }, [scrollY]);

  return (
    <div
      ref={doorRef}
      className={`door-wrapper ${isOpen ? "is-open" : "is-closed"} ${
        isPassed ? "is-passed" : "is-approaching"
      }`}
    >
      <PaperContainer className="door__paper-container">
        {label && <div className="door-label">{label}</div>}
      </PaperContainer>
      <div className="door-frame">
        {openImage && closedImage ? (
          <img
            src={isOpen ? openImage : closedImage}
            alt="Door"
            className="door-image"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="door-placeholder">
            <div className="door-panel"></div>
          </div>
        )}
      </div>
    </div>
  );
}
