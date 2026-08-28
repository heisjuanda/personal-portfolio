const STORAGE_KEY = "juanda:sound-enabled";

const CLIPS = {
  activated: { src: "/sounds/Activated.webm", volume: 0.5 },
  door: { src: "/sounds/Door.webm", volume: 0.4 },
  paper: { src: "/sounds/Paper.webm", volume: 0.5 },
};

/** Played as feedback the moment sound is switched on. */
const CONFIRMATION_CLIP = "activated";

const listeners = new Set();
const audioClips = new Map();

function readStoredPreference() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

const storedPreference = readStoredPreference();

let soundEnabled = storedPreference === "true";
let hasChosen = storedPreference !== null;

function notify() {
  listeners.forEach((listener) => listener());
}

function getClip(key) {
  if (audioClips.has(key)) return audioClips.get(key);

  const clip = CLIPS[key];
  if (!clip) return null;

  const audio = new Audio(clip.src);
  audio.preload = "auto";
  audio.volume = clip.volume;
  audioClips.set(key, audio);

  return audio;
}

function unlock(key) {
  const audio = getClip(key);
  if (!audio) return;

  const originalVolume = audio.volume;
  audio.volume = 0;

  const reset = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = originalVolume;
  };

  const playback = audio.play();
  if (playback && typeof playback.then === "function") {
    playback.then(reset).catch(reset);
  } else {
    reset();
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function hasChosenSoundPreference() {
  return hasChosen;
}

export function subscribeToSound(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Must be called from a user gesture when enabling, so the confirmation clip
 * doubles as the browser's playback unlock.
 */
export function setSoundEnabled(next) {
  const changed = soundEnabled !== next || !hasChosen;

  soundEnabled = next;
  hasChosen = true;

  try {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // Preference is lost on reload, but the session still works.
  }

  if (next) {
    Object.keys(CLIPS).forEach((key) => {
      if (key !== CONFIRMATION_CLIP) unlock(key);
    });
    playSound(CONFIRMATION_CLIP);
  } else {
    audioClips.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  if (changed) notify();
}

export function playSound(key) {
  if (!soundEnabled) return;

  const audio = getClip(key);
  if (!audio) return;

  audio.currentTime = 0;
  // Rejected when the browser has no user gesture to attach playback to yet.
  audio.play().catch(() => {});
}
