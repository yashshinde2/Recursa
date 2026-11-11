'use client'

import { useRef, type ElementType, type ReactNode } from 'react'

import { gsap, SplitText, useGSAP } from '@/lib/gsap'

type RevealTextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
  className?: string
  /** Seconds to wait after the trigger before the first line moves. */
  delay?: number
  /** Seconds between each line. */
  stagger?: number
  /** Seconds each line takes to slide into place. */
  duration?: number
  /** ScrollTrigger start position, e.g. "top 85%". */
  start?: string
  /** Play once, or replay each time the text scrolls back into view. */
  once?: boolean
  /** Keep this static: the text is split into lines in the DOM after mount. */
  children: ReactNode
}

export function RevealText({
  as = 'p',
  className,
  delay = 0,
  stagger = 0.09,
  duration = 0.9,
  start = 'top 85%',
  once = true,
  children,
}: RevealTextProps) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        // autoSplit re-splits when fonts load or the width changes; returning
        // the tween from onSplit lets SplitText carry its progress across.
        const split = SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'reveal-line',
          autoSplit: true,
          aria: 'none',
          onSplit: (self) => {
            element.dataset.reveal = 'ready'

            return gsap.from(self.lines, {
              yPercent: 115,
              duration,
              delay,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start,
                once,
                toggleActions: once ? 'play none none none' : 'play none none reset',
              },
            })
          },
        })

        return () => split.revert()
      })

      return () => media.revert()
    },
    { dependencies: [delay, stagger, duration, start, once] },
  )

  return (
    <Tag ref={ref} data-reveal="pending" className={className}>
      {children}
    </Tag>
  )
}
