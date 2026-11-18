'use client'

import Image from 'next/image'
import { useRef } from 'react'

import { SectionLabel } from '@/components/section-label'
import { PROJECTS } from '@/data/projects'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!section || !viewport || !track) return

      const media = gsap.matchMedia()

      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
        }
      })

      media.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]', section)
        const triggers: ScrollTrigger[] = []

        cards.forEach((card) => {
          const anim = gsap.fromTo(
            card,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
              },
            },
          )
          if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
        })

        return () => {
          triggers.forEach((trigger) => trigger.kill())
        }
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="work"
      ref={sectionRef}
      data-theme="light"
      className="relative overflow-hidden bg-bone py-20 text-ink md:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <SectionLabel>04 / Selected work</SectionLabel>
      </div>

      <div
        ref={viewportRef}
        className="relative mt-8 w-full overflow-hidden px-5 md:mt-12 md:px-8 md:motion-reduce:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-14 md:gap-10 md:motion-reduce:flex-col md:motion-reduce:w-full md:motion-safe:flex-row md:motion-safe:w-max md:motion-safe:items-start md:motion-safe:pr-8"
        >
          {PROJECTS.map((project, index) => (
            <article
              key={project.slug}
              data-project-card
              className="group flex w-full flex-col md:motion-reduce:w-full md:motion-safe:w-[70vw] md:motion-safe:shrink-0"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-ink/15 bg-ink/5"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 768px) 70vw, 100vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </a>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-serif text-3xl leading-tight text-ink md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </p>
                </div>

                <dl className="mt-2 space-y-2 border-t border-ink/15 pt-3">
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm md:text-base">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Problem
                    </dt>
                    <dd className="text-ink/80">{project.problem}</dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm md:text-base">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Built
                    </dt>
                    <dd className="text-ink/80">{project.built}</dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm md:text-base">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Result
                    </dt>
                    <dd className="text-ink/80">{project.result}</dd>
                  </div>
                </dl>

                <div className="pt-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:underline hover:decoration-signal hover:underline-offset-4 group-hover:underline group-hover:decoration-signal group-hover:underline-offset-4"
                  >
                    Visit live site <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
