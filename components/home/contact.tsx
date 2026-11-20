'use client'

import { useRef, useState } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'

const STEPS = [
  {
    label: '01 / NEED',
    question: 'What are you looking to build?',
    options: ['SaaS', 'Web', 'Mobile', 'IoT', 'AI & Automation', 'Not sure'],
    field: 'need',
  },
  {
    label: '02 / BUDGET',
    question: 'What investment feels right?',
    options: ['Under $5k', '$5k–$15k', '$15k–$50k', '$50k+'],
    field: 'budget',
  },
  {
    label: '03 / TIMELINE',
    question: 'When would you like to begin?',
    options: ['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Just exploring'],
    field: 'timeline',
  },
] as const

type ContactDetails = {
  need: string
  budget: string
  timeline: string
  name: string
  email: string
  message: string
}

const INITIAL_DETAILS: ContactDetails = {
  need: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  message: '',
}

export function Contact() {
  const formRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [details, setDetails] = useState<ContactDetails>(INITIAL_DETAILS)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      const screen = screenRef.current
      if (!screen) return
      gsap.fromTo(
        screen,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      )
    },
    { scope: formRef, dependencies: [step, sent], revertOnUpdate: true },
  )

  const update = (field: keyof ContactDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const moveTo = (nextStep: number) => {
    setError('')
    setStep(Math.max(0, Math.min(3, nextStep)))
  }

  const validateStep = () => {
    if (step < 3) {
      const field = STEPS[step].field
      if (!details[field]) {
        setError('Choose an option to continue.')
        return false
      }
      return true
    }

    if (!details.name.trim() || !details.email.trim() || !details.message.trim()) {
      setError('Please complete each field before sending.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) {
      setError('Enter a valid email address.')
      return false
    }
    return true
  }

  const submit = async () => {
    if (!validateStep() || submitting) return

    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      })
      const result = (await response.json()) as { success?: boolean; error?: string }
      if (!response.ok || !result.success) {
        setError(result.error ?? 'We could not submit your note. Please try again.')
        return
      }
      setSent(true)

      const mailtoUrl = `mailto:recursatechnologies@gmail.com?subject=${encodeURIComponent(
        `Project Enquiry from ${details.name} (${details.need})`,
      )}&body=${encodeURIComponent(
        `Name: ${details.name}\nEmail: ${details.email}\nNeed: ${details.need}\nBudget: ${details.budget}\nTimeline: ${details.timeline}\n\nMessage:\n${details.message}`,
      )}`
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl
      }
    } catch {
      setError('We could not reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      data-theme="dark"
      aria-labelledby="contact-heading"
      className="grain relative overflow-hidden bg-ink text-bone"
    >
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-14 px-5 py-20 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:px-8 md:py-28">
        <div>
          <h2
            id="contact-heading"
            className="max-w-[620px] font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-tight"
          >
            Tell us your <em>idea.</em>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-bone/65 md:text-base">
            A few quick questions will help us understand where you want to go.
            No pressure, just a good place to start.
          </p>
          <div className="mt-12 flex flex-col items-start gap-4 font-mono text-xs tracking-[0.12em] uppercase">
            <a
              href="https://wa.me/919096104433?text=Hi%20Recursa%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-bone/30 pb-1 transition-colors hover:border-signal hover:text-signal"
            >
              Message us on WhatsApp ↗
            </a>
            <a
              href="mailto:recursatechnologies@gmail.com?subject=Project%20enquiry"
              className="border-b border-bone/30 pb-1 transition-colors hover:border-signal hover:text-signal"
            >
              recursatechnologies@gmail.com ↗
            </a>
          </div>
        </div>

        <div ref={formRef} className="min-w-0">
          <div className="mb-6 flex items-center justify-between border-b border-bone/20 pb-4">
            <span className="font-mono text-[10px] tracking-[0.14em] text-bone/60 uppercase">
              {sent ? '04 / COMPLETE' : step < 3 ? STEPS[step].label : '04 / YOUR DETAILS'}
            </span>
            <span className="font-mono text-xs tracking-[0.12em]">
              {sent ? '4 / 4' : `${step + 1} / 4`}
            </span>
          </div>

          <div ref={screenRef} aria-live="polite">
            {sent ? (
              <div className="py-10">
                <p className="font-mono text-xs tracking-[0.14em] text-signal uppercase">
                  Note prepared
                </p>
                <h3 className="mt-5 font-serif text-5xl leading-[0.95] md:text-7xl">
                  Thanks for the idea.
                </h3>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-bone/65 md:text-base">
                  Your project brief is ready. If your email client did not open automatically,{' '}
                  <a
                    href={`mailto:recursatechnologies@gmail.com?subject=${encodeURIComponent(
                      `Project Enquiry from ${details.name} (${details.need})`,
                    )}&body=${encodeURIComponent(
                      `Name: ${details.name}\nEmail: ${details.email}\nNeed: ${details.need}\nBudget: ${details.budget}\nTimeline: ${details.timeline}\n\nMessage:\n${details.message}`,
                    )}`}
                    className="text-signal underline underline-offset-4 hover:text-bone"
                  >
                    click here to send directly to recursatechnologies@gmail.com
                  </a>.
                </p>
              </div>
            ) : step < 3 ? (
              <div>
                <h3 className="mb-8 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
                  {STEPS[step].question}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {STEPS[step].options.map((option) => {
                    const selected = details[STEPS[step].field] === option
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => update(STEPS[step].field, option)}
                        className={`min-h-14 border px-4 py-3 text-left font-mono text-xs tracking-[0.1em] transition-colors ${
                          selected
                            ? 'border-signal bg-signal text-ink'
                            : 'border-bone/25 text-bone hover:border-bone/70'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="mb-8 font-serif text-3xl leading-tight md:text-5xl">
                  Who should we get back to?
                </h3>
                <div className="grid gap-5">
                  <label className="grid gap-2 font-mono text-[10px] tracking-[0.12em] text-bone/60 uppercase">
                    Name
                    <input
                      autoComplete="name"
                      value={details.name}
                      onChange={(event) => update('name', event.target.value)}
                      maxLength={100}
                      className="h-12 border-b border-bone/30 bg-transparent font-sans text-base tracking-normal text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-signal"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2 font-mono text-[10px] tracking-[0.12em] text-bone/60 uppercase">
                    Email
                    <input
                      type="email"
                      autoComplete="email"
                      value={details.email}
                      onChange={(event) => update('email', event.target.value)}
                      maxLength={254}
                      className="h-12 border-b border-bone/30 bg-transparent font-sans text-base tracking-normal text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-signal"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="grid gap-2 font-mono text-[10px] tracking-[0.12em] text-bone/60 uppercase">
                    A little about the idea
                    <textarea
                      value={details.message}
                      onChange={(event) => update('message', event.target.value)}
                      maxLength={3000}
                      rows={3}
                      className="resize-y border-b border-bone/30 bg-transparent py-2 font-sans text-base tracking-normal text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-signal"
                      placeholder="What are you imagining?"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="mt-5 font-mono text-xs text-signal">
              {error}
            </p>
          )}

          {!sent && (
            <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => moveTo(step - 1)}
                disabled={step === 0 || submitting}
                className="px-1 py-3 font-mono text-xs tracking-[0.12em] text-bone/60 uppercase transition-colors hover:text-bone disabled:invisible"
              >
                ← Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep()) moveTo(step + 1)
                  }}
                  className="inline-flex min-h-12 items-center gap-8 bg-signal px-5 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:bg-bone"
                >
                  Continue <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex min-h-12 items-center gap-8 bg-signal px-5 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? 'Preparing…' : 'Send your idea'}
                  <span aria-hidden="true">↗</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
