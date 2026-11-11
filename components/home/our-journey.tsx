'use client'

import { useRef } from 'react'

import { JOURNEY_FRAMES } from '@/data/hackathons'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { PRIMARY_CTA } from '@/lib/site'

function Tape() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2 left-1/2 z-10 h-5 w-16 -translate-x-1/2 rotate-[-4deg] bg-[#d7c995]/80"
    />
  )
}

function TeamPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <figure
      className={`relative mx-2 bg-[#f1ece2] p-2 pb-8 shadow-lg ${
        index % 2 === 0 ? 'rotate-[2.5deg]' : 'rotate-[-3deg]'
      }`}
    >
      <Tape />
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#d9d3c8]">
        <svg aria-hidden="true" viewBox="0 0 240 180" className="absolute inset-0 h-full w-full text-ink/30">
          <circle cx="77" cy="69" r="20" fill="currentColor" />
          <circle cx="120" cy="57" r="24" fill="currentColor" />
          <circle cx="165" cy="70" r="19" fill="currentColor" />
          <path d="M37 156c2-29 17-44 40-44s39 16 41 44M71 159c2-38 19-58 49-58s47 20 49 58M125 156c2-29 17-44 40-44s39 16 41 44" fill="currentColor" />
        </svg>
        <span className="relative bg-bone/85 px-2 py-1 font-mono text-[8px] tracking-[0.12em] text-ink/70 uppercase">
          photo placeholder
        </span>
      </div>
      <figcaption className="absolute right-2 bottom-1 left-2 truncate text-center font-[cursive] text-[11px] italic text-ink/80">
        {label}
      </figcaption>
    </figure>
  )
}

function ScreenshotPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <figure
      className={`relative mx-2 bg-[#f1ece2] p-2 pb-8 shadow-lg ${
        index % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[3deg]'
      }`}
    >
      <Tape />
      <div className="relative flex aspect-[4/3] flex-col overflow-hidden bg-ink/90">
        <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-bone/15 px-3">
          <span className="size-1.5 rounded-full bg-signal" />
          <span className="size-1.5 rounded-full bg-bone/30" />
          <span className="size-1.5 rounded-full bg-bone/30" />
          <span className="ml-2 h-2 w-1/2 bg-bone/10" />
        </div>
        <div className="grid flex-1 grid-cols-[1fr_1.2fr] gap-3 p-4">
          <div className="flex flex-col gap-2">
            <span className="h-2 w-3/4 bg-bone/20" />
            <span className="h-2 w-1/2 bg-bone/10" />
            <span className="mt-2 h-12 border border-bone/10 bg-signal/10" />
          </div>
          <div className="flex flex-col justify-end gap-2">
            <span className="h-8 border border-bone/10" />
            <span className="h-6 w-2/3 bg-bone/10" />
          </div>
        </div>
      </div>
      <figcaption className="absolute right-2 bottom-1 left-2 truncate text-center font-[cursive] text-[11px] italic text-ink/80">
        {label}
      </figcaption>
    </figure>
  )
}

