'use client'

import Link from 'next/link'
import {
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const MAGNETIC_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const variants = {
  signal: 'bg-signal text-ink hover:bg-foreground hover:text-background',
  solid: 'bg-foreground text-background hover:bg-signal hover:text-ink',
  outline:
    'border border-input text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
} as const

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
} as const

type SharedProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  /** How far the button follows the pointer, as a fraction of the pointer offset. */
  strength?: number
  className?: string
  /** Classes for the static hit area that wraps the button. */
  wrapperClassName?: string
  children: ReactNode
}

type AnchorProps = SharedProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof SharedProps | 'href'
  >

type NativeButtonProps = SharedProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof SharedProps
  >

export type MagneticButtonProps = AnchorProps | NativeButtonProps

export function MagneticButton({
  variant = 'signal',
  size = 'md',
  strength = 0.35,
  className,
  wrapperClassName,
  children,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const label = labelRef.current
      const button = wrapper?.firstElementChild
      if (!wrapper || !label || !button) return

      const media = gsap.matchMedia()

      media.add(MAGNETIC_QUERY, () => {
        const settle = { duration: 0.6, ease: 'power3.out' }
        const buttonX = gsap.quickTo(button, 'x', settle)
        const buttonY = gsap.quickTo(button, 'y', settle)
        const labelX = gsap.quickTo(label, 'x', settle)
        const labelY = gsap.quickTo(label, 'y', settle)

        // The wrapper never moves, so its bounds are a stable reference.
        const handleMove = (event: PointerEvent) => {
          const bounds = wrapper.getBoundingClientRect()
          const offsetX = event.clientX - (bounds.left + bounds.width / 2)
          const offsetY = event.clientY - (bounds.top + bounds.height / 2)

          buttonX(offsetX * strength)
          buttonY(offsetY * strength)
          labelX(offsetX * strength * 0.4)
          labelY(offsetY * strength * 0.4)
        }

        const handleLeave = () => {
          buttonX(0)
          buttonY(0)
          labelX(0)
          labelY(0)
        }

        wrapper.addEventListener('pointermove', handleMove)
        wrapper.addEventListener('pointerleave', handleLeave)

        return () => {
          wrapper.removeEventListener('pointermove', handleMove)
          wrapper.removeEventListener('pointerleave', handleLeave)
          gsap.set([button, label], { clearProps: 'transform' })
        }
      })

      return () => media.revert()
    },
    { dependencies: [strength] },
  )

  const buttonClassName = cn(
    'inline-flex items-center justify-center rounded-sm font-medium whitespace-nowrap transition-colors duration-300 will-change-transform disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  const label = (
    <span ref={labelRef} className="inline-flex items-center gap-2">
      {children}
    </span>
  )

  return (
    <span ref={wrapperRef} className={cn('inline-flex', wrapperClassName)}>
      {props.href === undefined ? (
        <button type="button" {...props} className={buttonClassName}>
          {label}
        </button>
      ) : props.href.startsWith('/') ? (
        <Link {...props} href={props.href} className={buttonClassName}>
          {label}
        </Link>
      ) : (
        <a {...props} className={buttonClassName}>
          {label}
        </a>
      )}
    </span>
  )
}
