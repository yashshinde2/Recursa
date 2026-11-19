'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { PARTNERS } from '@/data/partners'
import { TESTIMONIALS } from '@/data/testimonials'
import { gsap, useGSAP } from '@/lib/gsap'

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const dragDistance = useRef(0)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const validTestimonials = TESTIMONIALS.filter(
    (t) => t.quote && !t.quote.includes('TODO') && t.name && !t.name.includes('TODO'),
  )
  const hasValidTestimonials = validTestimonials.length > 0

  useGSAP(
    () => {
      if (trackRef.current) gsap.set(trackRef.current, { xPercent: 0 })
    },
    { scope: sectionRef },
  )

  const goTo = useCallback(
    (index: number) => {
      if (!hasValidTestimonials) return
      const next = (index + validTestimonials.length) % validTestimonials.length
      activeIndexRef.current = next
      setActiveIndex(next)
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -next * 100,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
      }
    },
    [hasValidTestimonials, validTestimonials.length],
  )

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (!hasValidTestimonials || isPaused) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const timer = setInterval(() => {
      goTo(activeIndexRef.current + 1)
    }, 7000)

    return () => clearInterval(timer)
  }, [hasValidTestimonials, isPaused, goTo])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasValidTestimonials) return
    if (e.key === 'ArrowLeft') {
      goTo(activeIndexRef.current - 1)
    } else if (e.key === 'ArrowRight') {
      goTo(activeIndexRef.current + 1)
    }
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return
    dragStart.current = event.clientX
    dragDistance.current = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null || !trackRef.current) return
    dragDistance.current = event.clientX - dragStart.current
    gsap.set(trackRef.current, { x: dragDistance.current })
  }

  const finishDrag = () => {
    if (dragStart.current === null) return
    const width =
      sectionRef.current?.querySelector('[data-testimonial-window]')?.clientWidth ?? 1
    const threshold = width * 0.14
    const delta = dragDistance.current
    dragStart.current = null
    if (delta < -threshold) goTo(activeIndexRef.current + 1)
    else if (delta > threshold) goTo(activeIndexRef.current - 1)
    else goTo(activeIndexRef.current)
  }

  return (
    <section
      ref={sectionRef}
      id="partners"
      data-theme="light"
      aria-labelledby="partners-heading"
      className="relative bg-bone text-ink border-b border-ink/10"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 pb-20 md:px-8 md:pt-28 md:pb-28">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm">
          05 / PARTNERS
        </p>

        <h2
          id="partners-heading"
          className="mt-4 font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-ink max-w-3xl text-balance"
        >
          Trusted by businesses we&apos;ve built for.
        </h2>

        {/* 4 Partners grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 border border-ink/15 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-ink/15">
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name}`}
              className="group flex min-h-[120px] md:min-h-[160px] items-center justify-center p-6 text-center transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              {partner.logo ? (
                <div className="relative h-12 w-36 sm:h-14 sm:w-44 filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="font-serif text-lg sm:text-xl font-medium text-ink/70 transition-colors duration-300 group-hover:text-ink">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Testimonials section: Only rendered if real entries exist */}
      {hasValidTestimonials && (
        <div
          className="bg-ink pt-24 pb-24 text-bone md:pt-32 md:pb-32"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Client testimonials slider"
        >
          <div className="mx-auto w-full max-w-[1000px] px-5 md:px-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-[0.16em] text-bone/55 uppercase">
                A few words from the people we build with
              </p>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="font-mono text-xs uppercase tracking-wider text-bone/60 hover:text-bone px-2 py-1 border border-bone/20 rounded-[2px]"
                aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
              >
                {isPaused ? 'Resume ▶' : 'Pause ❚❚'}
              </button>
            </div>

            <div className="mt-8 overflow-hidden" data-testimonial-window>
              <div
                ref={trackRef}
                className="flex touch-pan-y cursor-grab active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
              >
                {validTestimonials.map((testimonial, index) => (
                  <figure
                    key={testimonial.name}
                    aria-hidden={activeIndex !== index}
                    className="min-w-full select-none px-1"
                  >
                    <blockquote className="max-w-[900px] font-serif text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[1.02] tracking-tight">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-xs tracking-[0.12em] uppercase">
                        {testimonial.name}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.1em] text-bone/55 uppercase">
                        {testimonial.role}{' '}
                        {testimonial.company ? `· ${testimonial.company}` : ''}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-bone/20 pt-5">
              <span className="font-mono text-[10px] tracking-[0.12em] text-bone/55">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(validTestimonials.length).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(activeIndexRef.current - 1)}
                  className="flex size-10 items-center justify-center border border-bone/25 font-mono text-lg transition-colors hover:border-bone focus-visible:ring-1 focus-visible:ring-signal"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(activeIndexRef.current + 1)}
                  className="flex size-10 items-center justify-center border border-bone/25 font-mono text-lg transition-colors hover:border-bone focus-visible:ring-1 focus-visible:ring-signal"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
