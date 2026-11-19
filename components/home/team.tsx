'use client'

import Image from 'next/image'
import { useRef } from 'react'

import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  SocialButton,
  XIcon,
} from '@/components/social-icons'
import { TEAM } from '@/data/team'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

// Tunable object-position constant for all 4 portraits
const OBJECT_POSITION = 'object-[50%_15%]'

// Fixed warm sand background constant for cutout portrait frames
const SAND_BG = '#E3DCCD'

export function Team() {
  const containerRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = grid.querySelectorAll<HTMLElement>('[data-team-card]')
        if (!cards.length) return

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      return () => media.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      id="team"
      ref={containerRef}
      data-theme="light"
      aria-labelledby="team-heading"
      className="relative bg-bone text-ink"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 pb-20 md:px-8 md:pt-10 md:pb-28">
        <h2 id="team-heading" className="sr-only">
          The Team
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4"
        >
          {TEAM.map((member, index) => (
            <article
              key={member.name}
              data-team-card
              className="group flex flex-col"
            >
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]"
                style={{ backgroundColor: SAND_BG }}
              >
                {/* Concentric nested-squares outline (ink stroke at ~8% opacity) */}
                <svg
                  viewBox="0 0 200 250"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full stroke-ink/[0.08]"
                >
                  <rect
                    x="30"
                    y="45"
                    width="140"
                    height="160"
                    rx="2"
                    strokeWidth="1"
                    transform="rotate(-4 100 125)"
                  />
                  <rect
                    x="48"
                    y="63"
                    width="104"
                    height="124"
                    rx="2"
                    strokeWidth="1"
                    transform="rotate(2 100 125)"
                  />
                  <rect
                    x="65"
                    y="80"
                    width="70"
                    height="90"
                    rx="2"
                    strokeWidth="1"
                    transform="rotate(-1 100 125)"
                  />
                </svg>

                {/* 10px solid signal-orange square in bottom-right corner */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 bottom-3 z-10 size-2.5 bg-signal"
                />

                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  priority={index < 2}
                  className={cn(
                    'object-cover',
                    OBJECT_POSITION,
                    'grayscale contrast-[1.05] transition-[filter] duration-500 ease-out',
                    '[@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:contrast-100',
                    'group-focus-within:grayscale-0 group-focus-within:contrast-100',
                  )}
                />
              </div>

              <div className="mt-5 flex flex-col">
                <div className="flex min-h-[3.5rem] items-start sm:min-h-[4rem] lg:min-h-[4.75rem]">
                  <h3 className="font-serif text-2xl leading-[1.08] text-ink md:text-3xl">
                    {member.name}
                  </h3>
                </div>

                <p className="mt-2 font-mono text-xs tracking-[0.16em] uppercase text-foreground">
                  {member.role}
                </p>
                <p className="mt-0.5 font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground">
                  {member.title}
                </p>

                <div className="my-4 h-px w-full bg-ink/15" />

                <div className="flex items-center gap-2">
                  <SocialButton
                    href={`mailto:${member.links.email}`}
                    label={`Email ${member.name}`}
                    isEmail
                  >
                    <EmailIcon />
                  </SocialButton>
                  <SocialButton
                    href={member.links.linkedin}
                    label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                  </SocialButton>
                  <SocialButton
                    href={member.links.github}
                    label={`${member.name} on GitHub`}
                  >
                    <GitHubIcon />
                  </SocialButton>
                  <SocialButton
                    href={member.links.x}
                    label={`${member.name} on X`}
                  >
                    <XIcon />
                  </SocialButton>
                </div>

                {member.links.portfolio && (
                  <div className="mt-3">
                    <a
                      href={member.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors duration-300 hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                    >
                      Portfolio <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
