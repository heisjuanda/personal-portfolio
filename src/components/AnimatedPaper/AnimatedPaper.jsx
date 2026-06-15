import { useState, useEffect } from "react";
import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import "./AnimatedPaper.css";

export default function AnimatedPaper({ isOpen, onClose, children }) {
  const [step, setStep] = useState(1);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setStep(1);

      const frame2 = setTimeout(() => setStep(2), 300);
      const frame3 = setTimeout(() => setStep(3), 700);

      return () => {
        clearTimeout(frame2);
        clearTimeout(frame3);
      };
    } else {
      const closeTimeout = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(closeTimeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const getPaperFrame = () => {
    switch (step) {
      case 1:
        return "images/animatedPaper/frame_01.webp";
      case 2:
        return "images/animatedPaper/frame_02.webp";
      default:
        return "";
    }
  };

  return (
    <div
      className={`paper-overlay ${isOpen ? "is-open" : "is-closing"}`}
      onClick={onClose}
    >
      <div
        className={`paper-modal__container step-${step}`}
        onClick={(e) => e.stopPropagation()}
      >
        {getPaperFrame() && (
          <img
            src={getPaperFrame()}
            alt="Paper frame animation"
            className="paper-modal__frame"
            draggable={false}
            loading="eager"
          />
        )}

        {step === 3 && (
          <div className="paper-modal__inner-content">
            <PaperContainer className="paper-modal__paper">
              {children}
            </PaperContainer>
          </div>
        )}

        {step === 3 && (
          <button className="paper-modal__close-btn" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}
