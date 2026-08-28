import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useReducedMotion from '../../hooks/useReducedMotion.js'
import { registerSmoothScroll } from '../../utils/smoothScroll.js'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  const lenisRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

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

    return () => {
      unregisterSmoothScroll()
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return null
}
