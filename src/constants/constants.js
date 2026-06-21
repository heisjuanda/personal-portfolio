const DIRECTION = {
    FORWARD: 'forward',
    BACKWARD: 'backward',
}

const FACING = {
    FRONT: 'front',
    BACK: 'back',
}

const CHARACTER_IMAGES = {
    FRONT: '/images/character/front.webp',
    BACK: '/images/character/back.webp',
    THINKING_FRONT: '/images/character/front_thinking.webp',
    THINKING_BACK: '/images/character/back_thinking.webp',
}

const SIDE = {
    LEFT: 'left',
    RIGHT: 'right',
}

const PX_PER_HOP = 20;
const SCROLL_TIP_THRESHOLD = 100;
const DOOR_MARGIN = 10;

const SCROLL_TIP_DELAY = 3000;

export { DIRECTION, FACING, CHARACTER_IMAGES, PX_PER_HOP, SIDE, DOOR_MARGIN, SCROLL_TIP_THRESHOLD, SCROLL_TIP_DELAY };