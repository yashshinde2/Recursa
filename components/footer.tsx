import { BackToTop } from '@/components/back-to-top'
import { LogoMark } from '@/components/logo'
import { SectionLabel } from '@/components/section-label'
import { NAV_LINKS, PRIMARY_CTA, SITE } from '@/lib/site'

const linkClassName =
  'inline-block py-1 text-lg transition-colors duration-300 hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal'

export function Footer() {
  return (
    <footer data-theme="dark" className="grain overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-12 pt-16 pb-20 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-28">
          <div className="md:col-span-6">
            <LogoMark className="size-8" />
            <p className="mt-8 max-w-md font-serif text-3xl leading-[1.1] tracking-tight text-balance md:text-4xl">
              {SITE.tagline}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-8">
            <SectionLabel>Index</SectionLabel>
            <ul className="mt-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClassName}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <SectionLabel>New work</SectionLabel>
            <a href={PRIMARY_CTA.href} className={`mt-5 ${linkClassName}`}>
              {PRIMARY_CTA.label}
            </a>
          </div>
        </div>

        <div className="@container border-t border-border">
          <p
            aria-hidden="true"
            className="-ml-[0.015em] pt-[0.06em] font-serif text-[39.5cqw] leading-[0.82] tracking-tight select-none"
          >
            {SITE.shortName}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <BackToTop className="self-start uppercase sm:self-auto" />
        </div>
      </div>
    </footer>
  )
}
