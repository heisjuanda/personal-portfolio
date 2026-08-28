import { useEffect, useState } from "react";

import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import useAnalyticsConsent from "../../hooks/useAnalyticsConsent.js";
import { isAnalyticsConfigured } from "../../utils/analyticsConsent.js";
import {
  CONSENT_NOTICE_DELAY,
  CONSENT_NOTICE_EXIT,
} from "../../constants/constants";

import "./ConsentNotice.css";

const PHASE = {
  HIDDEN: "hidden",
  SHOWN: "shown",
  LEAVING: "leaving",
  GONE: "gone",
};

export default function ConsentNotice() {
  const { hasChosen, acceptAnalytics, rejectAnalytics } = useAnalyticsConsent();
  const [phase, setPhase] = useState(PHASE.HIDDEN);

  useEffect(() => {
    if (hasChosen) return;

    // Nothing to ask when no GA4 id is configured. Dev is exempt so the notice
    // can still be worked on locally, where analytics is switched off.
    if (!isAnalyticsConfigured() && !import.meta.env.DEV) return;

    const reveal = () => {
      setPhase((current) => (current === PHASE.HIDDEN ? PHASE.SHOWN : current));
    };

    // Same trigger as the tag's own lazy loader: the notice arrives once the
    // visitor starts moving through the page, never on top of the hero.
    window.addEventListener("scroll", reveal, { passive: true, once: true });
    const fallbackTimer = setTimeout(reveal, CONSENT_NOTICE_DELAY);

    return () => {
      window.removeEventListener("scroll", reveal);
      clearTimeout(fallbackTimer);
    };
  }, [hasChosen]);

  const handleChoice = (applyChoice) => {
    // The choice takes effect right away; the sheet just takes a moment to go.
    applyChoice();
    setPhase(PHASE.LEAVING);
    setTimeout(() => setPhase(PHASE.GONE), CONSENT_NOTICE_EXIT);
  };

  if (phase === PHASE.HIDDEN || phase === PHASE.GONE) return null;

  return (
    <section
      className={`consent-notice consent-notice--${phase}`}
      role="region"
      aria-label="Analytics consent"
    >
      <PaperContainer
        className="consent-notice__paper"
        tearScale={10}
        edgeTearScale={13}
      >
        <span className="consent-notice__tape" aria-hidden="true" />

        {/* A paragraph rather than a heading: the notice must not add a section
            to the document outline crawlers read. */}
        <p className="consent-notice__title">Before you look around</p>
        <p className="consent-notice__text">
          I use Google Analytics to count visits and see which projects people
          actually open. No ads and no profiles, and nothing is stored on your
          device unless you say yes.
        </p>

        {/* "No" comes first in the DOM on purpose: tab order follows the DOM,
            so the first keyboard stop is the answer that keeps consent denied,
            while "Yes" sits where the eye finishes reading. The aria-labels
            each contain their visible word, so the buttons still describe
            themselves out of context. */}
        <div className="consent-notice__actions">
          <button
            type="button"
            className="tape-button consent-notice__btn consent-notice__btn--decline"
            onClick={() => handleChoice(rejectAnalytics)}
            aria-label="No, do not allow analytics"
          >
            No
          </button>
          <button
            type="button"
            className="tape-button consent-notice__btn"
            onClick={() => handleChoice(acceptAnalytics)}
            aria-label="Yes, allow analytics"
          >
            Yes
          </button>
        </div>
      </PaperContainer>
    </section>
  );
}
