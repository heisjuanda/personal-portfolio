import { useEffect, useState } from "react";

import DoodleSound from "../../svg/DoodleSound/DoodleSound.jsx";
import PaperContainer from "../PaperContainer/PaperContainer.jsx";
import useSound from "../../hooks/useSound.js";
import { SOUND_HINT_DELAY, SOUND_HINT_DURATION } from "../../constants/constants";

import "./SoundToggle.css";

export default function SoundToggle() {
  const { soundEnabled, hasChosen, toggleSound } = useSound();
  const [isHintVisible, setIsHintVisible] = useState(false);

  useEffect(() => {
    if (hasChosen) {
      setIsHintVisible(false);
      return;
    }

    const showTimer = setTimeout(() => setIsHintVisible(true), SOUND_HINT_DELAY);
    const hideTimer = setTimeout(
      () => setIsHintVisible(false),
      SOUND_HINT_DELAY + SOUND_HINT_DURATION,
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasChosen]);

  return (
    <div className="sound-toggle-wrapper">
      <span
        className={`sound-toggle__hint ${isHintVisible ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        Sound?
      </span>

      <PaperContainer
        className="sound-toggle__paper"
        tearScale={6}
        edgeTearScale={8}
        ruled
      >
        <button
          type="button"
          className="sound-toggle"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? "Sound effects on" : "Sound effects off"}
        >
          <DoodleSound
            className="sound-toggle__icon"
            color="#4a3728"
            isOn={soundEnabled}
          />
        </button>

        <span className="sound-toggle__tape" aria-hidden="true" />
      </PaperContainer>
    </div>
  );
}
