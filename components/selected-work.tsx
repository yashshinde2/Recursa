'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { SectionLabel } from '@/components/section-label'
import { PROJECTS } from '@/data/projects'
import { gsap, useGSAP } from '@/lib/gsap'

const AUTOPLAY_DURATION = 8

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isOnScreen, setIsOnScreen] = useState(false)
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isSaveData, setIsSaveData] = useState(false)
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({})

  const sectionRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const mediaInnerRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

  const progressTweenRef = useRef<gsap.core.Timeline | null>(null)
  const mediaTweenRef = useRef<gsap.core.Tween | null>(null)
  const infoTweenRef = useRef<gsap.core.Tween | null>(null)
  const prevIndexRef = useRef(0)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  // Listen for reduced motion preference and connection saveData
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mql.addEventListener('change', handleChange)

    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection
      if (conn?.saveData) {
        setIsSaveData(true)
      }
    }

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
      { threshold: 0.15 },
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

  // Fade-up entrance on enter
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

  const canAnimate = !prefersReducedMotion && !isSaveData

  const shouldPlayTimer =
    canAnimate &&
    !isUserPaused &&
    isOnScreen &&
    isDocumentVisible &&
    !isHovered &&
    !isFocused

  const shouldPlayVideos = canAnimate && isOnScreen && isDocumentVisible

  const handleVideoError = useCallback((index: number) => {
    setVideoErrors((prev) => ({ ...prev, [index]: true }))
  }, [])

  // Media crossfade, slow initial zoom (1.06 -> 1 over 1.4s), and breathing scale (1 -> 1.03)
  useEffect(() => {
    const prevIndex = prevIndexRef.current
    const isInitialMount = prevIndex === activeIndex && prevIndexRef.current === 0

    // Handle videos: pause previous
    if (prevIndex !== activeIndex) {
      const prevVideo = videoRefs.current[prevIndex]
      if (prevVideo) {
        prevVideo.pause()
      }
    }

    // Play current active video
    const currentVideo = videoRefs.current[activeIndex]
    if (currentVideo && !videoErrors[activeIndex]) {
      if (shouldPlayVideos) {
        currentVideo.play().catch(() => {})
      } else {
        currentVideo.pause()
      }
    }

    const prevSlide = slideRefs.current[prevIndex]
    const nextSlide = slideRefs.current[activeIndex]
    const nextMediaInner = mediaInnerRefs.current[activeIndex]

    if (!canAnimate) {
      slideRefs.current.forEach((slide, idx) => {
        if (slide) {
          gsap.set(slide, {
            autoAlpha: idx === activeIndex ? 1 : 0,
            zIndex: idx === activeIndex ? 2 : 1,
          })
        }
      })
      prevIndexRef.current = activeIndex
      return
    }

    // Kill previous media breathing tween
    if (mediaTweenRef.current) {
      mediaTweenRef.current.kill()
      mediaTweenRef.current = null
    }

    if (prevIndex !== activeIndex && prevSlide && nextSlide && nextMediaInner) {
      // Add will-change only during the transition
      gsap.set([prevSlide, nextSlide, nextMediaInner], { willChange: 'opacity, transform' })

      // Crossfade media 0.7s with power3.out
      gsap.to(prevSlide, {
        autoAlpha: 0,
        zIndex: 1,
        duration: 0.7,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(prevSlide, { willChange: 'auto' })
        },
      })

      gsap.to(nextSlide, {
        autoAlpha: 1,
        zIndex: 2,
        duration: 0.7,
        ease: 'power3.out',
      })

      // Incoming media: slow scale from 1.06 to 1 over 1.4s
      gsap.fromTo(
        nextMediaInner,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set([nextSlide, nextMediaInner], { willChange: 'auto' })
            // Active media gets slow breathing scale 1 to 1.03 over the remaining duration
            mediaTweenRef.current = gsap.to(nextMediaInner, {
              scale: 1.03,
              duration: 6.6,
              ease: 'sine.inOut',
            })
          },
        },
      )
    } else if (isInitialMount && nextMediaInner) {
      // Initial breathing on mount
      mediaTweenRef.current = gsap.to(nextMediaInner, {
        scale: 1.03,
        duration: 8,
        ease: 'sine.inOut',
      })
    }

    prevIndexRef.current = activeIndex
  }, [activeIndex, canAnimate, shouldPlayVideos, videoErrors])

  // Pause / resume active video when off-screen or tab is hidden
  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex]
    if (!currentVideo || videoErrors[activeIndex]) return

    if (shouldPlayVideos) {
      currentVideo.play().catch(() => {})
    } else {
      currentVideo.pause()
    }
  }, [shouldPlayVideos, activeIndex, videoErrors])

  // Info panel masked slide-up transition
  useEffect(() => {
    if (displayedIndex === activeIndex) return

    if (!canAnimate || !infoRef.current) {
      setDisplayedIndex(activeIndex)
      return
    }

    if (infoTweenRef.current) {
      infoTweenRef.current.kill()
      infoTweenRef.current = null
    }

    const items = infoRef.current.querySelectorAll('[data-reveal-item]')

    // Outgoing text fades out quickly first
    gsap.to(items, {
      autoAlpha: 0,
      y: -6,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        setDisplayedIndex(activeIndex)
        requestAnimationFrame(() => {
          if (!infoRef.current) return
          const newItems = infoRef.current.querySelectorAll('[data-reveal-item]')
          infoTweenRef.current = gsap.fromTo(
            newItems,
            { yPercent: 105, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: 'power3.out',
            },
          )
        })
      },
    })
  }, [activeIndex, displayedIndex, canAnimate])

  // Drive auto-advance and the tab progress bar from ONE gsap tween (8 seconds)
  useEffect(() => {
    // Reset all progress bars
    progressRefs.current.forEach((bar, idx) => {
      if (bar) {
        gsap.set(bar, {
          scaleX: idx === activeIndex && !canAnimate ? 1 : 0,
        })
      }
    })

    if (progressTweenRef.current) {
      progressTweenRef.current.kill()
      progressTweenRef.current = null
    }

    if (!canAnimate) return

    const activeBar = progressRefs.current[activeIndex]
    if (!activeBar) return

    // ONE GSAP timeline driving the 8-second progress line and advance onComplete
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
      },
    })

    tl.fromTo(
      activeBar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_DURATION,
        ease: 'none',
      },
      0,
    )

    // Preload the NEXT project's video during the last 2 seconds (at 6s mark)
    tl.call(
      () => {
        const nextIndex = (activeIndex + 1) % PROJECTS.length
        const nextVideo = videoRefs.current[nextIndex]
        if (nextVideo && !videoErrors[nextIndex]) {
          nextVideo.preload = 'auto'
        }
      },
      [],
      6,
    )

    progressTweenRef.current = tl

    if (!shouldPlayTimer) {
      tl.pause()
    }

    return () => {
      tl.kill()
    }
  }, [activeIndex, canAnimate]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pause / resume progress tween based on conditions
  useEffect(() => {
    const tween = progressTweenRef.current
    if (!tween || !canAnimate) return

    if (shouldPlayTimer) {
      if (tween.paused()) tween.resume()
    } else {
      if (!tween.paused()) tween.pause()
    }
  }, [shouldPlayTimer, canAnimate])

  // Clean up all tweens on unmount
  useEffect(() => {
    return () => {
      progressTweenRef.current?.kill()
      mediaTweenRef.current?.kill()
      infoTweenRef.current?.kill()
    }
  }, [])

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

  const displayedProject = PROJECTS[displayedIndex]

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
              {PROJECTS.map((project, index) => {
                const isInitial = index === 0
                const hasVideo = Boolean(project.video) && !videoErrors[index] && canAnimate

                return (
                  <div
                    key={project.slug}
                    ref={(el) => {
                      slideRefs.current[index] = el
                    }}
                    className="absolute inset-0 h-full w-full overflow-hidden"
                    style={{
                      opacity: isInitial ? 1 : 0,
                      visibility: isInitial ? 'visible' : 'hidden',
                      zIndex: isInitial ? 2 : 1,
                    }}
                  >
                    <div
                      ref={(el) => {
                        mediaInnerRefs.current[index] = el
                      }}
                      className="relative h-full w-full origin-center"
                    >
                      {/* High-res poster image via next/image */}
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(min-width: 768px) 66vw, 100vw"
                        priority={isInitial}
                        className="object-cover"
                      />

                      {/* Video layer if enabled & not errored */}
                      {hasVideo && (
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el
                          }}
                          src={project.video}
                          poster={project.image}
                          muted
                          loop
                          playsInline
                          preload={isInitial ? 'auto' : 'none'}
                          onError={() => handleVideoError(index)}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            ref={infoRef}
            id={`panel-${displayedProject.slug}`}
            role="tabpanel"
            aria-labelledby={`tab-${displayedProject.slug}`}
            className="flex flex-col justify-between gap-6 md:col-span-4"
          >
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <p
                  data-reveal-item
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {displayedProject.category}
                </p>
              </div>
              <div className="overflow-hidden">
                <h3
                  data-reveal-item
                  className="font-serif text-3xl leading-[1.05] text-ink md:text-4xl lg:text-5xl"
                >
                  {displayedProject.name}
                </h3>
              </div>
            </div>

            <dl className="space-y-3 border-t border-ink/15 pt-4">
              <div className="overflow-hidden">
                <div
                  data-reveal-item
                  className="grid grid-cols-[5rem_1fr] gap-3 text-sm md:text-base"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Problem
                  </dt>
                  <dd className="text-ink/80">{displayedProject.problem}</dd>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  data-reveal-item
                  className="grid grid-cols-[5rem_1fr] gap-3 text-sm md:text-base"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Built
                  </dt>
                  <dd className="text-ink/80">{displayedProject.built}</dd>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  data-reveal-item
                  className="grid grid-cols-[5rem_1fr] gap-3 text-sm md:text-base"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Result
                  </dt>
                  <dd className="text-ink/80">{displayedProject.result}</dd>
                </div>
              </div>
            </dl>

            <div className="overflow-hidden pt-2">
              <div data-reveal-item>
                <a
                  href={displayedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:underline hover:decoration-signal hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  Visit live site <span aria-hidden="true">↗</span>
                </a>
              </div>
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
                    className={`mt-1 font-serif text-lg leading-tight transition-colors duration-300 md:text-2xl ${
                      isActive
                        ? 'font-normal text-ink'
                        : 'text-ink/50 group-hover:text-ink'
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
