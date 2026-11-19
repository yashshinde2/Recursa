import type { Metadata } from 'next'
import Link from 'next/link'

import { Team } from '@/components/home/team'
import { SectionLabel } from '@/components/section-label'
import { breadcrumbJsonLd, canonicalUrl, jsonLdScript } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: 'Team | Recursa Technologies',
  },
  description:
    'The engineers, designers, and strategists building thoughtful digital products at Recursa Technologies.',
  alternates: { canonical: canonicalUrl('/team') },
  openGraph: {
    title: 'Team | Recursa Technologies',
    description:
      'The engineers, designers, and strategists building thoughtful digital products at Recursa Technologies.',
    url: canonicalUrl('/team'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team | Recursa Technologies',
    description:
      'The engineers, designers, and strategists building thoughtful digital products at Recursa Technologies.',
  },
}

export default function TeamPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
  ])

  return (
    <main id="main" className="flex-1 bg-bone text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbs) }}
      />
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-28 pb-4 md:px-8 md:pt-36">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Back to home
        </Link>
        <div className="mt-8 mb-4">
          <SectionLabel>07 / The team</SectionLabel>
        </div>
        <h1 className="mt-4 font-serif text-5xl leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
          The people behind Recursa
        </h1>
      </div>
      <Team />
    </main>
  )
}
