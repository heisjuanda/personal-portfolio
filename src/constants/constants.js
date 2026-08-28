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
const SCROLL_TIP_THRESHOLD = 100;
const DOOR_MARGIN = 10;

const SCROLL_TIP_DELAY = 3000;

// Constants for the delay and duration of the sound hint
const SOUND_HINT_DELAY = 2000;
const SOUND_HINT_DURATION = 10000;

// Constants for the delay and duration of the navigation peek
const NAV_PEEK_DELAY = 700;
const NAV_PEEK_DURATION = 1800;

// Constants for the delay and duration of the consent notice
const CONSENT_NOTICE_DELAY = 6000;
const CONSENT_NOTICE_EXIT = 400;

const PLANE = {
    TIMEOUT: 5000,
    DURATION: 4200,
    LOOP_START: 0.24,
    LOOP_END: 0.76,
}

export { DIRECTION, FACING, CHARACTER_IMAGES, PX_PER_HOP, SIDE, DOOR_MARGIN, SCROLL_TIP_THRESHOLD, SCROLL_TIP_DELAY, SOUND_HINT_DELAY, SOUND_HINT_DURATION, CONSENT_NOTICE_DELAY, CONSENT_NOTICE_EXIT, NAV_PEEK_DELAY, NAV_PEEK_DURATION, PLANE };