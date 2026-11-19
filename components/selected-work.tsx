'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { SectionLabel } from '@/components/section-label'
import { PROJECTS } from '@/data/projects'
import { gsap, useGSAP } from '@/lib/gsap'

const AUTOPLAY_DURATION = 8

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isOnScreen, setIsOnScreen] = useState(false)
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressTweenRef = useRef<gsap.core.Tween | null>(null)
  const prevIndexRef = useRef(0)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  // Listen for reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  // Section visibility via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Document tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      setIsDocumentVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Fade-up entrance on enter (no pin, no scrub)
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(section, { autoAlpha: 1, y: 0 })
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  const shouldPlayTimer =
    !isUserPaused &&
    isOnScreen &&
    isDocumentVisible &&
    !isHovered &&
    !isFocused &&
    !prefersReducedMotion

  const shouldPlayVideos = isOnScreen && isDocumentVisible && !prefersReducedMotion

  // Handle video playback and crossfade between slides
  useEffect(() => {
    const prevIndex = prevIndexRef.current
    const prevSlide = slideRefs.current[prevIndex]
    const nextSlide = slideRefs.current[activeIndex]
    const prevVideo = videoRefs.current[prevIndex]
    const nextVideo = videoRefs.current[activeIndex]

    if (prevIndex !== activeIndex) {
      if (prefersReducedMotion) {
        if (prevSlide) gsap.set(prevSlide, { autoAlpha: 0 })
        if (nextSlide) gsap.set(nextSlide, { autoAlpha: 1 })
      } else {
        if (prevSlide) {
          gsap.to(prevSlide, {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power3.out',
          })
        }
        if (nextSlide) {
          gsap.to(nextSlide, {
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
          })
        }
      }

      // Animate info panel content change
      if (infoRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          infoRef.current,
          { autoAlpha: 0.4, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        )
      }

      if (prevVideo && prevIndex !== activeIndex) {
        prevVideo.pause()
      }
    }

    if (nextVideo) {
      if (shouldPlayVideos) {
        nextVideo.play().catch(() => { })
      } else {
        nextVideo.pause()
      }
    }

    prevIndexRef.current = activeIndex
  }, [activeIndex, prefersReducedMotion, shouldPlayVideos])

  // Autoplay progress bar timer
  useEffect(() => {
    progressRefs.current.forEach((bar, idx) => {
      if (bar) {
        gsap.set(bar, {
          scaleX: idx === activeIndex && prefersReducedMotion ? 1 : 0,
        })
      }
    })

    if (progressTweenRef.current) {
      progressTweenRef.current.kill()
      progressTweenRef.current = null
    }

    if (prefersReducedMotion) return

    const activeBar = progressRefs.current[activeIndex]
    if (!activeBar) return

    const tween = gsap.fromTo(
      activeBar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_DURATION,
        ease: 'none',
        onComplete: () => {
          setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
        },
      },
    )

    progressTweenRef.current = tween

    if (!shouldPlayTimer) {
      tween.pause()
    }

    return () => {
      tween.kill()
    }
  }, [activeIndex, prefersReducedMotion]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pause / resume progress tween based on conditions
  useEffect(() => {
    const tween = progressTweenRef.current
    if (!tween || prefersReducedMotion) return

    if (shouldPlayTimer) {
      if (tween.paused()) tween.play()
    } else {
      if (!tween.paused()) tween.pause()
    }
  }, [shouldPlayTimer, prefersReducedMotion])

  // Pause / play toggle
  const togglePause = useCallback(() => {
    setIsUserPaused((prev) => !prev)
  }, [])

  // Keyboard navigation for tabs
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % PROJECTS.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = PROJECTS.length - 1
    }

    if (nextIndex !== currentIndex) {
      setActiveIndex(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  // Swipe handlers for stage
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
      } else {
        setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  const activeProject = PROJECTS[activeIndex]

  return (
    <section
      id="work"
      ref={sectionRef}
      data-theme="light"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
          setIsFocused(false)
        }
      }}
      className="relative overflow-hidden bg-bone py-20 text-ink md:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <SectionLabel>04 / Selected work</SectionLabel>

        {/* Media stage (8 cols) and Info panel (4 cols) */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-12 md:items-center md:gap-10 lg:gap-14">
          <div className="md:col-span-8">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-video max-h-[70svh] w-full overflow-hidden rounded-[2px] border border-ink/15 bg-ink/5"
            >
              {PROJECTS.map((project, index) => (
                <div
                  key={project.slug}
                  ref={(el) => {
                    slideRefs.current[index] = el
                  }}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    visibility: index === 0 ? 'visible' : 'hidden',
                  }}
                >
                  {Boolean(project.video) ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el
                      }}
                      src={project.video}
                      poster={project.image}
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 768px) 66vw, 100vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={infoRef}
            id={`panel-${activeProject.slug}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeProject.slug}`}
            className="flex flex-col justify-between gap-6 md:col-span-4"
          >
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {activeProject.category}
              </p>
              <h3 className="font-serif text-3xl leading-[1.05] text-ink md:text-4xl lg:text-5xl">
                {activeProject.name}
              </h3>
            </div>

            <dl className="space-y-3 border-t border-ink/15 pt-4">
              <div className="grid grid-cols-[5rem_1fr] gap-3 text-sm md:text-base">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Problem
                </dt>
                <dd className="text-ink/80">{activeProject.problem}</dd>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-3 text-sm md:text-base">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Built
                </dt>
                <dd className="text-ink/80">{activeProject.built}</dd>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-3 text-sm md:text-base">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Result
                </dt>
                <dd className="text-ink/80">{activeProject.result}</dd>
              </div>
            </dl>

            <div className="pt-2">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:underline hover:decoration-signal hover:underline-offset-4"
              >
                Visit live site <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab row below stage + Pause / Play toggle */}
        <div className="mt-10 md:mt-14">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Projects / 0{PROJECTS.length}
            </span>
            <button
              type="button"
              onClick={togglePause}
              aria-label={isUserPaused ? 'Start auto-advance' : 'Pause auto-advance'}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
            >
              <span aria-hidden="true" className="text-signal">
                {isUserPaused ? '▶' : '❚❚'}
              </span>
              <span>{isUserPaused ? 'Play' : 'Pause'}</span>
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Selected work projects"
            className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4 md:gap-6 lg:gap-8 md:pt-5"
          >
            {PROJECTS.map((project, index) => {
              const isActive = activeIndex === index
              return (
                <button
                  key={project.slug}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  role="tab"
                  id={`tab-${project.slug}`}
                  aria-controls={`panel-${project.slug}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="group flex flex-col text-left transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      0{index + 1}
                    </span>
                    <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                      {project.category}
                    </span>
                  </div>

                  <span
                    className={`mt-1 font-serif text-lg leading-tight transition-colors duration-300 md:text-2xl ${isActive
                      ? 'font-normal text-ink'
                      : 'text-ink/60 group-hover:text-ink'
                      }`}
                  >
                    {project.name}
                  </span>

                  <div className="relative mt-3 h-[1px] w-full overflow-hidden bg-ink/15">
                    <div
                      ref={(el) => {
                        progressRefs.current[index] = el
                      }}
                      className="absolute inset-y-0 left-0 w-full origin-left bg-signal"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
