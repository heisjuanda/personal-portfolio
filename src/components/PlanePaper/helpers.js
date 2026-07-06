import { PLANE } from "../../constants/constants"

export const cubicBezierPoint = (t, p0, p1, p2, p3) => {
    const u = 1 - t
    return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
    }
}

export const cubicBezierTangent = (t, p0, p1, p2, p3) => {
    const u = 1 - t
    return {
        x: 3 * (u ** 2 * (p1.x - p0.x) + 2 * u * t * (p2.x - p1.x) + t ** 2 * (p3.x - p2.x)),
        y: 3 * (u ** 2 * (p1.y - p0.y) + 2 * u * t * (p2.y - p1.y) + t ** 2 * (p3.y - p2.y)),
    }
}

export const buildSegments = (vw, vh) => {
    const cy = vh * 0.52
    const cx = vw * 0.42
    const Rx = Math.min(vh * 0.17, vw * 0.13)
    const Ry = Rx * 0.78
    const kx = 0.5523 * Rx
    const ky = 0.5523 * Ry
    const drop = vh * 0.045

    const bot = { x: cx, y: cy }
    const rgt = { x: cx + Rx, y: cy - Ry }
    const top = { x: cx, y: cy - 2 * Ry }
    const lft = { x: cx - Rx, y: cy - Ry }

    const entryY = cy - vh * 0.06

    return [
        {
            start: 0, end: 0.25,
            p0: { x: -120, y: entryY },
            p1: { x: vw * 0.08, y: entryY },
            p2: { x: vw * 0.22, y: cy + vh * 0.01 },
            p3: { ...bot },
        },
        {
            start: 0.25, end: 0.375,
            p0: { ...bot },
            p1: { x: cx + kx, y: cy },
            p2: { x: cx + Rx, y: cy - Ry + ky },
            p3: { ...rgt },
        },
        {
            start: 0.375, end: 0.50,
            p0: { ...rgt },
            p1: { x: cx + Rx, y: cy - Ry - ky },
            p2: { x: cx + kx, y: cy - 2 * Ry },
            p3: { ...top },
        },
        {
            start: 0.50, end: 0.625,
            p0: { ...top },
            p1: { x: cx - kx, y: cy - 2 * Ry },
            p2: { x: cx - Rx, y: cy - Ry - ky },
            p3: { ...lft },
        },
        {
            start: 0.625, end: 0.75,
            p0: { ...lft },
            p1: { x: cx - Rx, y: cy - Ry + ky },
            p2: { x: cx - kx, y: cy },
            p3: { ...bot },
        },
        {
            start: 0.75, end: 1.0,
            p0: { ...bot },
            p1: { x: vw * 0.57, y: cy + drop * 0.3 },
            p2: { x: vw * 0.78, y: cy + drop },
            p3: { x: vw + 130, y: cy + drop },
        },
    ]
}

export const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export const smoothstep = (x) => {
    return x * x * (3 - 2 * x)
}

export const pitchOscillation = (t, vh) => {
    let blend = 1
    const fadeWidth = 0.06

    if (t > PLANE.LOOP_START - fadeWidth && t < PLANE.LOOP_START + fadeWidth) {
        const x = (t - (PLANE.LOOP_START - fadeWidth)) / (fadeWidth * 2)
        blend = 1 - smoothstep(Math.min(1, Math.max(0, x)))
    } else if (t >= PLANE.LOOP_START && t <= PLANE.LOOP_END) {
        blend = 0
    } else if (t > PLANE.LOOP_END - fadeWidth && t < PLANE.LOOP_END + fadeWidth) {
        const x = (t - (PLANE.LOOP_END - fadeWidth)) / (fadeWidth * 2)
        blend = smoothstep(Math.min(1, Math.max(0, x)))
    }

    const amp = vh * 0.008
    const freq = 4.5
    return Math.sin(t * freq * Math.PI * 2) * amp * blend
}

export const rotationFlutter = (t, rawT) => {
    let blend = 1
    if (t >= PLANE.LOOP_START && t <= PLANE.LOOP_END) blend = 0
    const flutter = Math.sin(rawT * PLANE.DURATION / 1000 * 18) * 0.038
    return flutter * blend
}