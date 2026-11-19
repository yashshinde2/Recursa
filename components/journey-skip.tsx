'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useLenis } from '@/components/smooth-scroll'
import { ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function JourneySkip() {
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)
  const [inLastRange, setInLastRange] = useState(false)
  const lenis = useLenis()

  const checkScrollProgress = useCallback(() => {
    const journeyEl = document.getElementById('journey')
    if (!journeyEl) return

    const returnEl = journeyEl.querySelector('[data-journey-return]')
    if (returnEl) {
      const returnRect = returnEl.getBoundingClientRect()
      if (returnRect.top <= window.innerHeight * 0.75) {
        setInLastRange(true)
        return
      }
    }

    const triggers = ScrollTrigger.getAll()
    const journeyTrigger =
      triggers.find((st) => st.trigger === journeyEl) ||
      triggers.find((st) => journeyEl.contains(st.trigger as Node) && Boolean(st.pin)) ||
      triggers.find((st) => journeyEl.contains(st.trigger as Node))

    if (
      journeyTrigger &&
      typeof journeyTrigger.start === 'number' &&
      typeof journeyTrigger.end === 'number'
    ) {
      const range = journeyTrigger.end - journeyTrigger.start
      if (range > 0) {
        const scrollY = window.scrollY
        const progress = (scrollY - journeyTrigger.start) / range
        setInLastRange(progress >= 0.85)
        return
      }
    }

    const rect = journeyEl.getBoundingClientRect()
    const total = journeyEl.offsetHeight
    if (total > 0) {
      const scrolled = -rect.top
      const progress = scrolled / total
      setInLastRange(progress >= 0.85)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const journeyEl = document.getElementById('journey')
    if (!journeyEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          checkScrollProgress()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(journeyEl)

    const handleScroll = () => {
      checkScrollProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    if (lenis) {
      lenis.on('scroll', handleScroll)
    }

    checkScrollProgress()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (lenis) {
        lenis.off('scroll', handleScroll)
      }
    }
  }, [checkScrollProgress, lenis])

  const handleSkip = () => {
    const journeyEl = document.getElementById('journey')
    if (!journeyEl) return

    const targetEl = journeyEl.nextElementSibling as HTMLElement | null

    const triggers = ScrollTrigger.getAll()
    const journeyTrigger =
      triggers.find((st) => st.trigger === journeyEl) ||
      triggers.find((st) => journeyEl.contains(st.trigger as Node) && Boolean(st.pin)) ||
      triggers.find((st) => journeyEl.contains(st.trigger as Node))

    const navEl = document.querySelector('header')
    const navHeight = navEl ? navEl.offsetHeight : 64

    const destination =
      journeyTrigger && typeof journeyTrigger.end === 'number'
        ? journeyTrigger.end
        : targetEl
          ? targetEl.getBoundingClientRect().top + window.scrollY
          : null

    if (destination === null) return

    if (lenis) {
      lenis.scrollTo(destination, {
        duration: 1.4,
        offset: -navHeight,
      })
    } else {
      window.scrollTo({
        top: Math.max(0, destination - navHeight),
        behavior: 'smooth',
      })
    }
  }

  if (!mounted || typeof document === 'undefined') return null

  const isVisible = inView && !inLastRange

  return createPortal(
    <button
      type="button"
      onClick={handleSkip}
      aria-label="Skip the journey section"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={cn(
        'fixed z-[70] right-5 md:right-8',
        'bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(2rem+env(safe-area-inset-bottom,0px))]',
        'right-[calc(1.25rem+env(safe-area-inset-right,0px))] md:right-[calc(2rem+env(safe-area-inset-right,0px))]',
        'inline-flex min-h-[44px] items-center justify-center px-4 py-2.5',
        'rounded-[2px] border border-border/80 bg-background text-foreground shadow-sm',
        'font-mono text-xs uppercase tracking-[0.16em]',
        'transition-all duration-300 ease-out',
        'hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal',
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-3 opacity-0 pointer-events-none',
      )}
    >
      Skip journey ↓
    </button>,
    document.body,
  )
}
