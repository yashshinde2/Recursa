'use client'

import { Dialog } from '@base-ui/react/dialog'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

import { Logo } from '@/components/logo'
import { scrollToTarget, useLenis } from '@/components/smooth-scroll'
import { NAV_LINKS, PRIMARY_CTA, SITE } from '@/lib/site'

const DESKTOP_QUERY = '(min-width: 64rem)'

const toggleClassName =
  'inline-flex h-10 items-center border border-border px-3.5 font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pendingTarget = useRef<string | null>(null)
  const lenis = useLenis()

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }

    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) lenis?.stop()
    setOpen(nextOpen)
  }

  // Scroll to the chosen section only once the overlay has finished closing.
  const handleOpenChangeComplete = (nextOpen: boolean) => {
    if (nextOpen) return

    lenis?.start()

    const target = pendingTarget.current
    pendingTarget.current = null
    if (!target) return

    window.history.pushState(null, '', target)
    scrollToTarget(lenis, target)
  }

  const handleLinkClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      pendingTarget.current = href
      setOpen(false)
    }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <Dialog.Trigger className={`${toggleClassName} lg:hidden`}>
        Menu
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup
          data-theme="dark"
          data-lenis-prevent
          className="group/menu grain fixed inset-0 z-[60] transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [clip-path:inset(0_0_0_0)] data-[ending-style]:[clip-path:inset(0_0_100%_0)] data-[starting-style]:[clip-path:inset(0_0_100%_0)]"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
            <div className="flex h-(--nav-height) shrink-0 items-center justify-between border-b border-border px-5 md:px-8">
              <Logo />
              <Dialog.Close className={toggleClassName}>Close</Dialog.Close>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-5 pt-6 md:px-8">
              <ul>
                {NAV_LINKS.map((link, index) => (
                  <li key={link.href} className="border-b border-border">
                    <a
                      href={link.href}
                      onClick={handleLinkClick(link.href)}
                      className="group/link flex items-baseline gap-5 overflow-hidden py-4"
                    >
                      <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{ transitionDelay: `${180 + index * 60}ms` }}
                        className="block font-serif text-5xl leading-none tracking-tight transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[starting-style]/menu:translate-y-[120%] sm:text-6xl"
                      >
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 flex-col gap-6 px-5 pt-10 pb-8 md:px-8">
              <a
                href={PRIMARY_CTA.href}
                onClick={handleLinkClick(PRIMARY_CTA.href)}
                className="flex h-14 items-center justify-between rounded-sm bg-signal px-5 font-medium text-ink transition-colors duration-300 hover:bg-foreground"
              >
                {PRIMARY_CTA.label}
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </a>
              <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {SITE.tagline}
              </p>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
