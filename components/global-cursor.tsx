'use client'

import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'

const INTERACTIVE =
  'a, button, input, textarea, select, summary, [role="button"], [data-cursor-interactive]'

export function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine)', () => {
      document.documentElement.classList.add('has-custom-cursor')

      let idleTimer: ReturnType<typeof setTimeout> | null = null

      const handleMove = (event: PointerEvent) => {
        const target = event.target

        // Hide inside dialogs (lightboxes, modals)
        if (target instanceof Element && target.closest('dialog, [role="dialog"]')) {
          gsap.to(cursor, { autoAlpha: 0, duration: 0.15, overwrite: true })
          return
        }

        cursor.style.left = `${event.clientX}px`
        cursor.style.top = `${event.clientY}px`
        gsap.to(cursor, { autoAlpha: 1, duration: 0.15, overwrite: true })

        const interactive =
          target instanceof Element ? target.closest<HTMLElement>(INTERACTIVE) : null
        const isInteractive = interactive !== null
        const label = interactive?.dataset.cursorLabel ?? ''
        if (cursor.dataset.cursorActive !== String(isInteractive)) {
          cursor.dataset.cursorActive = String(isInteractive)
        }
        if (cursor.dataset.cursorLabel !== label) {
          cursor.dataset.cursorLabel = label
        }

        if (idleTimer) clearTimeout(idleTimer)
        idleTimer = setTimeout(() => {
          gsap.to(cursor, { autoAlpha: 0, duration: 0.25, overwrite: true })
        }, 3000)
      }

      const handleLeave = () => {
        if (idleTimer) clearTimeout(idleTimer)
        gsap.to(cursor, { autoAlpha: 0, duration: 0.2, overwrite: true })
      }

      window.addEventListener('pointermove', handleMove)
      document.documentElement.addEventListener('pointerleave', handleLeave)
      window.addEventListener('blur', handleLeave)

      return () => {
        if (idleTimer) clearTimeout(idleTimer)
        document.documentElement.classList.remove('has-custom-cursor')
        window.removeEventListener('pointermove', handleMove)
        document.documentElement.removeEventListener('pointerleave', handleLeave)
        window.removeEventListener('blur', handleLeave)
      }
    })

    return () => media.revert()
  })

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-cursor-active="false"
      data-cursor-label=""
      data-global-cursor
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-signal font-mono text-[10px] tracking-[0.08em] text-ink opacity-0 transition-[width,height,background-color,border-color] duration-200"
    >
      <span data-cursor-dot className="size-1 rounded-full bg-signal" />
      <span data-cursor-text className="hidden">View</span>
    </div>
  )
}
