const FALLBACK_STORAGE_KEY = "juanda:analytics-consent";

export const GRANTED = "granted";
export const DENIED = "denied";

const listeners = new Set();

function getBridge() {
  if (typeof window === "undefined") return null;
  return window.__analyticsConsent ?? null;
}

function getStorageKey() {
  return getBridge()?.storageKey ?? FALLBACK_STORAGE_KEY;
}

function readStoredChoice() {
  const bridge = getBridge();
  if (bridge) return bridge.stored ?? null;

  // The inline bootstrap in index.html normally reads this first. Falling back
  // keeps the component working if the head script ever fails to run.
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(FALLBACK_STORAGE_KEY);
  } catch {
    return null;
  }
}

let choice = readStoredChoice();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getConsentChoice() {
  return choice;
}

export function hasChosenConsent() {
  return choice === GRANTED || choice === DENIED;
}

/** False when no GA4 id is configured, so the notice has nothing to ask about. */
export function isAnalyticsConfigured() {
  return getBridge()?.isConfigured === true;
}

export function subscribeToConsent(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setConsentChoice(next) {
  if (next !== GRANTED && next !== DENIED) return;

  choice = next;

  const bridge = getBridge();
  if (bridge) bridge.stored = next;

  try {
    window.localStorage.setItem(getStorageKey(), next);
  } catch {
    // Choice is lost on reload, but it still applies for this session.
  }

  // Consent Mode is updated before anything else, so a "denied" answer takes
  // effect even if the write above failed.
  bridge?.update(next === GRANTED);

  notify();
}
