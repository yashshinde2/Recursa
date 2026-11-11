import type { Metadata } from 'next'
import { breadcrumbJsonLd, canonicalUrl, jsonLdScript } from '@/lib/seo'

import { OurJourney } from '@/components/home/our-journey'

export const metadata: Metadata = {
  title: 'Our Journey',
  description: 'The hackathons, experiments, and lessons that shaped Recursa.',
  alternates: { canonical: canonicalUrl('/journey') },
  openGraph: {
    title: 'Our Journey — Recursa Technologies',
    description: 'The hackathons, experiments, and lessons that shaped Recursa.',
    url: canonicalUrl('/journey'),
    images: ['/opengraph-image?title=Our%20Journey'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Journey — Recursa Technologies',
    description: 'The hackathons, experiments, and lessons that shaped Recursa.',
    images: ['/opengraph-image?title=Our%20Journey'],
  },
}

export default function JourneyPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Our Journey', path: '/journey' },
  ])

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbs) }}
      />
      <h1 className="sr-only">Our Journey</h1>
      <OurJourney />
    </main>
  )
}
