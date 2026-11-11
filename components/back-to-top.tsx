'use client'

import { ArrowUp } from 'lucide-react'

import { scrollToTarget, useLenis } from '@/components/smooth-scroll'
import { cn } from '@/lib/utils'

export function BackToTop({ className }: { className?: string }) {
  const lenis = useLenis()

  return (
    <button
      type="button"
      onClick={() => scrollToTarget(lenis, 0)}
      className={cn(
        'inline-flex items-center gap-2 transition-colors duration-300 hover:text-foreground',
        className,
      )}
    >
      Back to top
      <ArrowUp aria-hidden="true" className="size-3.5" />
    </button>
  )
}
