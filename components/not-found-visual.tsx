'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'

const SQUARES = [82, 62, 42, 22]

export function NotFoundVisual() {
  const markRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mark = markRef.current
      if (!mark) return
      const squares = mark.querySelectorAll('[data-error-square]')
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.1 })
        timeline
          .fromTo(
            squares,
            { scale: 0.72, rotation: -12, autoAlpha: 0.35 },
            { scale: 1, rotation: 0, autoAlpha: 1, duration: 1.15, stagger: 0.1, ease: 'power3.out' },
          )
          .to(squares, { scale: 1.35, rotation: 8, autoAlpha: 0, duration: 0.8, stagger: 0.07, ease: 'power3.in' })
          .set(squares, { clearProps: 'all' })
        return () => timeline.kill()
      })
      return () => media.revert()
    },
    { scope: markRef },
  )

  return (
    <main
      id="main"
      data-theme="dark"
      className="relative flex min-h-[calc(100svh-var(--nav-height))] flex-1 items-center overflow-hidden bg-ink text-bone"
    >
      <div
        ref={markRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[70%] grid aspect-square w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 place-items-center"
      >
        {SQUARES.map((size, index) => (
          <div
            key={size}
            data-error-square
            className={`[grid-area:1/1] aspect-square border ${
              index === SQUARES.length - 1 ? 'border-signal/65' : 'border-steel/25'
            }`}
            style={{ width: `${size}%` }}
          />
        ))}
      </div>
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <p className="font-mono text-xs tracking-[0.16em] text-signal uppercase">ERROR / 404</p>
        <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.2rem,8vw,8rem)] leading-[0.95] tracking-tight">
          Infinite loop detected.
        </h1>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 font-mono text-sm tracking-[0.12em] text-bone transition-colors hover:text-signal"
        >
          Go home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  )
}
