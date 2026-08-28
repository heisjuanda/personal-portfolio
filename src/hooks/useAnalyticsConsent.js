import { useCallback, useSyncExternalStore } from "react";

import {
  DENIED,
  GRANTED,
  hasChosenConsent,
  setConsentChoice,
  subscribeToConsent,
} from "../utils/analyticsConsent.js";

const getChosenServerSnapshot = () => true;

export default function useAnalyticsConsent() {
  const hasChosen = useSyncExternalStore(
    subscribeToConsent,
    hasChosenConsent,
    getChosenServerSnapshot,
  );

  const acceptAnalytics = useCallback(() => setConsentChoice(GRANTED), []);
  const rejectAnalytics = useCallback(() => setConsentChoice(DENIED), []);

  return { hasChosen, acceptAnalytics, rejectAnalytics };
}
