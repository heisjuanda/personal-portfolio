import React, { useState, useEffect, useRef } from "react";

import PaperContainer from "../PaperContainer/PaperContainer.jsx";

import { DOOR_MARGIN } from '../../constants/constants';
import "./Door.css";

export default function Door({ scrollY, openImage, closedImage, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const doorRef = useRef(null);

  const doorTopRef = useRef(null);
  const doorHeightRef = useRef(null);
  const viewportCenterRef = useRef(window.innerHeight / 2);
  const lastWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      if (doorRef.current) {
        const rect = doorRef.current.getBoundingClientRect();
        doorTopRef.current = rect.top + window.scrollY;
        doorHeightRef.current = rect.height;
        viewportCenterRef.current = window.innerHeight / 2;
      }
    };

    updateDimensions();

    const handleResize = () => {
      if (window.innerWidth !== lastWidthRef.current) {
        lastWidthRef.current = window.innerWidth;
        updateDimensions();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", updateDimensions);

    const timer = setTimeout(updateDimensions, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (doorTopRef.current !== null && doorHeightRef.current !== null) {
      const doorTop = doorTopRef.current;
      const doorHeight = doorHeightRef.current;
      const viewportCenter = viewportCenterRef.current;

      const rectTop = doorTop - scrollY;
      const rectBottom = rectTop + doorHeight;

      if (
        rectTop < viewportCenter + DOOR_MARGIN &&
        rectBottom > viewportCenter - DOOR_MARGIN
      ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }

      if (rectBottom < viewportCenter) {
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
            loading="eager"
            width={170}
            height={300}
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
