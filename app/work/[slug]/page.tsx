import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SELECTED_PROJECTS } from '@/data/projects'
import { breadcrumbJsonLd, canonicalUrl, jsonLdScript } from '@/lib/seo'

type WorkPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SELECTED_PROJECTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = SELECTED_PROJECTS.find((item) => item.slug === slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: `${project.name} — Case Study`,
    description: `${project.problem} ${project.result}`,
    alternates: { canonical: canonicalUrl(`/work/${slug}`) },
    openGraph: {
      title: `${project.name} — Recursa Technologies`,
      description: project.result,
      type: 'article',
      url: canonicalUrl(`/work/${slug}`),
      images: [{ url: `/work/${slug}/opengraph-image`, width: 1200, height: 630, alt: `${project.name} case study` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Recursa Technologies`,
      description: project.result,
      images: [`/work/${slug}/opengraph-image`],
    },
  }
}

function ProjectVisual({ visual, label }: { visual: string; label: string }) {
  return (
    <div className="relative flex aspect-[1.7/1] items-center justify-center overflow-hidden border border-bone/15 bg-ink/20 p-8 md:p-14">
      <div className="relative grid h-full w-full max-w-4xl grid-cols-[0.3fr_1fr] gap-3 border border-bone/20 p-3 md:gap-5 md:p-5">
        <div className="flex flex-col gap-3 border-r border-bone/15 pr-3">
          <span className="h-2 w-3/4 bg-bone/30" />
          <span className="h-2 w-1/2 bg-bone/15" />
          <span className="h-2 w-2/3 bg-bone/15" />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <div className="border border-bone/15 bg-bone/[0.04]" />
          <div className="border border-bone/15 bg-signal/10" />
          <div className="col-span-2 flex items-end gap-2 border border-bone/15 p-3">
            {[35, 60, 44, 82, 55, 92, 68, 75].map((height, index) => (
              <span
                key={`${visual}-${index}`}
                className="flex-1 bg-signal/70"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <span className="absolute right-3 bottom-3 font-mono text-[9px] tracking-[0.12em] text-bone/55 uppercase">
          {label}
        </span>
      </div>
      <span className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.12em] text-bone/45 uppercase">
        {visual} / product view
      </span>
    </div>
  )
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const project = SELECTED_PROJECTS.find((item) => item.slug === slug)
  if (!project) notFound()
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.name} — Case Study`,
    description: project.result,
    mainEntityOfPage: canonicalUrl(`/work/${slug}`),
    author: { '@type': 'Organization', name: 'Recursa Technologies' },
    publisher: { '@type': 'Organization', name: 'Recursa Technologies' },
  }
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Selected Work', path: '/#work' },
    { name: project.name, path: `/work/${slug}` },
  ])

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([articleJsonLd, breadcrumbs]) }}
      />
      <section data-theme="dark" className="grain relative overflow-hidden bg-ink text-bone">
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-24 pb-16 md:px-8 md:pt-36 md:pb-20">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.14em] text-bone/55 uppercase transition-colors hover:text-signal"
          >
            ← Selected work
          </Link>
          <p className="mt-12 font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
            {project.category} / CASE STUDY
          </p>
          <h1 className="mt-6 font-serif text-[clamp(4rem,12vw,11rem)] leading-[0.86] tracking-tight">
            {project.name}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/70 md:text-2xl">
            {project.result}
          </p>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink px-5 pb-12 md:px-8 md:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <ProjectVisual visual={project.visual} label={project.gallery[0]} />
        </div>
      </section>

      <section data-theme="light" className="bg-bone text-ink">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[0.7fr_1.3fr] md:gap-16 md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            01 / The problem
          </p>
          <p className="max-w-4xl font-serif text-3xl leading-tight md:text-5xl">
            {project.problem}
          </p>
        </div>
      </section>

      <section data-theme="teal" className="bg-teal text-bone">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
              02 / The approach
            </p>
            <p className="mt-6 max-w-xl font-serif text-3xl leading-tight md:text-5xl">
              {project.approach}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
              03 / The solution
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 md:text-xl">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-bone text-ink">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-[0.7fr_1.3fr] md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            04 / Results
          </p>
          <ul className="divide-y divide-ink/20 border-y border-ink/20">
            {project.results.map((result, index) => (
              <li key={result} className="flex gap-5 py-5 font-serif text-2xl md:py-7 md:text-4xl">
                <span className="pt-1 font-mono text-[10px] text-signal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink text-bone">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-20 md:grid-cols-[0.7fr_1.3fr] md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
            05 / Technology
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="border border-bone/25 px-3 py-2 font-mono text-[10px] tracking-[0.1em] uppercase"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-theme="teal" className="bg-teal text-bone">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-xs tracking-[0.16em] text-bone/55 uppercase">
            06 / Gallery
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <ProjectVisual
                key={image}
                visual={project.visual}
                label={`${String(index + 1).padStart(2, '0')} / ${image}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink text-bone">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-8 md:py-28">
          <h2 className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
            Have an idea like this?
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-8 bg-signal px-5 py-4 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:bg-bone"
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
