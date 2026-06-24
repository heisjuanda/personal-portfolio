import { useState, useEffect, useRef } from "react";
import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import "./AnimatedPaper.css";

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export default function AnimatedPaper({ isOpen, onClose, children }) {
  const [step, setStep] = useState(1);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setShouldRender(true);
      setStep(1);

      const frame2 = setTimeout(() => setStep(2), 300);
      const frame3 = setTimeout(() => setStep(3), 500);

      return () => {
        clearTimeout(frame2);
        clearTimeout(frame3);
      };
    } else {
      const closeTimeout = setTimeout(() => {
        setShouldRender(false);
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }, 200);
      return () => clearTimeout(closeTimeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || step < 3 || !modalRef.current) return;

    const focusableEls = modalRef.current.querySelectorAll(FOCUSABLE);
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    if (first) first.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      if (focusableEls.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, onClose]);

  if (!shouldRender) return null;

  const getPaperFrame = () => {
    switch (step) {
      case 1:
        return "images/animatedPaper/frame_01.avif";
      case 2:
        return "images/animatedPaper/frame_02.avif";
      default:
        return "";
    }
  };

  return (
    <div
      className={`paper-overlay ${isOpen ? "is-open" : "is-closing"}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`paper-modal__container step-${step}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Details"
      >
        {getPaperFrame() && (
          <img
            src={getPaperFrame()}
            alt=""
            aria-hidden="true"
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
          <button
            className="paper-modal__close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

