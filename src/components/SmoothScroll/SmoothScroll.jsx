import { useEffect, useRef } from 'react'

import useReducedMotion from '../../hooks/useReducedMotion.js'
import { registerSmoothScroll } from '../../utils/smoothScroll.js'
import { loadMotion } from '../../utils/loadMotion.js'

export default function SmoothScroll() {
  const lenisRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    let cancelled = false
    let teardown = null

    loadMotion().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (cancelled) return

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.06,
        duration: 1.8,
        smoothWheel: true,
        wheelMultiplier: 0.6,
        touchMultiplier: 1.0,

        smoothTouch: false,
        syncTouch: false,
      })

      lenisRef.current = lenis
      const unregisterSmoothScroll = registerSmoothScroll(lenis)

      function onTick(time) {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
      lenis.on('scroll', ScrollTrigger.update)

      teardown = () => {
        unregisterSmoothScroll()
        gsap.ticker.remove(onTick)
        lenis.destroy()
        lenisRef.current = null
      }
    })

    return () => {
      cancelled = true
      teardown?.()
    }
  }, [reducedMotion])

  return null
}
