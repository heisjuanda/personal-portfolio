import { useState, useEffect, useRef, useCallback } from 'react'

import { DIRECTION } from '../constants/constants'

export default function useScrollDirection({ threshold = 0 } = {}) {
  const [direction, setDirection] = useState(DIRECTION.FORWARD)
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const update = useCallback(() => {
    const currentY = window.scrollY
    const delta = currentY - lastScrollY.current

    if (Math.abs(delta) > threshold) {
      setDirection(delta > 0 ? DIRECTION.FORWARD : DIRECTION.BACKWARD)
      lastScrollY.current = currentY
    }

    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const prog = docHeight > 0 ? Math.min(currentY / docHeight, 1) : 0

    setProgress(prog)
    setScrollY(currentY)
    ticking.current = false
  }, [threshold])

  useEffect(() => {
    function onScroll() {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [update])

  return { direction, progress, scrollY }
}
