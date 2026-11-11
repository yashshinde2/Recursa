'use client'

import { useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const PARALLAX_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

// Each square is a scaled, turned copy of the one around it.
const SQUARES = Array.from({ length: 7 }, (_, index) => ({
  size: 100 * 0.74 ** index,
  turn: index * 8,
}))

export function HeroSquares() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = rootRef.current
    if (!root) return

    const select = gsap.utils.selector(root)
    const layers = select('[data-square-layer]')
    const squares = select('[data-square]')
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      // Looping motion has to be seamless, so it is the one place that uses
      // linear and sine easing instead of power3.out.
      const loop = gsap.timeline()

      squares.forEach((square, index) => {
        loop.to(
          square,
          { rotation: 360, duration: 200 - index * 14, ease: 'none', repeat: -1 },
          0,
        )
      })

      loop.to(
        squares,
        {
          scale: 1.05,
          duration: 6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.5,
        },
        0,
      )

      const visibility = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => loop.paused(!self.isActive),
      })

      return () => visibility.kill()
    })

    media.add(PARALLAX_QUERY, () => {
      const settle = { duration: 1.6, ease: 'power3.out' }
      const movers = layers.map((layer, index) => ({
        x: gsap.quickTo(layer, 'x', settle),
        y: gsap.quickTo(layer, 'y', settle),
        // Inner squares travel further, which reads as depth.
        reach: 16 + index * 10,
      }))

      const handleMove = (event: PointerEvent) => {
        const offsetX = event.clientX / window.innerWidth - 0.5
        const offsetY = event.clientY / window.innerHeight - 0.5

        for (const mover of movers) {
          mover.x(offsetX * mover.reach)
          mover.y(offsetY * mover.reach)
        }
      }

      window.addEventListener('pointermove', handleMove)
      return () => window.removeEventListener('pointermove', handleMove)
    })

    return () => media.revert()
  })

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        data-hero-squares
        data-reveal="pending"
        className="absolute top-1/2 left-1/2 aspect-square h-[135%] -translate-x-1/2 -translate-y-1/2 lg:left-[64%]"
      >
        {SQUARES.map((square) => (
          <div
            key={square.turn}
            data-square-layer
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              data-square
              className="aspect-square border border-steel/15"
              style={{ width: `${square.size}%`, rotate: `${square.turn}deg` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
