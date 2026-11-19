'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { JourneyCollage } from '@/components/journey-collage'
import { JourneyLightbox } from '@/components/journey-lightbox'
import { useLenis } from '@/components/smooth-scroll'
import { HACKATHONS, type Hackathon } from '@/data/hackathons'
import { PRIMARY_CTA } from '@/lib/site'
import { cn } from '@/lib/utils'

export function OurJourney() {
  const [activeDepth, setActiveDepth] = useState(0)
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean
    hackathonIndex: number
    photoIndex: number
  }>({
    isOpen: false,
    hackathonIndex: 0,
    photoIndex: 0,
  })

  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const framesRef = useRef<(HTMLElement | null)[]>([])

  // Setup intersection observer for the depth indicator
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    framesRef.current.forEach((frameEl, index) => {
      if (!frameEl) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveDepth(index)
            }
          })
        },
        {
          rootMargin: '-20% 0px -40% 0px',
          threshold: 0.1,
        },
      )

      observer.observe(frameEl)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const scrollToFrame = useCallback(
    (index: number) => {
      const target = framesRef.current[index]
      if (!target) return

      const navEl = document.querySelector('header')
      const navHeight = navEl ? navEl.offsetHeight : 64

      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.2,
          offset: -(navHeight + index * 14),
        })
      } else {
        const targetTop = target.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: targetTop - (navHeight + index * 14),
          behavior: 'smooth',
        })
      }
    },
    [lenis],
  )

  const handleOpenPhoto = (hackathonIndex: number, photoIndex: number) => {
    setLightboxState({
      isOpen: true,
      hackathonIndex,
      photoIndex,
    })
  }

  const activeHackathon =
    lightboxState.isOpen && HACKATHONS[lightboxState.hackathonIndex]
      ? HACKATHONS[lightboxState.hackathonIndex]
      : null

  return (
    <section
      id="journey"
      ref={sectionRef}
      data-theme="teal"
      aria-labelledby="journey-heading"
      className="relative bg-teal text-bone overflow-x-clip"
    >
      {/* Film grain effect */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-0 z-10 opacity-30"
      />

      {/* Intro Header */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pt-24 pb-14 md:px-8 md:pt-32 md:pb-20">
        <p className="font-mono text-xs tracking-[0.2em] text-bone/60 uppercase md:text-sm">
          04 / OUR STORY · THE CALL STACK
        </p>

        <h2
          id="journey-heading"
          className="mt-6 font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-bone max-w-4xl text-balance"
        >
          Hackathons we&apos;ve participated in and{' '}
          <span className="relative inline-block font-serif italic text-bone">
            hosted.
            <span
              className="absolute bottom-1.5 left-0 h-[2.5px] w-full bg-signal"
              aria-hidden="true"
            />
          </span>
        </h2>

        <p className="mt-4 font-serif text-lg italic text-bone/75 md:text-xl max-w-2xl text-pretty">
          Every one taught us something. Every build used it.
        </p>
      </div>

      {/* Main Stack Container */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-24 md:px-8 md:pb-32">
        <div className="relative lg:grid lg:grid-cols-[140px_1fr] lg:gap-10">
          {/* Desktop Left Rail: Call stack depth */}
          <aside className="pointer-events-none sticky top-28 z-40 hidden h-fit flex-col lg:flex">
            <span className="font-mono text-xs tracking-[0.14em] text-bone/80">
              depth: {String(activeDepth + 1).padStart(2, '0')}
            </span>

            <nav
              aria-label="Journey frames"
              className="pointer-events-auto relative mt-6 flex flex-col gap-5 border-l border-bone/20 pl-4 py-1"
            >
              {HACKATHONS.map((h, i) => {
                const isActive = activeDepth === i
                return (
                  <button
                    key={h.slug}
                    type="button"
                    onClick={() => scrollToFrame(i)}
                    className={cn(
                      'group flex items-center gap-3 text-left font-mono text-xs tracking-wider transition-colors duration-200 cursor-pointer',
                      isActive ? 'text-signal font-medium' : 'text-bone/50 hover:text-bone/90',
                    )}
                    aria-label={`Jump to frame ${i + 1}: ${h.shortName}`}
                  >
                    <span
                      className={cn(
                        'size-2 rounded-full border transition-all duration-200',
                        isActive
                          ? 'border-signal bg-signal scale-125'
                          : 'border-bone/40 bg-teal group-hover:border-bone/80',
                      )}
                    />
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span className="hidden xl:inline text-[10px] text-bone/40 group-hover:text-bone/70 truncate max-w-[100px]">
                      {h.shortName}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Frames Stack */}
          <div className="flex flex-col gap-10 md:gap-14 lg:gap-20">
            {HACKATHONS.map((hackathon, index) => {
              const depthNumber = String(index + 1).padStart(2, '0')

              return (
                <article
                  key={hackathon.slug}
                  id={`journey-${hackathon.slug}`}
                  ref={(el) => {
                    framesRef.current[index] = el
                  }}
                  style={{
                    top: `calc(var(--nav-height, 64px) + ${index * 14}px)`,
                    zIndex: index + 1,
                  }}
                  className={cn(
                    'group relative rounded-[2px] border border-bone/15 bg-[#0f2d30] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.2)]',
                    'lg:sticky',
                  )}
                  aria-labelledby={`journey-${hackathon.slug}-title`}
                >
                  {/* Frame Header strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold tracking-[0.16em] text-bone/85 uppercase">
                        frame_{depthNumber} · {hackathon.shortName}
                      </span>
                      {hackathon.badge.text && (
                        <span
                          className={cn(
                            'rounded-[2px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                            hackathon.badge.tone === 'winner' &&
                              'bg-signal text-ink font-semibold',
                            hackathon.badge.tone === 'organizer' &&
                              'border border-signal text-signal font-semibold',
                            hackathon.badge.tone === 'first' &&
                              'bg-bone/15 text-bone font-medium',
                            hackathon.badge.tone === 'selected' &&
                              'border border-bone/30 text-bone/80',
                          )}
                        >
                          {hackathon.badge.text}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs tracking-wider text-bone/50">
                      {hackathon.dateLabel} · {hackathon.city}
                    </span>
                  </div>

                  {/* Frame Body: Content + Collage */}
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10 items-start">
                    {/* Left Column: Narrative */}
                    <div className="flex flex-col">
                      <p className="font-mono text-xs uppercase tracking-wider text-bone/50">
                        {hackathon.venue}
                        {hackathon.duration ? ` · ${hackathon.duration}` : ''}
                        {hackathon.teamLabel ? ` · ${hackathon.teamLabel}` : ''}
                      </p>

                      <h3
                        id={`journey-${hackathon.slug}-title`}
                        className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-bone text-balance"
                      >
                        {hackathon.title}
                      </h3>

                      <p className="mt-3 font-serif italic text-bone/90 text-base sm:text-lg leading-snug text-pretty">
                        {hackathon.summary}
                      </p>

                      <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-bone/75 text-pretty">
                        {hackathon.story}
                      </p>

                      {/* Fact chips */}
                      {hackathon.facts && hackathon.facts.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {hackathon.facts.map((fact) => (
                            <span
                              key={fact}
                              className="rounded-[2px] bg-bone/10 px-2.5 py-1 font-mono text-[11px] tracking-wide text-bone/75"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* What we learned callout */}
                      <div className="mt-6 border-l-2 border-signal pl-4 py-0.5">
                        <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-bone/50">
                          What we learned
                        </span>
                        <p className="mt-1 font-serif text-base sm:text-lg italic text-bone leading-snug">
                          {hackathon.learned}
                        </p>
                      </div>

                      {/* Links (GitHub, etc.) */}
                      {hackathon.links && hackathon.links.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {hackathon.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] items-center gap-2 rounded-[2px] border border-bone/25 px-4 py-2 font-mono text-xs uppercase tracking-wider text-bone transition-colors duration-200 hover:border-signal hover:text-signal focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-signal"
                            >
                              <span>{link.label}</span>
                              <span aria-hidden="true">↗</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Scrapbook Collage */}
                    <div className="relative w-full">
                      <JourneyCollage
                        hackathon={hackathon}
                        frameIndex={index}
                        onPhotoClick={(photoIdx) => handleOpenPhoto(index, photoIdx)}
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Finale: Return block */}
        <div
          data-journey-return
          className="relative z-30 mx-auto mt-20 max-w-3xl rounded-[2px] border border-bone/15 bg-[#0a2022] p-8 sm:p-12 md:p-16 text-center shadow-2xl"
        >
          {/* Call stack unwind visualization */}
          <div
            aria-hidden="true"
            className="mx-auto flex w-fit flex-col items-start gap-1 font-mono text-xs text-bone/40 select-none pb-8"
          >
            <span className="opacity-40">return frame_06;</span>
            <span className="opacity-50">return frame_05;</span>
            <span className="opacity-60">return frame_04;</span>
            <span className="opacity-70">return frame_03;</span>
            <span className="opacity-80">return frame_02;</span>
            <span className="opacity-90">return frame_01;</span>
            <span className="text-signal font-semibold pt-1">return Recursa;</span>
          </div>

          <h3 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-tight text-bone text-balance">
            Recursa, today.
          </h3>

          <p className="mx-auto mt-5 max-w-xl font-serif text-base sm:text-lg italic text-bone/75 text-pretty">
            Born from intense sprints, 2,000 km journeys, and 40-hour hackathons. We build
            production software with the same speed, craftsmanship, and endurance.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PRIMARY_CTA.href}
              className="inline-flex min-h-[48px] items-center gap-3 rounded-[2px] bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink font-semibold transition-colors duration-200 hover:bg-bone focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-signal"
            >
              <span>{PRIMARY_CTA.label}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <Link
              href="/team"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[2px] border border-bone/25 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-signal hover:text-signal focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-signal"
            >
              <span>Meet the team</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <JourneyLightbox
        hackathon={activeHackathon}
        photoIndex={lightboxState.photoIndex}
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        onNavigate={(newIdx) => setLightboxState((prev) => ({ ...prev, photoIndex: newIdx }))}
      />
    </section>
  )
}
