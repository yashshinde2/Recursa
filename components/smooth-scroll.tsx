'use client'

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { gsap, ScrollTrigger } from '@/lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function scrollToTarget(lenis: Lenis | null, target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { force: true })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target })
    return
  }

  document.querySelector(target)?.scrollIntoView()
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Lenis honours prefers-reduced-motion itself (respectReducedMotion):
    // smoothing is dropped and programmatic scrolls become instant.
    const instance = new Lenis({ anchors: true, autoRaf: false })
    const tick = (time: number) => instance.raf(time * 1000)

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
