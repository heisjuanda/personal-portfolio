import { useCallback, useSyncExternalStore } from "react";

import {
  hasChosenSoundPreference,
  isSoundEnabled,
  setSoundEnabled,
  subscribeToSound,
} from "../utils/soundManager.js";

const getDisabledSnapshot = () => false;

export default function useSound() {
  const soundEnabled = useSyncExternalStore(
    subscribeToSound,
    isSoundEnabled,
    getDisabledSnapshot,
  );
  const hasChosen = useSyncExternalStore(
    subscribeToSound,
    hasChosenSoundPreference,
    getDisabledSnapshot,
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled(!isSoundEnabled());
  }, []);

  return { soundEnabled, hasChosen, toggleSound };
}
