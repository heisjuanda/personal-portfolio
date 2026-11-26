const DIRECTION = {
    FORWARD: 'forward',
    BACKWARD: 'backward',
}

const FACING = {
    FRONT: 'front',
    BACK: 'back',
}

const CHARACTER_IMAGES = {
    FRONT: '/images/character/front.avif',
    BACK: '/images/character/back.avif',
    THINKING_FRONT: '/images/character/front_thinking.avif',
    THINKING_BACK: '/images/character/back_thinking.avif',
}

const SIDE = {
    LEFT: 'left',
    RIGHT: 'right',
}

// Constants for the number of pixels per hop
const PX_PER_HOP = 20;
const CHARACTER_IDLE_DELAY = 500;
const SCROLL_TIP_THRESHOLD = 100;
const DOOR_MARGIN = 10;

const SCROLL_TIP_DELAY = 1500;

// Constants for the delay and duration of the sound hint
const SOUND_HINT_DELAY = 2000;
const SOUND_HINT_DURATION = 10000;

// Constants for the delay and duration of the navigation peek
const NAV_PEEK_DELAY = 700;
const NAV_PEEK_DURATION = 1800;

// Constants for the delay and duration of the consent notice
const CONSENT_NOTICE_DELAY = 6000;
const CONSENT_NOTICE_EXIT = 400;

// Constant for the year of career start
const CAREER_START_YEAR = 2021;

const NUMBER_WORDS = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
};

/**
 * Returns full calendar years elapsed since CAREER_START_YEAR.
 */
function getExperienceYears(referenceYear = new Date().getFullYear()) {
    return Math.max(1, referenceYear - CAREER_START_YEAR);
}

/**
 * Formats an integer count as an English lowercase word when in range, falling back to digits.
 */
function formatExperienceYearsWord(years = getExperienceYears()) {
    return NUMBER_WORDS[years] ?? String(years);
}

const PLANE = {
    TIMEOUT: 5000,
    DURATION: 4200,
    LOOP_START: 0.24,
    LOOP_END: 0.76,
}

export { DIRECTION, FACING, CHARACTER_IMAGES, PX_PER_HOP, CHARACTER_IDLE_DELAY, SIDE, DOOR_MARGIN, SCROLL_TIP_THRESHOLD, SCROLL_TIP_DELAY, SOUND_HINT_DELAY, SOUND_HINT_DURATION, CONSENT_NOTICE_DELAY, CONSENT_NOTICE_EXIT, NAV_PEEK_DELAY, NAV_PEEK_DURATION, PLANE, CAREER_START_YEAR, getExperienceYears, formatExperienceYearsWord };