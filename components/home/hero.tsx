'use client'

import { useRef } from 'react'

import { HeroSquares } from '@/components/home/hero-squares'
import { MagneticButton } from '@/components/magnetic-button'
import { gsap, useGSAP } from '@/lib/gsap'
import { HERO, PRIMARY_CTA } from '@/lib/site'

type HeroProps = {
  /** False while the loader still covers the page; the intro waits for it. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

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

        headline.dataset.reveal = 'ready'
        for (const element of [squares, ...items]) {
          element.dataset.reveal = 'ready'
        }

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
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        const select = gsap.utils.selector(section)
        const headline = select('[data-hero-headline]')[0] as HTMLElement
        const lines = select('[data-hero-line]') as HTMLElement[]
        const underline = select('[data-hero-underline]')[0] as HTMLElement
        const squares = select('[data-hero-squares]')[0] as HTMLElement
        const items = select('[data-hero-item]') as HTMLElement[]

        if (headline) headline.dataset.reveal = 'ready'
        for (const element of [squares, ...items]) {
          if (element) element.dataset.reveal = 'ready'
        }
        gsap.set(lines, { yPercent: 0 })
        if (underline) gsap.set(underline, { scaleX: 1 })
        if (squares) gsap.set(squares, { autoAlpha: 1, scale: 1 })
        gsap.set(items, { autoAlpha: 1, y: 0 })
      })

      return () => media.revert()
    },
    { dependencies: [ready] },
  )

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="hero-heading"
      className="grain relative flex min-h-[calc(100svh-var(--nav-height))] flex-col overflow-hidden [&_[data-square]]:!border-steel/55"
    >
      <HeroSquares />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-16 md:px-8">
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
