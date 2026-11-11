import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Instrument_Serif, JetBrains_Mono } from 'next/font/google'

import { Footer } from '@/components/footer'
import { GlobalCursor } from '@/components/global-cursor'
import { Navbar } from '@/components/navbar'
import { ScrollProgress } from '@/components/scroll-progress'
import { SmoothScroll } from '@/components/smooth-scroll'
import { SITE } from '@/lib/site'
import { canonicalUrl, jsonLdScript } from '@/lib/seo'

import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: 'v0.app',
  alternates: { canonical: canonicalUrl('/') },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: canonicalUrl('/'),
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f1ece2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: canonicalUrl('/'),
    logo: canonicalUrl('/icon.svg'),
    email: 'hello@recursa.com',
    description: SITE.description,
  }
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: canonicalUrl('/'),
    description: SITE.description,
  }

  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-svh flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript([organizationJsonLd, websiteJsonLd]) }}
        />
        <SmoothScroll>
          <a
            href="#main"
            className="sr-only font-mono text-xs tracking-[0.14em] uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-foreground focus:px-4 focus:py-3 focus:text-background"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <GlobalCursor />
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