export function OurJourney() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const frames = gsap.utils.toArray<HTMLElement>('[data-journey-frame]', section)
      const depth = section.querySelector<HTMLElement>('[data-journey-depth]')
      const nodes = gsap.utils.toArray<HTMLElement>('[data-journey-node]', section)
      const returnCard = section.querySelector<HTMLElement>('[data-journey-return]')
      const returnTitle = section.querySelector<HTMLElement>('[data-journey-return-title]')
      const returnCta = section.querySelector<HTMLElement>('[data-journey-return-cta]')
      const media = gsap.matchMedia()

      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const stage = section.querySelector<HTMLElement>('[data-journey-stage]')
        if (!stage || !depth || !returnCard || !returnTitle || !returnCta) return

        gsap.set(frames, { position: 'absolute', inset: 0, yPercent: 105, scale: 1, rotation: 0 })
        gsap.set(frames[0], { yPercent: 0 })
        gsap.set(returnCard, { position: 'absolute', inset: 0, zIndex: 20, autoAlpha: 0, y: 24 })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: `+=${frames.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const activeIndex = Math.min(
                frames.length,
                Math.floor(self.progress * frames.length + 0.001),
              )
              depth.textContent =
                activeIndex >= frames.length
                  ? 'depth: 00'
                  : `depth: ${String(activeIndex + 1).padStart(2, '0')}`
              nodes.forEach((node, index) => {
                node.dataset.active =
                  activeIndex < frames.length && index <= activeIndex ? 'true' : 'false'
              })
            },
          },
        })

        for (let index = 1; index < frames.length; index += 1) {
          const position = index - 1
          for (let previous = 0; previous < index; previous += 1) {
            const distance = index - previous
            timeline.to(
              frames[previous],
              {
                yPercent: -distance * 1.4,
                scale: 1 - distance * 0.018,
                duration: 1,
                ease: 'none',
              },
              position,
            )
          }
          timeline.fromTo(
            frames[index],
            { yPercent: 105 },
            { yPercent: 0, duration: 1, ease: 'none' },
            position,
          )
        }

        const returnStart = frames.length - 1
        frames.forEach((frame, index) => {
          timeline.to(
            frame,
            {
              yPercent: -125,
              xPercent: index % 2 === 0 ? -8 : 8,
              rotation: index % 2 === 0 ? -3 : 3,
              scale: 0.88,
              autoAlpha: 0,
              duration: 0.18,
              ease: 'power3.in',
            },
            returnStart + (frames.length - index - 1) * 0.1,
          )
        })
        timeline
          .to(returnCard, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power3.out' }, returnStart + 0.52)
          .fromTo(
            returnTitle,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power3.out' },
            returnStart + 0.68,
          )
          .fromTo(
            returnCta,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power3.out' },
            returnStart + 0.82,
          )

        return () => timeline.scrollTrigger?.kill()
      })

      media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const triggers = frames.map((frame) => {
          gsap.set(frame, { autoAlpha: 0, y: 28 })
          return ScrollTrigger.create({
            trigger: frame,
            start: 'top 88%',
            once: true,
            onEnter: () => gsap.to(frame, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
          })
        })
        return () => triggers.forEach((trigger) => trigger.kill())
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(frames, { clearProps: 'all' })
        if (returnCard) gsap.set(returnCard, { clearProps: 'all' })
        nodes.forEach((node) => {
          node.dataset.active = 'false'
        })
        if (depth) depth.textContent = 'depth: 01'
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-theme="teal"
      aria-labelledby="journey-heading"
      className="relative bg-teal text-bone"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 md:px-8 md:pt-28">
        <h2
          id="journey-heading"
          className="font-mono text-xs tracking-[0.18em] text-bone/65 uppercase md:text-sm"
        >
          06 / OUR JOURNEY
        </h2>
      </div>

      <div
        data-journey-stage
        className="relative mx-auto w-full max-w-[1440px] px-5 pb-20 md:h-[100svh] md:min-h-[680px] md:px-8 md:pb-0"
      >
        <div className="pointer-events-none absolute top-8 left-5 z-30 hidden h-[calc(100%-4rem)] w-36 flex-col md:flex md:left-8">
          <span
            data-journey-depth
            className="font-mono text-xs tracking-[0.12em] text-bone/80"
          >
            depth: 01
          </span>
          <div className="relative mt-6 flex flex-1 flex-col justify-between pb-8">
            <span className="absolute top-1 bottom-1 left-[3px] w-px bg-bone/25" />
            {JOURNEY_FRAMES.map((frame, index) => (
              <span
                key={frame.name}
                data-journey-node
                data-active={index === 0 ? 'true' : 'false'}
                className="relative flex items-center gap-3 font-mono text-[10px] tracking-[0.1em] text-bone/45 transition-colors duration-300 data-[active=true]:text-bone"
              >
                <span className="size-[7px] rounded-full border border-current bg-teal" />
                {String(index + 1).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>

        {JOURNEY_FRAMES.map((frame, index) => (
          <article
            key={frame.name}
            data-journey-frame
            className="relative mb-8 flex min-h-[78svh] flex-col justify-center border border-bone/15 bg-teal px-5 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.12)] last:mb-0 md:inset-0 md:mb-0 md:min-h-0 md:px-16 md:py-14 md:pl-52"
          >
            <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
              <p className="font-mono text-xs tracking-[0.12em] text-bone/80 uppercase">
                frame_{String(index + 1).padStart(2, '0')} · {frame.name}
              </p>
              <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-bone/50">
                {frame.date}
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] md:gap-12">
              <div>
                <p className="mb-6 font-mono text-[10px] tracking-[0.14em] text-bone/55 uppercase">
                  {frame.location}
                </p>
                <dl className="space-y-5">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.12em] text-bone/50 uppercase">
                      Problem
                    </dt>
                    <dd className="mt-1 max-w-2xl text-lg leading-snug text-bone/90 md:text-2xl">
                      {frame.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.12em] text-bone/50 uppercase">
                      Result
                    </dt>
                    <dd className="mt-1 max-w-2xl text-lg leading-snug text-bone/90 md:text-2xl">
                      {frame.result}
                    </dd>
                  </div>
                </dl>
                <aside className="mt-6 w-fit max-w-[230px] rotate-[-2deg] bg-[#e8d99a] px-4 py-3 text-ink shadow-lg md:ml-8">
                  <p className="font-mono text-[9px] tracking-[0.14em] uppercase">keep in mind</p>
                  <p className="mt-2 font-[cursive] text-lg italic leading-tight">
                    {frame.learned}
                  </p>
                  <span className="mt-2 block text-right font-[cursive] text-xs italic">
                    — field note {String(index + 1).padStart(2, '0')}
                  </span>
                </aside>
                <p className="mt-6 border-l border-signal pl-3 font-serif text-2xl italic leading-snug md:text-3xl">
                  What we learned: {frame.learned}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 self-center md:gap-4">
                <TeamPlaceholder label={frame.teamPhotoPlaceholder} index={index} />
                <ScreenshotPlaceholder label={frame.screenshotPlaceholder} index={index} />
              </div>
            </div>
          </article>
        ))}
        <div
          data-journey-return
          className="relative z-20 flex min-h-[78svh] flex-col items-center justify-center border border-bone/15 bg-teal px-5 py-12 text-center md:min-h-0 md:px-16"
        >
          <p
            data-journey-return-title
            className="font-mono text-sm tracking-[0.14em] text-bone/75 md:text-base"
          >
            return Recursa;
          </p>
          <h3 className="mt-6 font-serif text-[clamp(3.2rem,8vw,8rem)] leading-[0.9] tracking-tight">
            Recursa, today.
          </h3>
          <a
            data-journey-return-cta
            href={PRIMARY_CTA.href}
            className="mt-10 inline-flex items-center gap-3 bg-signal px-6 py-4 font-mono text-xs tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:bg-bone focus-visible:bg-bone"
          >
            {PRIMARY_CTA.label}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
