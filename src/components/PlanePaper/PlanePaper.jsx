import { useEffect, useRef, useState } from 'react'

import { cubicBezierPoint, cubicBezierTangent, buildSegments, easeInOutCubic, pitchOscillation, rotationFlutter } from './helpers'
import { PLANE } from '../../constants/constants'

import './PlanePaper.css'

export default function PlanePaper() {
    const canvasRef = useRef(null)
    const planeRef = useRef(null)
    const rafRef = useRef(null)

    const [visible, setVisible] = useState(false)
    const [done, setDone] = useState(false)

    const [scrollTop, setScrollTop] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => {
            setScrollTop(window.scrollY)
            setVisible(true)
        }, PLANE.TIMEOUT)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        if (!visible) return

        const canvas = canvasRef.current
        const plane = planeRef.current
        if (!canvas || !plane) return

        const vw = window.innerWidth
        const vh = window.innerHeight

        const dpr = window.devicePixelRatio || 1
        canvas.width = vw * dpr
        canvas.height = vh * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)

        const segments = buildSegments(vw, vh)
        let cancelled = false

        function getPoint(t) {
            for (const seg of segments) {
                if (t <= seg.end) {
                    const lt = Math.max(0, Math.min(1, (t - seg.start) / (seg.end - seg.start)))
                    return {
                        pos: cubicBezierPoint(lt, seg.p0, seg.p1, seg.p2, seg.p3),
                        tan: cubicBezierTangent(lt, seg.p0, seg.p1, seg.p2, seg.p3),
                    }
                }
            }
            const seg = segments[segments.length - 1]
            return {
                pos: cubicBezierPoint(1, seg.p0, seg.p1, seg.p2, seg.p3),
                tan: cubicBezierTangent(1, seg.p0, seg.p1, seg.p2, seg.p3),
            }
        }

        function drawDashedTrail(currentT, globalAlpha = 1) {
            ctx.clearRect(0, 0, vw, vh)
            ctx.save()
            ctx.globalAlpha = globalAlpha

            ctx.beginPath()
            ctx.lineWidth = 10
            ctx.strokeStyle = '#2d37489c'
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.setLineDash([30, 20])

            const samples = 200
            let first = true
            for (let i = 0; i <= samples; i++) {
                const sT = (i / samples) * currentT
                const { pos } = getPoint(sT)
                const yOffset = pitchOscillation(sT, vh)
                if (first) {
                    ctx.moveTo(pos.x, pos.y + yOffset)
                    first = false
                } else {
                    ctx.lineTo(pos.x, pos.y + yOffset)
                }
            }

            ctx.stroke()
            ctx.restore()
        }

        let startTime = null

        function animate(timestamp) {
            if (cancelled) return
            if (!startTime) startTime = timestamp

            const elapsed = timestamp - startTime
            const rawT = Math.min(elapsed / PLANE.DURATION, 1)
            const t = easeInOutCubic(rawT)

            const { pos, tan } = getPoint(t)
            const yOscil = pitchOscillation(t, vh)
            const flutter = rotationFlutter(t, rawT)

            const pathAngle = Math.atan2(tan.y, tan.x)
            const angle = pathAngle + flutter

            plane.style.left = `${pos.x}px`
            plane.style.top = `${pos.y + yOscil}px`
            plane.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`

            drawDashedTrail(t)

            if (rawT < 1) {
                rafRef.current = requestAnimationFrame(animate)
            } else {
                let fadeAlpha = 1
                function fadeElements() {
                    if (cancelled) return
                    fadeAlpha -= 0.02
                    if (fadeAlpha <= 0) {
                        ctx.clearRect(0, 0, vw, vh)
                        if (!cancelled) setDone(true)
                        return
                    }
                    drawDashedTrail(1, fadeAlpha)
                    rafRef.current = requestAnimationFrame(fadeElements)
                }
                rafRef.current = requestAnimationFrame(fadeElements)
            }
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            cancelled = true
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [visible])

    if (done) return null

    return (
        <div
            className="plane-paper__wrapper"
            aria-hidden="true"
            style={{ top: `${scrollTop}px` }}
        >
            {visible && (
                <>
                    <canvas ref={canvasRef} className="plane-paper__canvas" />
                    <img
                        ref={planeRef}
                        src="images/paperPlane/paper-plane.avif"
                        alt="Paper plane flying"
                        className="plane-paper__img"
                        draggable={false}
                        loading="lazy"
                        width="70px"
                    />
                </>
            )}
        </div>
    )
}