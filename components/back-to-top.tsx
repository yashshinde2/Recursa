'use client'

import { ArrowUp } from 'lucide-react'

import { useLenis } from '@/components/smooth-scroll'
import { scrollToSection } from '@/lib/scroll-to'
import { cn } from '@/lib/utils'

export function BackToTop({ className }: { className?: string }) {
  const lenis = useLenis()

  return (
    <button
      type="button"
      onClick={() => scrollToSection(lenis, 0, { duration: 1.2 })}
      className={cn(
        'inline-flex items-center gap-2 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal',
        className,
      )}
    >
      Back to top
      <ArrowUp aria-hidden="true" className="size-3.5" />
    </button>
  )
}
