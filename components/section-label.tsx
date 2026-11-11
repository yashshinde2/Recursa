import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionLabelProps = {
  /** Section number, rendered zero-padded: 3 becomes "03 / SERVICES". */
  index?: number | string
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3'
  className?: string
  children: ReactNode
}

export function SectionLabel({
  index,
  as: Tag = 'p',
  className,
  children,
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        'font-mono text-xs font-normal tracking-[0.16em] text-muted-foreground uppercase',
        className,
      )}
    >
      {index !== undefined && (
        <>
          <span className="tabular-nums">{String(index).padStart(2, '0')}</span>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
        </>
      )}
      {children}
    </Tag>
  )
}
