'use client'

import { useEffect, useState } from 'react'

type Options = {
  /** Scroll distance from the top within which the element always stays visible. */
  topOffset?: number
  /** Minimum scroll delta before the direction is considered to have changed. */
  threshold?: number
}

export function useHideOnScroll({ topOffset = 80, threshold = 6 }: Options = {}) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = Math.max(window.scrollY, 0)
    let frame = 0

    const update = () => {
      frame = 0
      const y = Math.max(window.scrollY, 0)
      const delta = y - lastY

      setScrolled(y > 8)

      if (y < topOffset) {
        setHidden(false)
        lastY = y
        return
      }

      if (Math.abs(delta) < threshold) return

      setHidden(delta > 0)
      lastY = y
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    update()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
    }
  }, [topOffset, threshold])

  return { hidden, scrolled }
}
