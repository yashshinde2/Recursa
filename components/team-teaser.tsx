import Link from 'next/link'

export function TeamTeaser() {
  return (
    <section
      data-theme="light"
      aria-label="Team preview"
      className="border-t border-ink/15 bg-bone text-ink py-10 md:py-14"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center md:px-8">
        <p className="font-serif text-2xl leading-tight text-ink md:text-3xl lg:text-4xl">
          The people behind Recursa.
        </p>
        <Link
          href="/team"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        >
          Meet the team
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
