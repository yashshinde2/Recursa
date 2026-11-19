'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

// Set to 'arrow' (trigger on arrow hover/focus) or 'row' (trigger anywhere on row)
const TRIGGER: 'arrow' | 'row' = 'arrow'

const SERVICES = [
  {
    number: '01',
    name: 'SaaS',
    description: 'Useful software, thoughtfully designed to grow with your business.',
    href: '/services/saas-development',
    signature: 'saas',
  },
  {
    number: '02',
    name: 'Web Development',
    description: 'Fast, expressive digital experiences built for the open web.',
    href: '/services/web-development',
    signature: 'web',
  },
  {
    number: '03',
    name: 'Mobile Apps',
    description: 'Intuitive apps that make everyday interactions feel effortless.',
    href: '/services/mobile-app-development',
    signature: 'mobile',
  },
  {
    number: '04',
    name: 'IoT',
    description: 'Connected products that bring useful ideas into the real world.',
    href: '/services/iot-solutions',
    signature: 'iot',
  },
] as const

/* -------------------------------------------------------------------------- */
/*                               SVG Signatures                               */
/* -------------------------------------------------------------------------- */

function SaasSignature() {
  return (
    <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
      {/* Dashboard Card 1: Metrics with bars */}
      <g data-saas-card="1" className="origin-bottom-left">
        <rect
          x="22"
          y="23"
          width="92"
          height="94"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <rect x="34" y="36" width="36" height="4" fill="currentColor" opacity="0.3" />
        <g data-saas-bars className="origin-bottom">
          <rect
            data-saas-bar="1"
            x="34"
            y="54"
            width="12"
            height="48"
            fill="var(--signal)"
            className="origin-bottom"
          />
          <rect
            data-saas-bar="2"
            x="54"
            y="69"
            width="12"
            height="33"
            fill="currentColor"
            opacity="0.45"
            className="origin-bottom"
          />
          <rect
            data-saas-bar="3"
            x="74"
            y="59"
            width="12"
            height="43"
            fill="currentColor"
            opacity="0.65"
            className="origin-bottom"
          />
        </g>
      </g>

      {/* Dashboard Card 2: Line chart */}
      <g data-saas-card="2" className="origin-bottom-left">
        <rect
          x="126"
          y="23"
          width="172"
          height="94"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <path d="M140 98H284" stroke="currentColor" opacity="0.2" />
        <path
          data-saas-chart
          d="m143 84 31-20 24 11 31-30 20 12 28-23"
          stroke="var(--signal)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

function WebSignature() {
  return (
    <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
      {/* Code Editor */}
      <g data-web-code>
        <path
          data-code-line="1"
          d="M24 33h92"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          data-code-accent="1"
          d="M24 33h32"
          stroke="var(--signal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          data-code-line="2"
          d="M24 53h72"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          data-code-accent="2"
          d="M24 53h18"
          stroke="var(--signal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          data-code-line="3"
          d="M24 73h84"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          data-code-accent="3"
          d="M24 73h40"
          stroke="var(--signal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          data-code-line="4"
          d="M24 93h58"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          data-code-accent="4"
          d="M24 93h24"
          stroke="var(--signal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          data-code-line="5"
          d="M24 113h68"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>

      {/* Connection arrow */}
      <path d="M136 70h24" stroke="currentColor" opacity="0.3" strokeDasharray="2 3" />
      <path
        d="m154 65 5 5-5 5"
        stroke="currentColor"
        opacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rendered Web Page */}
      <g data-web-page className="origin-center">
        <rect
          x="180"
          y="20"
          width="116"
          height="100"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <path d="M180 34h116" stroke="currentColor" opacity="0.25" />
        <circle cx="190" cy="27" r="2" fill="var(--signal)" />
        <circle cx="196" cy="27" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="202" cy="27" r="2" fill="currentColor" opacity="0.3" />
        <rect
          data-web-hero
          x="192"
          y="44"
          width="92"
          height="32"
          fill="currentColor"
          opacity="0.12"
        />
        <path
          data-web-line="1"
          d="M192 88h60"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          data-web-line="2"
          d="M192 98h40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>
    </svg>
  )
}

function MobileSignature() {
  return (
    <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
      <g data-mobile-phone className="origin-center">
        <rect
          x="126"
          y="9"
          width="68"
          height="122"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <path
          d="M151 18h18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Screen 1: Dashboard overview */}
        <g data-screen="1" className="origin-center">
          <rect x="136" y="30" width="48" height="28" rx="2" fill="var(--signal)" opacity="0.85" />
          <path
            d="M136 68h42M136 77h34M136 91h42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* Screen 2: Circular gauge */}
        <g data-screen="2" className="origin-center" style={{ opacity: 0 }}>
          <circle cx="160" cy="50" r="14" stroke="var(--signal)" strokeWidth="2" />
          <path
            d="M136 76h42M136 85h34M136 96h38"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* Screen 3: List cards */}
        <g data-screen="3" className="origin-center" style={{ opacity: 0 }}>
          <rect x="136" y="34" width="48" height="16" rx="2" fill="currentColor" opacity="0.2" />
          <path
            d="M136 62h42M136 73h34M136 84h42M136 95h28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* Swipe Cue */}
        <path
          data-mobile-swipe
          d="M208 70h16m-5-5 5 5-5 5"
          stroke="var(--signal)"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </g>
    </svg>
  )
}

