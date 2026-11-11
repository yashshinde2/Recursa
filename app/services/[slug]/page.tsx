import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SERVICE_BY_SLUG, SERVICE_PROJECTS, SERVICES } from '@/data/services'
import { PRIMARY_CTA } from '@/lib/site'
import { breadcrumbJsonLd, canonicalUrl, jsonLdScript } from '@/lib/seo'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_BY_SLUG.get(slug)
  if (!service) return { title: 'Service not found' }

  return {
    title: service.metadata.title,
    description: service.metadata.description,
    alternates: { canonical: canonicalUrl(`/services/${slug}`) },
    openGraph: {
      title: `${service.metadata.title} — Recursa Technologies`,
      description: service.metadata.description,
      type: 'website',
      url: canonicalUrl(`/services/${slug}`),
      images: [{ url: `/services/${slug}/opengraph-image`, width: 1200, height: 630, alt: service.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.metadata.title} — Recursa Technologies`,
      description: service.metadata.description,
      images: [`/services/${slug}/opengraph-image`],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = SERVICE_BY_SLUG.get(slug)
  if (!service) notFound()

  const relatedProjects = SERVICE_PROJECTS.filter((project) =>
    service.relatedProjectSlugs.includes(project.slug),
  )

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metadata.description,
    url: canonicalUrl(`/services/${slug}`),
    provider: {
      '@type': 'Organization',
      name: 'Recursa Technologies',
      url: canonicalUrl('/'),
    },
  }
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: service.name, path: `/services/${slug}` },
  ])

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([faqJsonLd, serviceJsonLd, breadcrumbs]),
        }}
      />

      <section
        data-theme="dark"
        className="grain relative flex min-h-[calc(88svh-var(--nav-height))] flex-col justify-end overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-[70%] aspect-square w-[min(80vw,900px)] -translate-x-1/2 -translate-y-1/2 rotate-12 border border-steel/20" />
          <div className="absolute top-1/2 left-[70%] aspect-square w-[min(58vw,650px)] -translate-x-1/2 -translate-y-1/2 -rotate-6 border border-steel/20" />
          <div className="absolute top-1/2 left-[70%] aspect-square w-[min(36vw,410px)] -translate-x-1/2 -translate-y-1/2 rotate-12 border border-signal/35" />
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-24 pb-16 md:px-8 md:pt-36 md:pb-20">
          <p className="font-mono text-[10px] tracking-[0.18em] text-bone/60 uppercase md:text-xs">
            {service.eyebrow}
          </p>
          <h1 className="mt-8 max-w-5xl font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.91] tracking-tight">
            {service.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-bone/70 md:text-xl">
            {service.description}
          </p>
          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center gap-8 bg-signal px-5 py-4 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:bg-bone"
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section data-theme="light" className="bg-bone text-ink">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-[0.6fr_1.4fr] md:gap-16 md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            01 / A clear start
          </p>
          <p className="max-w-4xl font-serif text-3xl leading-[1.08] tracking-tight md:text-5xl">
            {service.intro}
          </p>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink text-bone">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
            02 / The process
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-none md:text-6xl">
            From first question to better product.
          </h2>
          <div className="mt-12 grid border-t border-bone/20 md:mt-16 md:grid-cols-4">
            {service.process.map((step, index) => (
              <article
                key={step.title}
                className="border-b border-bone/20 py-6 md:border-r md:border-b-0 md:px-5 md:py-0 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-signal">
                  STEP {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-serif text-2xl md:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/60">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-bone text-ink">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-[0.6fr_1.4fr] md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            03 / Technology
          </p>
          <div>
            <h2 className="font-serif text-4xl leading-none md:text-6xl">
              The right tools for the job.
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.technologies.map((technology) => (
                <li
                  key={technology}
                  className="border border-ink/20 px-3 py-2 font-mono text-[10px] tracking-[0.1em] uppercase"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section data-theme="teal" className="bg-teal text-bone">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
            <p className="font-mono text-xs tracking-[0.16em] text-bone/60 uppercase">
              04 / Related work
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group border border-bone/20 p-6 transition-colors hover:border-signal md:p-9"
                >
                  <p className="font-mono text-[10px] tracking-[0.12em] text-bone/55 uppercase">
                    {project.category}
                  </p>
                  <h2 className="mt-4 font-serif text-4xl md:text-6xl">{project.name}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-bone/70">
                    {project.result}
                  </p>
                  <span className="mt-8 inline-block font-mono text-xs tracking-[0.1em] text-signal uppercase">
                    View project ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section data-theme="light" className="bg-bone text-ink">
        <div className="mx-auto w-full max-w-[1000px] px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            05 / FAQ
          </p>
          <h2 className="mt-5 font-serif text-4xl md:text-6xl">Good questions.</h2>
          <div className="mt-10 border-t border-ink/20">
            {service.faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-ink/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl md:py-7 md:text-2xl">
                  <span>
                    <span className="mr-4 font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-xl transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pl-10 text-sm leading-relaxed text-muted-foreground md:pb-8 md:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink text-bone">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-8 md:py-28">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
              06 / Next step
            </p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
              Let’s make something useful.
            </h2>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-8 bg-signal px-5 py-4 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:bg-bone"
          >
            {PRIMARY_CTA.label} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
