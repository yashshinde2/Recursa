'use client'

import { useRef } from 'react'

import { SELECTED_PROJECTS } from '@/data/projects'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

function ProjectMockup({ visual }: { visual: (typeof SELECTED_PROJECTS)[number]['visual'] }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[1.42/1] w-full items-center justify-center overflow-hidden bg-[#e6e1d7] p-6"
    >
      {visual === 'dashboard' && (
        <div className="grid h-full w-full grid-cols-[0.7fr_1.5fr] gap-3">
          <div className="flex flex-col gap-2 bg-ink p-3">
            <span className="mb-3 h-2 w-1/2 bg-bone/70" />
            <span className="h-1.5 w-4/5 bg-bone/20" />
            <span className="h-1.5 w-3/5 bg-bone/20" />
            <span className="h-1.5 w-2/3 bg-bone/20" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <span className="h-9 bg-bone" />
              <span className="h-9 bg-bone" />
              <span className="h-9 bg-bone" />
            </div>
            <div className="flex flex-1 items-end gap-2 bg-bone p-3">
              {[34, 58, 42, 75, 52, 92, 68].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 bg-signal"
                  style={{ height: `${height}%`, opacity: 0.45 + index * 0.07 }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {visual === 'commerce' && (
        <div className="grid h-full w-full grid-cols-2 gap-3">
          <div className="flex flex-col justify-between bg-[#c4b8a5] p-4">
            <span className="font-serif text-2xl leading-none text-ink">FORMA</span>
            <span className="h-2 w-3/4 bg-ink/25" />
          </div>
          <div className="grid grid-rows-2 gap-3">
            <span className="bg-[#b2a68f]" />
            <span className="bg-[#d1c9ba]" />
          </div>
        </div>
      )}
      {visual === 'mobile' && (
        <div className="flex h-full items-center gap-4">
          {[0, 1].map((item) => (
            <div
              key={item}
              className={`flex h-[92%] aspect-[0.52/1] flex-col gap-3 rounded-[1.25rem] border-[3px] border-ink bg-bone p-3 ${
                item === 0 ? '-rotate-6' : 'rotate-6'
              }`}
            >
              <span className="mx-auto h-1 w-6 rounded-full bg-ink/50" />
              <span className="mt-2 aspect-square rounded-full bg-signal/70" />
              <span className="h-2 w-4/5 bg-ink/20" />
              <span className="h-2 w-3/5 bg-ink/15" />
              <span className="mt-auto h-7 rounded-sm bg-ink" />
            </div>
          ))}
        </div>
      )}
      {visual === 'iot' && (
        <div className="relative flex h-full w-full items-center justify-between px-4">
          <div className="flex size-14 items-center justify-center border border-ink/40">
            <span className="size-5 rounded-full border-2 border-signal" />
          </div>
          <span className="absolute inset-x-16 top-1/2 h-px bg-ink/30" />
          <span className="absolute left-[38%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-signal" />
          <span className="absolute left-[56%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-signal/70" />
          <div className="flex size-20 items-center justify-center rounded-full border border-ink/40 text-2xl text-ink/60">
            cloud
          </div>
        </div>
      )}
      <span className="absolute right-3 bottom-3 font-mono text-[9px] tracking-[0.14em] text-ink/50 uppercase">
        concept / {visual}
      </span>
    </div>
  )
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const viewport = section.querySelector<HTMLElement>('[data-work-viewport]')
      const track = section.querySelector<HTMLElement>('[data-work-track]')
      const media = gsap.matchMedia()

      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        if (!viewport || !track) return

        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: viewport,
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

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      aria-labelledby="selected-work-heading"
      className="relative overflow-hidden bg-bone text-ink"
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between px-5 pt-20 md:px-8 md:pt-28">
        <div>
          <h2
            id="selected-work-heading"
            className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm"
          >
            04 / SELECTED WORK
          </h2>
          <p className="mt-5 font-serif text-4xl leading-none md:text-6xl">A few things we made.</p>
        </div>
        <span className="hidden pb-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase md:block">
          Scroll to explore →
        </span>
      </div>

      <div
        data-work-viewport
        className="relative mx-auto flex min-h-[78svh] w-full max-w-[1440px] items-center overflow-hidden py-12 md:h-[100svh] md:min-h-[680px] md:py-0"
      >
        <div data-work-track className="flex w-full items-stretch gap-5 px-5 md:w-max md:gap-8 md:px-8">
          {SELECTED_PROJECTS.map((project, index) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              data-project-card
              data-cursor-label="View"
              className="group w-[84vw] shrink-0 border border-ink/15 bg-bone p-4 transition-colors duration-500 hover:border-ink/40 md:w-[min(74vw,980px)] md:p-7 md:cursor-none"
            >
              <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10">
                <ProjectMockup visual={project.visual} />
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-4xl leading-none md:text-6xl">
                      {project.name}
                    </h3>
                    <span className="mt-1 shrink-0 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase md:text-[10px]">
                      {project.category}
                    </span>
                  </div>
                  <dl className="mt-7 space-y-3 md:mt-10">
                    {[
                      ['Problem', project.problem],
                      ['Built', project.built],
                      ['Result', project.result],
                    ].map(([label, text]) => (
                      <div key={label} className="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-ink/15 pt-2">
                        <dt className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
                          {label}
                        </dt>
                        <dd className="text-sm leading-snug md:text-base">{text}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-6 font-mono text-[10px] tracking-[0.12em] text-signal uppercase">
                    0{index + 1} / View project ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
