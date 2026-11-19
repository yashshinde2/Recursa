'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'

import { Logo } from '@/components/logo'
import { MagneticButton } from '@/components/magnetic-button'
import { MobileMenu } from '@/components/mobile-menu'
import { useLenis } from '@/components/smooth-scroll'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { scrollToSection, useActiveSection, useHashScroll } from '@/lib/scroll-to'
import { NAV_LINKS, PRIMARY_CTA, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { hidden, scrolled } = useHideOnScroll()
  const lenis = useLenis()
  const pathname = usePathname()
  const activeSection = useActiveSection()
  useHashScroll()

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return
    event.preventDefault()
    window.history.pushState(null, '', '/')
    scrollToSection(lenis, 0, { duration: 1.2 })
  }

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/team') return

    if (pathname === '/') {
      event.preventDefault()
      const cleanId = href.startsWith('/#') ? href.slice(1) : href
      window.history.pushState(null, '', cleanId)
      scrollToSection(lenis, cleanId, { duration: 1.2 })
    }
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
          className="flex shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                (link.href === '/team' && activeSection === 'team') ||
                (Boolean(activeSection) && link.href.endsWith(`#${activeSection}`))

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative flex items-center gap-1.5 px-1.5 py-2 font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-300',
                      isActive ? 'text-signal' : 'text-foreground hover:text-signal',
                      'after:absolute after:inset-x-1.5 after:bottom-1 after:h-px after:origin-left after:transition-[scale,background-color] after:duration-300 after:ease-out',
                      isActive
                        ? 'after:scale-x-100 after:bg-signal'
                        : 'after:scale-x-0 after:bg-current hover:after:scale-x-100',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal',
                    )}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-signal"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
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