function IotSignature() {
  return (
    <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
      {/* Sensor */}
      <g data-iot-sensor className="origin-center">
        <rect
          x="22"
          y="49"
          width="48"
          height="42"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <circle cx="46" cy="70" r="7" stroke="var(--signal)" strokeWidth="2" />
        <path
          d="M46 57v-5m0 36v-5m-13-13h-5m36 0h-5"
          stroke="currentColor"
          opacity="0.5"
          strokeLinecap="round"
        />
      </g>

      {/* Transmission Line */}
      <path d="M70 70h180" stroke="currentColor" opacity="0.25" strokeWidth="1.5" />
      <path
        d="M70 70h180"
        stroke="var(--signal)"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        opacity="0.35"
      />

      {/* Cloud Node */}
      <g data-iot-cloud className="origin-center">
        <path
          d="M252 87h30a17 17 0 0 0 2-34 25 25 0 0 0-47-5 20 20 0 0 0 15 39Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <circle cx="258" cy="65" r="2" fill="var(--signal)" />
        <circle cx="268" cy="65" r="2" fill="var(--signal)" opacity="0.65" />
        <circle cx="278" cy="65" r="2" fill="var(--signal)" opacity="0.35" />
      </g>

      {/* Signal Packets */}
      <circle
        data-iot-packet="1"
        cx="70"
        cy="70"
        r="3.5"
        fill="var(--signal)"
        style={{ opacity: 0 }}
      />
      <circle
        data-iot-packet="2"
        cx="70"
        cy="70"
        r="3"
        fill="var(--signal)"
        style={{ opacity: 0 }}
      />
      <circle
        data-iot-packet="3"
        cx="70"
        cy="70"
        r="3"
        fill="var(--signal)"
        style={{ opacity: 0 }}
      />
    </svg>
  )
}

function Signature({ type }: { type: (typeof SERVICES)[number]['signature'] }) {
  if (type === 'saas') return <SaasSignature />
  if (type === 'web') return <WebSignature />
  if (type === 'mobile') return <MobileSignature />
  return <IotSignature />
}

