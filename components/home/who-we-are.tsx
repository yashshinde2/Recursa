'use client'

import { useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const MANIFESTO = [
  'We build thoughtful digital products that solve real problems.',
  'We learn from every launch, every question, every new idea.',
  'Then we rebuild, refine, and make the next thing better.',
]

const STATS = [
  { value: 12, label: 'projects shipped' },
  { value: 8, label: 'hackathons' },
  { value: 15, label: 'technologies' },
]

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const words = gsap.utils.toArray<HTMLElement>('[data-manifesto-word]', section)
      const counters = gsap.utils.toArray<HTMLElement>('[data-stat-counter]', section)
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          words,
          { color: 'var(--steel)' },
          {
            color: 'var(--ink)',
            ease: 'none',
            stagger: 0.035,
            scrollTrigger: {
              trigger: '[data-manifesto-pin]',
              start: 'top top',
              end: '+=170%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          },
        )

        for (const counter of counters) {
          const count = { value: 0 }
          const target = Number(counter.dataset.statCounter)

          ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(count, {
                value: target,
                duration: 1.4,
                ease: 'power3.out',
                onUpdate: () => {
                  counter.textContent = String(Math.round(count.value))
                },
              })
            },
          })
        }
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        for (const counter of counters) {
          counter.textContent = counter.dataset.statCounter ?? '0'
        }
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      data-theme="light"
      aria-labelledby="who-we-are-heading"
      className="relative bg-bone text-ink"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 md:px-8 md:pt-28">
        <h2
          id="who-we-are-heading"
          className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm"
        >
          02 / WHO WE ARE
        </h2>
      </div>

      <div
        data-manifesto-pin
        className="mx-auto flex min-h-[75svh] w-full max-w-[1440px] items-center px-5 py-20 md:min-h-svh md:px-8"
      >
        <p className="max-w-[1200px] font-serif text-[clamp(2.6rem,6.8vw,7.5rem)] leading-[0.98] tracking-tight">
          {MANIFESTO.map((sentence, sentenceIndex) => {
            const words = sentence.split(' ')

            return (
              <span key={sentenceIndex}>
                {words.map((word, wordIndex) => (
                  <span key={`${sentenceIndex}-${wordIndex}`}>
                    <span data-manifesto-word className="text-ink">
                      {word}
                    </span>
                    {wordIndex < words.length - 1 ? ' ' : ''}
                  </span>
                ))}
                {sentenceIndex < MANIFESTO.length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-5 pb-20 md:grid-cols-3 md:px-8 md:pb-28">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex items-baseline gap-3 border-ink/20 py-6 md:py-0 ${
              index > 0 ? 'border-t md:border-t-0 md:border-l md:pl-8' : ''
            } ${index < STATS.length - 1 ? 'md:pr-8' : ''}`}
          >
            <span
              data-stat-counter={stat.value}
              aria-hidden="true"
              className="font-serif text-5xl leading-none tabular-nums md:text-6xl"
            >
              0
            </span>
            <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase md:text-sm">
              {stat.label}
            </span>
            <span className="sr-only">
              {stat.value} {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
