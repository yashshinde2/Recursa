'use client'

import type Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useLenis } from '@/components/smooth-scroll'
import { ScrollTrigger } from '@/lib/gsap'

export function getNavHeight(): number {
  if (typeof document === 'undefined') return 64
  const header = document.querySelector('header')
  if (header && header.offsetHeight > 0) {
    return header.offsetHeight
  }
  return 64
}

export function getSectionScrollTop(targetId: string): number | null {
  if (typeof document === 'undefined') return null

  const cleanId = targetId.replace(/^\/?#/, '')
  if (!cleanId) return 0

  const element = document.getElementById(cleanId)
  if (!element) return null

  // Refresh ScrollTrigger to ensure pinned start/end offsets are exact
  ScrollTrigger.refresh()

  const triggers = ScrollTrigger.getAll()

  // For sections that use a ScrollTrigger pin, compute the destination from that trigger's start value
  const pinnedTrigger = triggers.find(
    (st) =>
      (st.trigger === element || (st.trigger && element.contains(st.trigger as Node))) &&
      Boolean(st.pin),
  )

  if (pinnedTrigger && typeof pinnedTrigger.start === 'number') {
    return pinnedTrigger.start
  }

  // Fallback to top offset for non-pinned sections
  const rect = element.getBoundingClientRect()
  return rect.top + window.scrollY
}

export function scrollToSection(
  lenis: Lenis | null,
  target: string | number,
  options?: { duration?: number; offset?: number },
) {
  if (typeof window === 'undefined') return

  const navHeight = getNavHeight()
  const duration = options?.duration ?? 1.2
  const offset = options?.offset ?? -navHeight

  if (typeof target === 'number') {
    if (lenis) {
      lenis.scrollTo(target, { duration, offset: 0, force: true })
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
    return
  }

  const destination = getSectionScrollTop(target)
  if (destination === null) {
    const el = document.querySelector(target)
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY
      if (lenis) {
        lenis.scrollTo(topOffset, { duration, offset, force: true })
      } else {
        window.scrollTo({ top: Math.max(0, topOffset + offset), behavior: 'smooth' })
      }
    }
    return
  }

  if (lenis) {
    lenis.scrollTo(destination, { duration, offset, force: true })
  } else {
    window.scrollTo({
      top: Math.max(0, destination + offset),
      behavior: 'smooth',
    })
  }
}

/**
 * Hook to scroll to hash target on page load (waiting for fonts and ScrollTrigger refresh)
 */
export function useHashScroll() {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/' || typeof window === 'undefined') return
    const hash = window.location.hash
    if (!hash) return

    let cancelled = false

    const handleInitialHash = async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready
        } catch {}
      }

      if (cancelled) return

      requestAnimationFrame(() => {
        setTimeout(() => {
          if (cancelled) return
          ScrollTrigger.refresh()
          scrollToSection(lenis, hash, { duration: 1.2 })
        }, 150)
      })
    }

    handleInitialHash()

    const onHashChange = () => {
      const currentHash = window.location.hash
      if (currentHash) {
        ScrollTrigger.refresh()
        scrollToSection(lenis, currentHash, { duration: 1.2 })
      }
    }

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const isHomeHash = href.startsWith('#') || (pathname === '/' && href.startsWith('/#'))
      if (!isHomeHash) return

      if (
        anchor.target === '_blank' ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.defaultPrevented
      ) {
        return
      }

      event.preventDefault()
      const cleanHash = href.startsWith('/#') ? href.slice(1) : href
      window.history.pushState(null, '', cleanHash)
      scrollToSection(lenis, cleanHash, { duration: 1.2 })
    }

    window.addEventListener('hashchange', onHashChange)
    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelled = true
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onAnchorClick)
    }
  }, [lenis, pathname])
}

const TRACKED_SECTIONS = ['home', 'who-we-are', 'services', 'work', 'journey', 'contact'] as const

/**
 * Hook to track which section is currently active for the navbar
 */
export function useActiveSection() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (pathname !== '/') {
      if (pathname === '/team') {
        setActiveSection('team')
      } else {
        setActiveSection(null)
      }
      return
    }

    const elements = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (elements.length === 0) return

    const checkActive = () => {
      const focalY = window.innerHeight * 0.35

      // Check pinned/tall sections and normal sections
      for (const id of ['contact', 'journey', 'services', 'work'] as const) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= focalY && rect.bottom >= focalY) {
          setActiveSection(id)
          return
        }
      }

      // Check top sections
      for (const id of ['home', 'who-we-are'] as const) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= focalY && rect.bottom >= focalY) {
          setActiveSection(null)
          return
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          const topId = intersecting[0].target.id
          if (topId === 'services' || topId === 'work' || topId === 'journey' || topId === 'contact') {
            setActiveSection(topId)
          } else if (topId === 'home' || topId === 'who-we-are') {
            setActiveSection(null)
          }
        }
        checkActive()
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75],
      },
    )

    elements.forEach((el) => observer.observe(el))
    window.addEventListener('scroll', checkActive, { passive: true })
    checkActive()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', checkActive)
    }
  }, [pathname])

  return activeSection
}
