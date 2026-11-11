import { TEAM } from '@/data/team'

function PortraitPlaceholder({
  portrait,
  accent,
}: {
  portrait: (typeof TEAM)[number]['portrait']
  accent: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[0.82/1] overflow-hidden ${accent} saturate-0 transition-[filter] duration-700 ease-out group-hover:saturate-100`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-bone/20 via-transparent to-ink/35" />
      <div className="absolute inset-x-0 bottom-[-8%] mx-auto h-[57%] w-[75%] rounded-t-[48%] bg-ink/55" />
      <div
        className={`absolute top-[15%] left-1/2 h-[39%] w-[39%] -translate-x-1/2 rounded-[45%_45%_42%_42%] bg-ink/65 ${
          portrait === 'designer' || portrait === 'maker' ? 'rotate-[-4deg]' : ''
        }`}
      >
        <span className="absolute top-[42%] left-[18%] h-1 w-1 rounded-full bg-bone/70" />
        <span className="absolute top-[42%] right-[18%] h-1 w-1 rounded-full bg-bone/70" />
        <span className="absolute right-[35%] bottom-[23%] left-[35%] h-px bg-bone/50" />
      </div>
      <span className="absolute right-3 bottom-3 font-mono text-[9px] tracking-[0.12em] text-bone/75 uppercase">
        portrait / {portrait}
      </span>
    </div>
  )
}

export function Team() {
  return (
    <section
      id="team"
      data-theme="light"
      aria-labelledby="team-heading"
      className="relative bg-bone text-ink"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 pb-20 md:px-8 md:pt-28 md:pb-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <h2
              id="team-heading"
              className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase md:text-sm"
            >
              07 / THE TEAM
            </h2>
            <p className="mt-5 max-w-2xl font-serif text-4xl leading-[0.98] tracking-tight md:text-6xl">
              A small team, curious by nature.
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
            Different disciplines, one shared instinct: make the next version better.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 md:gap-y-14">
          {TEAM.map((member, index) => (
            <article key={member.name} className="group min-w-0">
              <div className="relative overflow-hidden">
                <PortraitPlaceholder portrait={member.portrait} accent={member.accent} />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-4 text-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 md:p-5">
                  <p className="font-serif text-lg italic leading-snug md:text-2xl">
                    “{member.builds}”
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl leading-none md:text-3xl">{member.name}</h3>
                <span className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-2 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase md:text-[10px]">
                {member.role}
              </p>
              <p className="sr-only">{member.builds}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
