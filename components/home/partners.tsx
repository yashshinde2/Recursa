'use client'

import { useRef, useState } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'

const PARTNERS = [
  'DYPSEM College',
  'Dhanashree Foods',
  'Sakhis Dwikala',
  'StickerDump.exe',
  'Infilemon Technologies PVT LTD',
  'KD Export',
  'House of 666',
]

const TESTIMONIALS = [
  {
    quote: 'They made the complicated feel clear, and gave our team the confidence to move.',
    name: 'Rugved Shelke',
    role: 'CEO & Co-founder · StickerDump.exe',
  },
  {
    quote: 'A thoughtful partner from the first sketch to the moment we shipped.',
    name: 'Shravani Patil',
    role: 'Co-Founder · Sakhis Dwikala',
  },
  {
    quote: 'They listened closely, built with care, and kept asking how it could be better.',
    name: 'Yash Khude',
    role: 'Co-Founder · Dhanashree Foods',
  },
]

function PartnerMark({ index }: { index: number }) {
  const common = 'h-8 w-8 shrink-0'

  return (
    <div className="flex w-full max-w-[230px] sm:max-w-[260px] items-center gap-3 text-ink/50 grayscale transition duration-500 group-hover:text-signal group-hover:grayscale-0">
      <svg aria-hidden="true" viewBox="0 0 40 40" className={common} fill="none">
        {index % 4 === 0 && (
          <>
            <path d="M20 3 37 20 20 37 3 20Z" stroke="currentColor" strokeWidth="2" />
            <path d="M20 11 29 20 20 29 11 20Z" fill="currentColor" />
          </>
        )}
        {index % 4 === 1 && (
          <>
            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
            <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="20" r="5" fill="currentColor" />
          </>
        )}
        {index % 4 === 2 && (
          <>
            <path d="M6 31 16 9l8 14 5-9 5 17H6Z" fill="currentColor" />
            <path d="M11 31h23" stroke="currentColor" strokeWidth="2" />
          </>
        )}
        {index % 4 === 3 && (
          <>
            <rect x="5" y="5" width="30" height="30" rx="15" stroke="currentColor" strokeWidth="2" />
            <path d="M13 25V15l7 6 7-6v10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </>
        )}
      </svg>
      <span className="truncate font-mono text-[10px] tracking-[0.12em] uppercase">{PARTNERS[index]}</span>
    </div>
  )
}

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const dragDistance = useRef(0)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      if (trackRef.current) gsap.set(trackRef.current, { xPercent: 0 })
    },
    { scope: sectionRef },
  )

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(TESTIMONIALS.length - 1, index))
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
    const width = sectionRef.current?.querySelector('[data-testimonial-window]')?.clientWidth ?? 1
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
      data-theme="light"
      aria-labelledby="partners-heading"
      className="relative overflow-hidden bg-gradient-to-b from-bone via-bone 45% to-ink text-ink"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 md:px-8 md:pt-28">
        <h2
          id="partners-heading"
          className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm"
        >
          05 / PARTNERS
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-ink/15 py-8 md:grid-cols-4 md:gap-x-10 md:gap-y-12 md:py-12">
          {PARTNERS.map((partner, index) => (
            <div key={partner} className="group flex min-h-12 items-center justify-center">
              <PartnerMark index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-transparent via-ink/80 to-ink pt-28 pb-24 text-bone md:pt-40 md:pb-32">
        <div className="mx-auto w-full max-w-[1000px] px-5 md:px-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-bone/55 uppercase">
            A few words from the people we build with
          </p>

          <div className="mt-8 overflow-hidden" data-testimonial-window>
            <div
              ref={trackRef}
              className="flex touch-pan-y cursor-grab active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
            >
              {TESTIMONIALS.map((testimonial, index) => (
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
                      {testimonial.role}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-bone/20 pt-5">
            <span className="font-mono text-[10px] tracking-[0.12em] text-bone/55">
              {String(activeIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                disabled={activeIndex === 0}
                onClick={() => goTo(activeIndexRef.current - 1)}
                className="flex size-10 items-center justify-center border border-bone/25 font-mono text-lg transition-colors hover:border-bone disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                disabled={activeIndex === TESTIMONIALS.length - 1}
                onClick={() => goTo(activeIndexRef.current + 1)}
                className="flex size-10 items-center justify-center border border-bone/25 font-mono text-lg transition-colors hover:border-bone disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
