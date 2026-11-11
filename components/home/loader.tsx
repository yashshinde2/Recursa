'use client'

import { useEffect, useRef } from 'react'

import { useLenis } from '@/components/smooth-scroll'
import { gsap, useGSAP } from '@/lib/gsap'
import { INTRO_STORAGE_KEY } from '@/lib/intro-session'

const STROKE_WIDTH = 2

// The logo mark at 96px, in pixels measured from the centre of its innermost
// square. That centre is the zoom origin, so the mark scales "into" itself.
const SQUARES = [
  { x: -16, y: -78, size: 94 },
  { x: -16, y: -42, size: 58 },
  { x: -16, y: -16, size: 32 },
] as const

const WINDOW_HALF = 16
// Offset of the innermost square's centre from the centre of the whole mark.
const WINDOW_OFFSET = { x: -31, y: 31 }
// Overshoot so the window's edges leave the screen before the ease settles.
const ZOOM_OVERSHOOT = 1.6

// Runs while the HTML is parsed, so a returning visitor never sees the
// overlay flash before hydration removes it.
const HIDE_IF_SEEN = `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_STORAGE_KEY)})==="1")document.currentScript.parentElement.style.display="none"}catch(e){}`

type LoaderProps = {
  /** Render the pre-hydration script. Only useful in server-rendered HTML. */
  inlineSessionCheck: boolean
  /** Called once, as the squares start scaling up. Must be stable. */
  onReveal: () => void
  /** Called once, when the overlay can be removed. Must be stable. */
  onDone: () => void
}

export function Loader({ inlineSessionCheck, onReveal, onDone }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<() => void>(() => {})
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    lenis.stop()
    return () => lenis.start()
  }, [lenis])

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onDone()
        return
      }

      const select = gsap.utils.selector(root)
      const strokes = select('[data-loader-stroke]')
      const zoomGroups = select('[data-loader-zoom]')
      const logo = select('[data-loader-logo]')[0]
      const hole = select('[data-loader-hole]')[0]
      const counter = select('[data-loader-counter]')[0]
      const chrome = select('[data-loader-chrome]')

      const count = { value: 0 }
      const zoom = { progress: 0 }
      let maxScale = 1
      let revealed = false

      const reveal = () => {
        if (revealed) return
        revealed = true

        const centerX = window.innerWidth / 2 + WINDOW_OFFSET.x
        const centerY = window.innerHeight / 2 + WINDOW_OFFSET.y
        const reach = Math.max(
          centerX,
          window.innerWidth - centerX,
          centerY,
          window.innerHeight - centerY,
        )
        maxScale = (reach / WINDOW_HALF) * ZOOM_OVERSHOOT

        root.style.pointerEvents = 'none'
        onReveal()
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: onDone,
      })

      timeline
        .to(strokes, { strokeDashoffset: 0, duration: 0.6, stagger: 0.12 }, 0)
        .to(
          count,
          {
            value: 100,
            duration: 0.9,
            onUpdate: () => {
              counter.textContent = String(Math.round(count.value)).padStart(2, '0')
            },
          },
          0,
        )
        .addLabel('reveal', 0.9)
        .to(chrome, { autoAlpha: 0, duration: 0.25 }, 'reveal')
        .to(hole, { opacity: 1, duration: 0.2 }, 'reveal')
        .to(
          zoom,
          {
            progress: 1,
            duration: 0.8,
            onStart: reveal,
            onUpdate: () => {
              reveal()
              // Easing the exponent keeps the zoom perceptually even: each
              // frame multiplies the size instead of adding to it.
              const scale = maxScale ** zoom.progress
              for (const group of zoomGroups) {
                group.setAttribute('transform', `scale(${scale})`)
              }
              logo.setAttribute('stroke-width', String(STROKE_WIDTH / scale))
            },
          },
          'reveal',
        )
        .to(logo, { opacity: 0, duration: 0.5 }, 'reveal+=0.1')

      const revealTime = timeline.labels.reveal

      const skip = () => {
        if (timeline.time() >= revealTime) return
        timeline.seek(revealTime, false).timeScale(1.4)
      }
      skipRef.current = skip

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') skip()
      }
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        skipRef.current = () => {}
      }
    },
    { dependencies: [onReveal, onDone] },
  )

  return (
    <div
      ref={rootRef}
      // The inline script may have hidden this element before hydration.
      suppressHydrationWarning
      onClick={() => skipRef.current()}
      className="fixed inset-0 z-[90] flex cursor-pointer items-center justify-center text-bone motion-reduce:hidden"
    >
      {inlineSessionCheck && (
        <script dangerouslySetInnerHTML={{ __html: HIDE_IF_SEEN }} />
      )}

      <p role="status" className="sr-only">
        Loading
      </p>

      <svg aria-hidden="true" className="absolute inset-0 size-full">
        <defs>
          <mask id="loader-window">
            <rect width="100%" height="100%" fill="white" />
            <svg x="50%" y="50%" className="overflow-visible">
              <g transform={`translate(${WINDOW_OFFSET.x} ${WINDOW_OFFSET.y})`}>
                <g data-loader-zoom>
                  <rect
                    data-loader-hole
                    x={-WINDOW_HALF}
                    y={-WINDOW_HALF}
                    width={WINDOW_HALF * 2}
                    height={WINDOW_HALF * 2}
                    fill="black"
                    opacity={0}
                  />
                </g>
              </g>
            </svg>
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          mask="url(#loader-window)"
          className="fill-ink"
        />

        <svg x="50%" y="50%" className="overflow-visible">
          <g transform={`translate(${WINDOW_OFFSET.x} ${WINDOW_OFFSET.y})`}>
            <g
              data-loader-zoom
              data-loader-logo
              fill="none"
              strokeWidth={STROKE_WIDTH}
              className="stroke-bone"
            >
              {SQUARES.map((square) => (
                <rect
                  key={square.size}
                  data-loader-stroke
                  x={square.x}
                  y={square.y}
                  width={square.size}
                  height={square.size}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
              ))}
            </g>
          </g>
        </svg>
      </svg>

      <span
        data-loader-counter
        data-loader-chrome
        aria-hidden="true"
        className="relative translate-y-24 font-mono text-sm tracking-[0.2em] tabular-nums"
      >
        00
      </span>

      <button
        type="button"
        data-loader-chrome
        className="absolute right-5 bottom-6 px-1.5 py-2 font-mono text-xs tracking-[0.16em] text-steel uppercase transition-colors duration-300 hover:text-bone md:right-8"
      >
        Skip
      </button>
    </div>
  )
}
