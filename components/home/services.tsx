'use client'

import { useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const SERVICES = [
  {
    number: '01',
    name: 'SaaS',
    description: 'Useful software, thoughtfully designed to grow with your business.',
    href: '/services/saas-development',
    signature: 'saas',
  },
  {
    number: '02',
    name: 'Web Development',
    description: 'Fast, expressive digital experiences built for the open web.',
    href: '/services/web-development',
    signature: 'web',
  },
  {
    number: '03',
    name: 'Mobile Apps',
    description: 'Intuitive apps that make everyday interactions feel effortless.',
    href: '/services/mobile-app-development',
    signature: 'mobile',
  },
  {
    number: '04',
    name: 'IoT',
    description: 'Connected products that bring useful ideas into the real world.',
    href: '/services/iot-solutions',
    signature: 'iot',
  },
] as const

function Signature({ type }: { type: (typeof SERVICES)[number]['signature'] }) {
  if (type === 'saas') {
    return (
      <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
        <g data-saas-card opacity=".8">
          <rect x="22" y="23" width="92" height="94" rx="2" stroke="currentColor" />
          <rect x="34" y="36" width="36" height="4" fill="currentColor" opacity=".35" />
          <rect x="34" y="54" width="12" height="48" fill="#ff5a1f" data-saas-bar />
          <rect x="54" y="69" width="12" height="33" fill="currentColor" opacity=".55" data-saas-bar />
          <rect x="74" y="59" width="12" height="43" fill="currentColor" opacity=".75" data-saas-bar />
        </g>
        <g data-saas-card opacity=".8">
          <rect x="126" y="23" width="172" height="94" rx="2" stroke="currentColor" />
          <path d="M140 98H284" stroke="currentColor" opacity=".25" />
          <path
            data-saas-chart
            d="m143 84 31-20 24 11 31-30 20 12 28-23"
            stroke="#ff5a1f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    )
  }

  if (type === 'web') {
    return (
      <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
        <g data-code>
          <path d="M24 33h92M24 53h72M24 73h84M24 93h58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 33h32M24 53h18M24 73h40M24 93h24" stroke="#ff5a1f" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 113h68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </g>
        <path d="M142 70h28" stroke="currentColor" opacity=".45" />
        <path d="m164 64 7 6-7 6" stroke="currentColor" />
        <g data-web-page>
          <rect x="190" y="20" width="106" height="100" rx="2" stroke="currentColor" />
          <path d="M190 34h106" stroke="currentColor" opacity=".4" />
          <circle cx="200" cy="27" r="2" fill="#ff5a1f" />
          <rect x="202" y="48" width="82" height="35" fill="currentColor" opacity=".12" />
          <path d="M202 94h55M202 103h38" stroke="currentColor" strokeLinecap="round" opacity=".7" />
        </g>
      </svg>
    )
  }

  if (type === 'mobile') {
    return (
      <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
        <g data-phone>
          <rect x="126" y="9" width="68" height="122" rx="10" stroke="currentColor" strokeWidth="2" />
          <path d="M151 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <g data-phone-screen>
            <rect x="136" y="30" width="48" height="28" fill="#ff5a1f" opacity=".85" />
            <path d="M136 68h42M136 77h34M136 91h42" stroke="currentColor" strokeLinecap="round" />
          </g>
          <g data-phone-screen opacity="0">
            <circle cx="160" cy="54" r="16" stroke="#ff5a1f" strokeWidth="3" />
            <path d="M136 83h42M136 92h34M136 101h42" stroke="currentColor" strokeLinecap="round" />
          </g>
          <g data-phone-screen opacity="0">
            <rect x="136" y="37" width="42" height="18" fill="currentColor" opacity=".2" />
            <path d="M136 68h42M136 77h34M136 91h42M136 100h34" stroke="currentColor" strokeLinecap="round" />
          </g>
          <path data-swipe d="M211 70h28m-7-7 7 7-7 7" stroke="#ff5a1f" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 320 140" fill="none" className="h-full w-full">
      <g data-sensor>
        <rect x="22" y="49" width="48" height="42" rx="2" stroke="currentColor" />
        <circle cx="46" cy="70" r="7" stroke="#ff5a1f" strokeWidth="2" />
        <path d="M46 57v-5m0 36v-5m-13-13h-5m36 0h-5" stroke="currentColor" opacity=".6" />
      </g>
      <path d="M70 70h180" stroke="currentColor" opacity=".45" />
      <path d="M70 70h180" stroke="#ff5a1f" strokeWidth="1.5" strokeDasharray="4 8" opacity=".65" />
      <g data-cloud>
        <path
          d="M252 87h30a17 17 0 0 0 2-34 25 25 0 0 0-47-5 20 20 0 0 0 15 39Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="258" cy="65" r="2" fill="#ff5a1f" />
        <circle cx="268" cy="65" r="2" fill="#ff5a1f" opacity=".65" />
        <circle cx="278" cy="65" r="2" fill="#ff5a1f" opacity=".35" />
      </g>
      <circle data-packet cx="80" cy="70" r="3" fill="#ff5a1f" />
      <circle data-packet cx="80" cy="70" r="3" fill="#ff5a1f" />
      <circle data-packet cx="80" cy="70" r="3" fill="#ff5a1f" />
    </svg>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const select = gsap.utils.selector(section)
      const rows = select('[data-service-row]') as HTMLElement[]
      const media = gsap.matchMedia()

      const createAnimation = (row: HTMLElement) => {
        const signature = row.querySelector('[data-service-signature]')
        if (!signature) return gsap.timeline({ paused: true })

        const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })

        if (row.dataset.signature === 'saas') {
          const cards = signature.querySelectorAll('[data-saas-card]')
          const bars = signature.querySelectorAll('[data-saas-bar]')
          const chart = signature.querySelector('[data-saas-chart]')
          timeline
            .fromTo(cards, { x: 24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.65, stagger: 0.12 }, 0)
            .fromTo(bars, { scaleY: 0.08, transformOrigin: 'bottom' }, { scaleY: 1, duration: 0.7, stagger: 0.1 }, 0.2)
            .fromTo(chart, { strokeDasharray: 150, strokeDashoffset: 150 }, { strokeDashoffset: 0, duration: 1.1 }, 0.35)
        } else if (row.dataset.signature === 'web') {
          const code = signature.querySelectorAll('[data-code] path')
          const page = signature.querySelector('[data-web-page]')
          timeline
            .fromTo(code, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.45, stagger: 0.12 }, 0)
            .fromTo(page, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8 }, 0.5)
        } else if (row.dataset.signature === 'mobile') {
          const screens = signature.querySelectorAll('[data-phone-screen]')
          timeline
            .to(screens[0], { autoAlpha: 0, x: -8, duration: 0.25 }, 0.45)
            .fromTo(screens[1], { autoAlpha: 0, x: 8 }, { autoAlpha: 1, x: 0, duration: 0.3 }, 0.7)
            .to(screens[1], { autoAlpha: 0, x: -8, duration: 0.25 }, 1.05)
            .fromTo(screens[2], { autoAlpha: 0, x: 8 }, { autoAlpha: 1, x: 0, duration: 0.3 }, 1.3)
            .fromTo(signature.querySelector('[data-swipe]'), { x: -12, autoAlpha: 0.3 }, { x: 12, autoAlpha: 1, duration: 0.6, repeat: 1, yoyo: true }, 0.35)
        } else {
          const packets = signature.querySelectorAll('[data-packet]')
          timeline.fromTo(
            packets,
            { x: 0, autoAlpha: 0 },
            { x: 156, autoAlpha: 1, duration: 1.35, stagger: 0.32, repeat: 1, repeatDelay: 0.25 },
            0,
          )
        }

        return timeline
      }

      media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const cleanups = rows.map((row) => {
          const timeline = createAnimation(row)
          const play = () => timeline.restart()
          row.addEventListener('pointerenter', play)
          row.addEventListener('focusin', play)
          return () => {
            row.removeEventListener('pointerenter', play)
            row.removeEventListener('focusin', play)
          }
        })
        return () => cleanups.forEach((cleanup) => cleanup())
      })

      media.add('(hover: none) and (prefers-reduced-motion: no-preference)', () => {
        const triggers = rows.map((row) => {
          const timeline = createAnimation(row)
          return ScrollTrigger.create({
            trigger: row,
            start: 'top 80%',
            once: true,
            onEnter: () => timeline.restart(),
          })
        })
        return () => triggers.forEach((trigger) => trigger.kill())
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="services-heading"
      className="grain relative"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 md:px-8 md:pt-28">
        <h2
          id="services-heading"
          className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm"
        >
          03 / WHAT WE BUILD
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-8 md:pb-28">
        {SERVICES.map((service) => (
          <a
            key={service.number}
            href={service.href}
            data-service-row
            data-signature={service.signature}
            className="group grid min-h-[300px] grid-cols-1 items-center gap-8 border-b border-bone/20 py-10 first:mt-8 md:min-h-[320px] md:grid-cols-[5rem_minmax(0,1fr)_minmax(18rem,0.8fr)_2rem] md:gap-8 md:py-12"
          >
            <span className="self-start pt-2 font-mono text-xs tracking-[0.14em] text-muted-foreground">
              {service.number}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95]">
                {service.name}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {service.description}
              </p>
            </div>
            <div
              data-service-signature
              aria-hidden="true"
              className="h-32 w-full max-w-[320px] justify-self-center text-bone/70 md:h-36 md:justify-self-end"
            >
              <Signature type={service.signature} />
            </div>
            <span
              aria-hidden="true"
              className="justify-self-end text-2xl text-bone transition-[translate,color] duration-500 ease-out group-hover:translate-x-1 group-hover:text-signal group-focus-visible:translate-x-1 group-focus-visible:text-signal"
            >
              ↗
            </span>
            <span className="sr-only">Explore {service.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