/* -------------------------------------------------------------------------- */
/*                              Services Component                            */
/* -------------------------------------------------------------------------- */

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLElement | null)[]>([])
  const arrowRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const previewRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeRow, setActiveRow] = useState<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const activeIndexRef = useRef<number | null>(null)
  const timelinesRef = useRef<(gsap.core.Timeline | null)[]>([null, null, null, null])
  const reverseTweensRef = useRef<(gsap.core.Tween | null)[]>([null, null, null, null])
  const playedOnceRef = useRef<boolean[]>([false, false, false, false])

  // Detect reduced motion and touch devices
  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionMql.matches)
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    motionMql.addEventListener('change', onMotionChange)

    const hoverMql = window.matchMedia('(hover: none)')
    setIsTouchDevice(hoverMql.matches)
    const onHoverChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches)
    hoverMql.addEventListener('change', onHoverChange)

    return () => {
      motionMql.removeEventListener('change', onMotionChange)
      hoverMql.removeEventListener('change', onHoverChange)
    }
  }, [])

  // Lazy builder for GSAP timelines (each between 3 and 5s per loop, using only transform, opacity, strokeDashoffset)
  const buildTimeline = useCallback((index: number): gsap.core.Timeline | null => {
    const row = rowRefs.current[index]
    if (!row) return null

    const type = SERVICES[index].signature

    if (type === 'saas') {
      const card1 = row.querySelector('[data-saas-card="1"]')
      const card2 = row.querySelector('[data-saas-card="2"]')
      const bars = row.querySelectorAll('[data-saas-bar]')
      const chart = row.querySelector('[data-saas-chart]') as SVGPathElement | null

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.4,
        defaults: { ease: 'power3.out' },
      })

      const chartLen = chart?.getTotalLength?.() || 160
      if (chart) {
        gsap.set(chart, { strokeDasharray: chartLen, strokeDashoffset: chartLen })
      }

      tl.fromTo(
        [card1, card2],
        { x: 16, autoAlpha: 0.3 },
        { x: 0, autoAlpha: 1, duration: 0.65, stagger: 0.12 },
        0,
      )
        .fromTo(
          bars,
          { scaleY: 0.1, transformOrigin: 'bottom' },
          { scaleY: 1, duration: 0.75, stagger: 0.1 },
          0.2,
        )

      if (chart) {
        tl.to(chart, { strokeDashoffset: 0, duration: 1.1, ease: 'sine.inOut' }, 0.45)
      }

      tl.to([card1, card2], { scale: 1.02, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.8)
      return tl
    }

    if (type === 'web') {
      const codeLines = row.querySelectorAll('[data-code-line]')
      const codeAccents = row.querySelectorAll('[data-code-accent]')
      const page = row.querySelector('[data-web-page]')
      const hero = row.querySelector('[data-web-hero]')
      const pageLines = row.querySelectorAll('[data-web-line]')

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.4,
        defaults: { ease: 'power3.out' },
      })

      tl.fromTo(
        [...codeLines, ...codeAccents],
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.4, stagger: 0.08 },
        0,
      )
        .fromTo(page, { autoAlpha: 0.3, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.3)
        .fromTo(hero, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.5 }, 0.6)
        .fromTo(
          pageLines,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.45, stagger: 0.1 },
          0.8,
        )
        .to(page, { scale: 1.02, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.7)

      return tl
    }

    if (type === 'mobile') {
      const phone = row.querySelector('[data-mobile-phone]')
      const screen1 = row.querySelector('[data-screen="1"]')
      const screen2 = row.querySelector('[data-screen="2"]')
      const screen3 = row.querySelector('[data-screen="3"]')
      const swipe = row.querySelector('[data-mobile-swipe]')

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.5,
        defaults: { ease: 'power3.out' },
      })

      // Screen 1 -> Screen 2
      tl.to(screen1, { x: -16, autoAlpha: 0, duration: 0.4 }, 0.5)
        .fromTo(screen2, { x: 16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4 }, 0.5)
        .fromTo(swipe, { x: -8, autoAlpha: 0.2 }, { x: 8, autoAlpha: 0.8, duration: 0.45 }, 0.5)
        // Screen 2 -> Screen 3
        .to(screen2, { x: -16, autoAlpha: 0, duration: 0.4 }, 1.6)
        .fromTo(screen3, { x: 16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4 }, 1.6)
        // Screen 3 -> Screen 1
        .to(screen3, { x: -16, autoAlpha: 0, duration: 0.4 }, 2.7)
        .fromTo(screen1, { x: 16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4 }, 2.7)
        .to(phone, { scale: 1.02, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.0)

      return tl
    }

    // IoT
    const sensor = row.querySelector('[data-iot-sensor]')
    const cloud = row.querySelector('[data-iot-cloud]')
    const packets = row.querySelectorAll('[data-iot-packet]')

    const tl = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 0.4,
      defaults: { ease: 'power3.out' },
    })

    tl.to(sensor, { scale: 1.08, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.1)

    packets.forEach((packet, pIdx) => {
      tl.fromTo(
        packet,
        { x: 0, autoAlpha: 0 },
        {
          x: 175,
          autoAlpha: 0.9,
          duration: 1.4,
          ease: 'sine.inOut',
          onUpdate: function () {
            const prog = this.progress()
            // Fade out near end of line
            if (prog > 0.85) {
              gsap.set(packet, { autoAlpha: (1 - prog) / 0.15 })
            }
          },
        },
        0.25 + pIdx * 0.35,
      )
    })

    tl.to(cloud, { scale: 1.06, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.4)

    return tl
  }, [])

  // Start row animation (pauses and resets any other row)
  const startRowAnimation = useCallback(
    (index: number) => {
      if (prefersReducedMotion) return

      // Stop any other active row
      if (activeIndexRef.current !== null && activeIndexRef.current !== index) {
        const otherIndex = activeIndexRef.current
        const otherTl = timelinesRef.current[otherIndex]
        if (otherTl) {
          otherTl.pause()
          gsap.to(otherTl, {
            time: 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => otherTl.seek(0).pause(),
          })
        }
      }

      activeIndexRef.current = index
      setActiveRow(index)

      // Kill any running reverse tween for this row
      if (reverseTweensRef.current[index]) {
        reverseTweensRef.current[index]?.kill()
        reverseTweensRef.current[index] = null
      }

      // Lazily create timeline if needed
      let tl = timelinesRef.current[index]
      if (!tl) {
        tl = buildTimeline(index)
        timelinesRef.current[index] = tl
      }

      if (tl) {
        tl.restart()
      }
    },
    [buildTimeline, prefersReducedMotion],
  )

  // Stop row animation: smoothly reverse over 0.4s to resting frame
  const stopRowAnimation = useCallback((index: number) => {
    if (activeIndexRef.current === index) {
      activeIndexRef.current = null
      setActiveRow(null)
    }

    const tl = timelinesRef.current[index]
    if (!tl) return

    tl.pause()

    // Smoothly reverse back to time: 0 over 0.4s
    reverseTweensRef.current[index] = gsap.to(tl, {
      time: 0,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => {
        tl.seek(0).pause()
        reverseTweensRef.current[index] = null
      },
    })
  }, [])

  // Touch device: Play once
  const playRowOnce = useCallback(
    (index: number) => {
      if (prefersReducedMotion) return

      let tl = timelinesRef.current[index]
      if (!tl) {
        tl = buildTimeline(index)
        timelinesRef.current[index] = tl
      }

      if (tl) {
        setActiveRow(index)
        tl.repeat(0).restart()
      }
    },
    [buildTimeline, prefersReducedMotion],
  )

  // Pause everything when section is off-screen
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          timelinesRef.current.forEach((tl) => {
            if (tl && !tl.paused()) {
              tl.pause()
            }
          })
          setActiveRow(null)
          activeIndexRef.current = null
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Touch devices: IntersectionObserver (at least 60% in view) to play once
  useEffect(() => {
    if (!isTouchDevice || prefersReducedMotion) return

    const observers: IntersectionObserver[] = []

    rowRefs.current.forEach((row, index) => {
      if (!row) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !playedOnceRef.current[index]) {
            playedOnceRef.current[index] = true
            playRowOnce(index)
          }
        },
        { threshold: 0.6 },
      )

      observer.observe(row)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [isTouchDevice, prefersReducedMotion, playRowOnce])

  // Cleanup all timelines and tweens on unmount
  useEffect(() => {
    return () => {
      timelinesRef.current.forEach((tl) => tl?.kill())
      reverseTweensRef.current.forEach((tw) => tw?.kill())
    }
  }, [])

  // GSAP Scope for DOM queries
  useGSAP({ scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme="dark"
      aria-labelledby="services-heading"
      className="grain relative"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 md:px-8 md:pt-28">
        <h2
          id="services-heading"
          className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm"
        >
          03 / WHAT WE BUILD
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-8 md:pb-28">
        {SERVICES.map((service, index) => {
          const isActive = activeRow === index

          // Event handlers depending on TRIGGER mode
          const rowTriggerProps =
            TRIGGER === 'row' && !isTouchDevice
              ? {
                  onPointerEnter: () => startRowAnimation(index),
                  onPointerLeave: () => stopRowAnimation(index),
                }
              : {}

          const arrowTriggerProps =
            !isTouchDevice
              ? {
                  onPointerEnter: () => startRowAnimation(index),
                  onPointerLeave: () => stopRowAnimation(index),
                  onFocus: () => startRowAnimation(index),
                  onBlur: () => stopRowAnimation(index),
                }
              : {}

          return (
            <div
              key={service.number}
              ref={(el) => {
                rowRefs.current[index] = el
              }}
              data-service-row
              data-signature={service.signature}
              {...rowTriggerProps}
              className="group grid min-h-[300px] grid-cols-1 items-center gap-8 border-b border-bone/20 py-10 first:mt-8 md:min-h-[320px] md:grid-cols-[5rem_minmax(0,1fr)_minmax(18rem,0.8fr)_auto] md:gap-8 md:py-12"
            >
              {/* Number: Shifts 8px right on hover */}
              <span
                className={cn(
                  'self-start pt-2 font-mono text-xs tracking-[0.14em] text-muted-foreground',
                  'transition-transform duration-300 ease-out',
                  isActive ? 'translate-x-2' : 'translate-x-0',
                )}
              >
                {service.number}
              </span>

              {/* Title & Description: Shifts 8px right on hover */}
              <div
                className={cn(
                  'flex flex-col gap-3 transition-transform duration-300 ease-out',
                  isActive ? 'translate-x-2' : 'translate-x-0',
                )}
              >
                <Link
                  href={service.href}
                  className="w-fit font-serif text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] text-bone transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  {service.name}
                </Link>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  {service.description}
                </p>
              </div>

              {/* Signature Animation Preview (Tapping replays on touch devices) */}
              <div
                ref={(el) => {
                  previewRefs.current[index] = el
                }}
                data-service-signature
                aria-hidden="true"
                onClick={() => {
                  if (isTouchDevice) playRowOnce(index)
                }}
                className={cn(
                  'h-32 w-full max-w-[320px] justify-self-center text-bone/70 md:h-36 md:justify-self-end',
                  isTouchDevice && 'cursor-pointer',
                )}
              >
                <Signature type={service.signature} />
              </div>

              {/* 56px Arrow Link with 12px hit padding */}
              <div className="justify-self-start md:justify-self-end">
                <Link
                  ref={(el) => {
                    arrowRefs.current[index] = el
                  }}
                  href={service.href}
                  aria-label={`Explore ${service.name}`}
                  {...arrowTriggerProps}
                  className="inline-flex p-3 -m-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  <span
                    className={cn(
                      'flex size-14 items-center justify-center rounded-full border border-bone/25 text-bone',
                      'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      isActive
                        ? cn(
                            'border-signal bg-signal text-ink',
                            !prefersReducedMotion && 'rotate-[-45deg]',
                          )
                        : 'bg-transparent hover:border-signal hover:text-signal',
                    )}
                  >
                    <span aria-hidden="true" className="font-mono text-xl leading-none">
                      ↗
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
