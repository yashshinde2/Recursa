'use client'

import { useRef } from 'react'

import { HeroSquares } from '@/components/home/hero-squares'
import { MagneticButton } from '@/components/magnetic-button'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { PRIMARY_CTA } from '@/lib/site'

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
        const squares = select('[data-hero-squares]')[0] as HTMLElement
        const items = select('[data-hero-item]') as HTMLElement[]
        const cue = select('[data-hero-cue]')[0]

        const split = SplitText.create(headline, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'reveal-line',
          autoSplit: true,
          aria: 'none',
          onSplit: (self) => {
            headline.dataset.reveal = 'ready'

            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.3,
              stagger: 0.12,
              ease: 'power3.out',
            })
          },
        })

        for (const element of [squares, ...items]) {
          element.dataset.reveal = 'ready'
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

        return () => split.revert()
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
      className="grain relative flex min-h-[calc(100svh-var(--nav-height))] flex-col overflow-hidden"
    >
      <HeroSquares />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-16 md:px-8">
        <h1
          id="hero-heading"
          data-hero-headline
          data-reveal="pending"
          className="text-[clamp(3.5rem,10vw,10.5rem)] leading-[0.95]"
        >
          We build.
          <br />
          Then we build <em>better.</em>
        </h1>

        <p
          data-hero-item
          data-reveal="pending"
          className="mt-8 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase md:mt-10 md:text-sm"
        >
          {'SaaS · Web · Mobile · IoT'}
        </p>

        <div
          data-hero-item
          data-reveal="pending"
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12"
        >
          <MagneticButton href={PRIMARY_CTA.href} size="lg">
            {PRIMARY_CTA.label}
          </MagneticButton>
          <a
            href="#journey"
            className="group relative inline-flex items-center gap-2 py-2 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-[scale] after:duration-500 after:ease-out hover:after:scale-x-100"
          >
            See our story
            <span
              aria-hidden="true"
              className="transition-[translate] duration-500 ease-out group-hover:translate-y-1"
            >
              ↓
            </span>
          </a>
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
