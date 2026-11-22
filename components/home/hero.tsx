'use client'

import Image from 'next/image'
import { useRef } from 'react'

import { HeroSquares } from '@/components/home/hero-squares'
import { MagneticButton } from '@/components/magnetic-button'
import { useLenis } from '@/components/smooth-scroll'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { scrollToSection } from '@/lib/scroll-to'
import { HERO, PRIMARY_CTA } from '@/lib/site'

const LOGO_NUDGE_Y = -3

type HeroProps = {
  /** False while the loader still covers the page; the intro waits for it. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const lenis = useLenis()

  const handleStoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToSection(lenis, HERO.storyHref, { duration: 1.2 })
  }

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || !ready) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(section)
        const headline = select('[data-hero-headline]')[0] as HTMLElement
        const lines = select('[data-hero-line]') as HTMLElement[]
        const underline = select('[data-hero-underline]')[0] as HTMLElement
        const squares = select('[data-hero-squares]')[0] as HTMLElement
        const items = select('[data-hero-item]') as HTMLElement[]
        const cue = select('[data-hero-cue]')[0]
        const logo = select('[data-hero-logo]:not([data-hero-logo-m])')[0] as HTMLElement
        const glow = select('[data-hero-glow]')[0] as HTMLElement
        const float = select('[data-hero-float]')[0] as HTMLElement
        const tilt = select('[data-hero-tilt]')[0] as HTMLElement
        const logoM = select('[data-hero-logo-m]')[0] as HTMLElement
        const glowM = select('[data-hero-glow-m]')[0] as HTMLElement
        const floatM = select('[data-hero-float-m]')[0] as HTMLElement

        headline.dataset.reveal = 'ready'
        for (const element of [squares, ...items]) {
          element.dataset.reveal = 'ready'
        }

        if (logo) gsap.set(logo, { autoAlpha: 0, scale: 0.72, y: 30, willChange: 'transform, opacity' })
        if (glow) gsap.set(glow, { autoAlpha: 0 })
        if (logoM) gsap.set(logoM, { autoAlpha: 0, scale: 0.8, y: 20, willChange: 'transform, opacity' })
        if (glowM) gsap.set(glowM, { autoAlpha: 0 })

        gsap.fromTo(
          lines,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.3,
            stagger: 0.12,
            ease: 'power3.out',
          },
        )

        if (underline) {
          gsap.fromTo(
            underline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              delay: 0.75,
              ease: 'power3.out',
            },
          )
        }

        gsap.fromTo(
          squares,
          { autoAlpha: 0, scale: 1.18 },
          { autoAlpha: 1, scale: 1, duration: 2.4, ease: 'power3.out' },
        )

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            delay: 0.45,
            stagger: 0.1,
            ease: 'power3.out',
          },
        )

        gsap.fromTo(
          cue,
          { yPercent: -100 },
          {
            yPercent: 100,
            duration: 2.2,
            delay: 1.2,
            ease: 'power3.out',
            repeat: -1,
            repeatDelay: 0.2,
          },
        )

        const ambientTweens: (gsap.core.Tween | gsap.core.Timeline)[] = []

        if (logo) {
          gsap.to(logo, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.8,
            delay: 0.35,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(logo, { willChange: 'auto' })
              if (float) {
                const floatY = gsap.fromTo(
                  float,
                  { y: -10 },
                  { y: 10, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 },
                )
                const floatRot = gsap.fromTo(
                  float,
                  { rotation: -0.6 },
                  { rotation: 0.6, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 },
                )
                ambientTweens.push(floatY, floatRot)
              }
            },
          })
        }

        if (glow) {
          gsap.to(glow, {
            autoAlpha: 1,
            duration: 2.2,
            delay: 0.35,
            ease: 'power2.out',
          })
        }

        if (logoM) {
          gsap.to(logoM, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.4,
            delay: 0.35,
            ease: 'power3.out',
            onComplete: () => {
              if (floatM) {
                const floatYM = gsap.fromTo(
                  floatM,
                  { y: -8 },
                  { y: 8, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 },
                )
                ambientTweens.push(floatYM)
              }
            },
          })
        }

        if (glowM) {
          gsap.to(glowM, {
            autoAlpha: 1,
            duration: 2.2,
            delay: 0.35,
            ease: 'power2.out',
          })
        }

        const visibility = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            ambientTweens.forEach((t) => t.paused(!self.isActive))
          },
        })

        return () => visibility.kill()
      })

      media.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const select = gsap.utils.selector(section)
          const tilt = select('[data-hero-tilt]')[0] as HTMLElement
          if (!tilt) return

          const settle = { duration: 1.2, ease: 'power3.out' }
          gsap.set(tilt, { transformPerspective: 900 })
          const toX = gsap.quickTo(tilt, 'x', settle)
          const toY = gsap.quickTo(tilt, 'y', settle)
          const toRotY = gsap.quickTo(tilt, 'rotationY', settle)
          const toRotX = gsap.quickTo(tilt, 'rotationX', settle)

          const handleMove = (event: PointerEvent) => {
            const rawX = (event.clientX / window.innerWidth - 0.5) * 2
            const rawY = (event.clientY / window.innerHeight - 0.5) * 2
            const nx = -rawX
            const ny = -rawY

            toX(nx * 14)
            toY(ny * 10)
            toRotY(nx * 6)
            toRotX(-ny * 4)
          }

          const handleLeave = () => {
            toX(0)
            toY(0)
            toRotY(0)
            toRotX(0)
          }

          window.addEventListener('pointermove', handleMove)
          document.documentElement.addEventListener('pointerleave', handleLeave)

          return () => {
            window.removeEventListener('pointermove', handleMove)
            document.documentElement.removeEventListener('pointerleave', handleLeave)
          }
        },
      )

      media.add('(prefers-reduced-motion: reduce)', () => {
        const select = gsap.utils.selector(section)
        const headline = select('[data-hero-headline]')[0] as HTMLElement
        const lines = select('[data-hero-line]') as HTMLElement[]
        const underline = select('[data-hero-underline]')[0] as HTMLElement
        const squares = select('[data-hero-squares]')[0] as HTMLElement
        const items = select('[data-hero-item]') as HTMLElement[]
        const logo = select('[data-hero-logo]:not([data-hero-logo-m])')[0] as HTMLElement
        const glow = select('[data-hero-glow]')[0] as HTMLElement
        const logoM = select('[data-hero-logo-m]')[0] as HTMLElement
        const glowM = select('[data-hero-glow-m]')[0] as HTMLElement

        if (headline) headline.dataset.reveal = 'ready'
        for (const element of [squares, ...items]) {
          if (element) element.dataset.reveal = 'ready'
        }
        gsap.set(lines, { yPercent: 0 })
        if (underline) gsap.set(underline, { scaleX: 1 })
        if (squares) gsap.set(squares, { autoAlpha: 1, scale: 1 })
        gsap.set(items, { autoAlpha: 1, y: 0 })

        if (logo) gsap.set(logo, { autoAlpha: 1, scale: 1, y: 0 })
        if (glow) gsap.set(glow, { autoAlpha: 1 })
        if (logoM) gsap.set(logoM, { autoAlpha: 1, scale: 1, y: 0 })
        if (glowM) gsap.set(glowM, { autoAlpha: 1 })
      })

      return () => media.revert()
    },
    { dependencies: [ready] },
  )

  return (
    <section
      ref={sectionRef}
      id="home"
      data-theme="dark"
      aria-labelledby="hero-heading"
      className="grain relative flex min-h-[calc(100svh-var(--nav-height))] flex-col overflow-hidden [&_[data-square]]:!border-steel/55"
    >
      <HeroSquares />

      {/* In-spiral 3D Logo (Desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block"
      >
        <div className="absolute top-1/2 left-1/2 aspect-square h-[135%] -translate-x-1/2 -translate-y-1/2 lg:left-[64%]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Glow behind the logo */}
            <div
              data-hero-glow
              className="absolute aspect-square w-[clamp(420px,39vw,750px)] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 90, 31, 0.18) 0%, rgba(255, 90, 31, 0) 70%)',
              }}
            />

            {/* Logo outer for float/entrance, inner for mouse tilt */}
            <div
              data-hero-logo
              className="transform-gpu"
              style={{
                transform: `translateY(${LOGO_NUDGE_Y}%)`,
              }}
            >
              <div data-hero-float className="transform-gpu">
                <div data-hero-tilt className="transform-gpu will-change-transform">
                  <Image
                    src="/brand/recursa-3d-hero.webp"
                    width={1400}
                    height={832}
                    alt="Recursa Technologies 3D Logo — Software & Product Engineering"
                    sizes="(min-width: 1024px) 34vw, 70vw"
                    priority
                    draggable={false}
                    className="h-auto w-[clamp(300px,28vw,540px)] select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-16 md:px-8">
        {/* Mobile & Tablet 3D Logo */}
        <div
          data-hero-logo
          data-hero-logo-m
          className="relative self-end -mr-3 mb-6 w-[min(64vw,320px)] transform-gpu lg:hidden"
        >
          <div
            data-hero-glow-m
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 90, 31, 0.18) 0%, rgba(255, 90, 31, 0) 70%)',
            }}
          />
          <div data-hero-float-m className="transform-gpu will-change-transform">
            <Image
              src="/brand/recursa-3d-hero.webp"
              width={1400}
              height={832}
              alt="Recursa Technologies 3D Logo — Software & Product Engineering"
              priority
              draggable={false}
              className="h-auto w-full select-none"
            />
          </div>
        </div>

        <h1
          id="hero-heading"
          data-hero-headline
          data-reveal="pending"
          className="text-[clamp(2.2rem,min(9vw,15svh),8.5rem)] leading-[0.93] font-normal"
        >
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <span data-hero-line className="block whitespace-nowrap">
              Big problems are
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <span data-hero-line className="block whitespace-nowrap">
              just small ones,
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <span data-hero-line className="block whitespace-nowrap">
              <span className="relative inline-block font-serif italic">
                called again.
                <span
                  data-hero-underline
                  className="absolute left-0 bottom-[-0.12em] h-[2px] w-full origin-left bg-signal"
                />
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-12">
          <p
            data-hero-item
            data-reveal="pending"
            className="max-w-[40rem] font-sans text-base leading-relaxed text-muted-foreground text-pretty md:text-lg"
          >
            <span className="text-foreground">Recursa Technologies</span>{' '}
            {HERO.description.slice('Recursa Technologies'.length).trimStart()}
          </p>

          <div
            data-hero-item
            data-reveal="pending"
            className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-4"
          >
            <MagneticButton href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </MagneticButton>
            <a
              href={HERO.storyHref}
              onClick={handleStoryClick}
              className="group relative inline-flex items-center gap-2 py-2 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-[scale] after:duration-500 after:ease-out hover:after:scale-x-100"
            >
              {HERO.storyLabel}
              <span
                aria-hidden="true"
                className="transition-[translate] duration-500 ease-out group-hover:translate-y-1"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-item
        data-reveal="pending"
        aria-hidden="true"
        className="relative flex justify-center pb-6"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-bone/20">
          <span data-hero-cue className="absolute inset-0 bg-bone" />
        </span>
      </div>
    </section>
  )
}
