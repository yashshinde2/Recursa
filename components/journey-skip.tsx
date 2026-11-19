'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useLenis } from '@/components/smooth-scroll'
import { cn } from '@/lib/utils'

export function JourneySkip() {
  const [mounted, setMounted] = useState(false)
  const [journeyInView, setJourneyInView] = useState(false)
  const [finaleInView, setFinaleInView] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const journeyEl = document.getElementById('journey')
    if (!journeyEl) return

    const finaleEl = journeyEl.querySelector('[data-journey-return]')

    const journeyObserver = new IntersectionObserver(
      ([entry]) => {
        setJourneyInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )
    journeyObserver.observe(journeyEl)

    let finaleObserver: IntersectionObserver | null = null
    if (finaleEl) {
      finaleObserver = new IntersectionObserver(
        ([entry]) => {
          setFinaleInView(entry.isIntersecting)
        },
        { threshold: 0.05 },
      )
      finaleObserver.observe(finaleEl)
    }

    return () => {
      journeyObserver.disconnect()
      if (finaleObserver) {
        finaleObserver.disconnect()
      }
    }
  }, [mounted])

  const handleSkip = useCallback(() => {
    const journeyEl = document.getElementById('journey')
    if (!journeyEl) return

    const targetEl =
      (journeyEl.nextElementSibling as HTMLElement | null) ||
      document.getElementById('contact')
    if (!targetEl) return

    const navEl = document.querySelector('header')
    const navHeight = navEl ? navEl.offsetHeight : 64

    if (lenis) {
      lenis.scrollTo(targetEl, {
        duration: 1.4,
        offset: -navHeight,
      })
    } else {
      const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      })
    }
  }, [lenis])

  if (!mounted || typeof document === 'undefined') return null

  const isVisible = journeyInView && !finaleInView

  return createPortal(
    <button
      type="button"
      onClick={handleSkip}
      aria-label="Skip the journey section"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={cn(
        'fixed z-[70]',
        'bottom-6 right-5 md:bottom-8 md:right-8',
        'inline-flex min-h-[44px] items-center justify-center px-4 py-2.5',
        'rounded-[2px] border border-border/80 bg-background text-foreground shadow-sm',
        'font-mono text-xs uppercase tracking-[0.16em]',
        'transition-all duration-300 ease-out',
        'hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal',
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
