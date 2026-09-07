import { useState, useEffect, useRef } from "react";
import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import useReducedMotion from "../../hooks/useReducedMotion.js";
import { playSound } from "../../utils/soundManager.js";
import "./AnimatedPaper.css";

const FRAME_1 = "images/animatedPaper/frame_01.avif";
const FRAME_2 = "images/animatedPaper/frame_02.avif";

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export default function AnimatedPaper({ isOpen, onClose, children, label = "Details" }) {
  const [step, setStep] = useState(1);
  const [shouldRender, setShouldRender] = useState(isOpen);
  
  const reducedMotion = useReducedMotion();

  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    const img1 = new Image();
    img1.src = FRAME_1;
    const img2 = new Image();
    img2.src = FRAME_2;
  }, []);

  useEffect(() => {
    let frame2Timer, frame3Timer, closeTimer;

    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setShouldRender(true);
      // Skip the paper-unfolding frames and show the note straight away.
      setStep(reducedMotion ? 3 : 1);

      playSound("paper");

      if (!reducedMotion) {
        frame2Timer = setTimeout(() => setStep(2), 300);
        frame3Timer = setTimeout(() => setStep(3), 500);
      }
    } else {
      closeTimer = setTimeout(() => {
        setShouldRender(false);
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
          previousFocusRef.current.focus();
        }
      }, 200);
    }

    return () => {
      clearTimeout(frame2Timer);
      clearTimeout(frame3Timer);
      clearTimeout(closeTimer);
    };
  }, [isOpen, reducedMotion]);

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
    if (step === 1) return FRAME_1;
    if (step === 2) return FRAME_2;
    return "";
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
        aria-label={label}
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
          <>
            <div className="paper-modal__inner-content">
              <PaperContainer className="paper-modal__paper" ruled>
                {children}
              </PaperContainer>
            </div>

            <button
              className="paper-modal__close-btn"
              onClick={onClose}
              aria-label="Close dialog"
              type="button"
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}