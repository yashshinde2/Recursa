import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('size-6 shrink-0', className)}
    >
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="0.75"
        y="9.75"
        width="13.5"
        height="13.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="0" y="15.5" width="8.5" height="8.5" fill="var(--signal)" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-serif text-2xl leading-none tracking-tight">
        {SITE.shortName}
      </span>
    </span>
  )
}
