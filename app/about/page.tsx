import type { Metadata } from 'next'

import { Team } from '@/components/home/team'
import { WhoWeAre } from '@/components/home/who-we-are'
import { breadcrumbJsonLd, canonicalUrl, jsonLdScript } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Recursa: a curious team building, learning, and rebuilding better.',
  alternates: { canonical: canonicalUrl('/about') },
  openGraph: {
    title: 'About — Recursa Technologies',
    description: 'Meet Recursa: a curious team building, learning, and rebuilding better.',
    url: canonicalUrl('/about'),
    images: ['/opengraph-image?title=About%20Recursa'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Recursa Technologies',
    description: 'Meet Recursa: a curious team building, learning, and rebuilding better.',
    images: ['/opengraph-image?title=About%20Recursa'],
  },
}

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ])

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbs) }}
      />
      <section data-theme="dark" className="bg-ink text-bone">
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-28 pb-16 md:px-8 md:pt-40 md:pb-20">
          <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">About Recursa</p>
          <h1 className="mt-8 max-w-5xl font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.88] tracking-tight">
            Curious people. Useful things.
          </h1>
        </div>
      </section>
      <WhoWeAre />
      <Team />
    </main>
  )
}
