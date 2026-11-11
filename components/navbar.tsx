'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'

import { Logo } from '@/components/logo'
import { MagneticButton } from '@/components/magnetic-button'
import { MobileMenu } from '@/components/mobile-menu'
import { scrollToTarget, useLenis } from '@/components/smooth-scroll'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { NAV_LINKS, PRIMARY_CTA, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { hidden, scrolled } = useHideOnScroll()
  const lenis = useLenis()
  const pathname = usePathname()

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return
    event.preventDefault()
    scrollToTarget(lenis, 0)
  }

  return (
    <header
      data-hidden={hidden}
      data-scrolled={scrolled}
      className={cn(
        'sticky top-0 z-40 border-b border-transparent bg-background',
        'transition-[translate,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'data-[scrolled=true]:border-border',
        // Stay on screen while a keyboard user is focused inside the bar.
        '[&[data-hidden=true]:not(:has(:focus-visible))]:-translate-y-full',
      )}
    >
      <div className="mx-auto flex h-(--nav-height) max-w-[1440px] items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label={`${SITE.name} — home`}
          className="flex shrink-0"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative block px-1.5 py-2 font-mono text-xs tracking-[0.14em] uppercase after:absolute after:inset-x-1.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-[scale] after:duration-300 after:ease-out hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton
            href={PRIMARY_CTA.href}
            size="sm"
            wrapperClassName="hidden sm:inline-flex"
          >
            {PRIMARY_CTA.label}
          </MagneticButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
