'use client'

import Image from 'next/image'
import type { Hackathon } from '@/data/hackathons'

interface JourneyCollageProps {
  hackathon: Hackathon
  frameIndex: number
  onPhotoClick: (photoIndex: number) => void
}

// 4 deterministic layout presets
// Coordinates in percentages within a relative 4:3 or square container
const LAYOUT_PRESETS = [
  // Preset 0
  [
    { top: '4%', left: '4%', width: '46%', rotate: '-3.5deg', z: 1, tape: 'top-center' },
    { top: '8%', left: '48%', width: '48%', rotate: '4deg', z: 2, tape: 'top-right' },
    { top: '48%', left: '8%', width: '44%', rotate: '2.5deg', z: 3, tape: 'top-left' },
    { top: '44%', left: '46%', width: '48%', rotate: '-4.5deg', z: 4, tape: 'top-center' },
  ],
  // Preset 1
  [
    { top: '6%', left: '8%', width: '48%', rotate: '3deg', z: 2, tape: 'top-left' },
    { top: '4%', left: '50%', width: '44%', rotate: '-4deg', z: 1, tape: 'top-center' },
    { top: '46%', left: '4%', width: '46%', rotate: '-2.5deg', z: 4, tape: 'top-right' },
    { top: '50%', left: '48%', width: '46%', rotate: '3.5deg', z: 3, tape: 'top-center' },
  ],
  // Preset 2
  [
    { top: '5%', left: '6%', width: '44%', rotate: '-4deg', z: 1, tape: 'top-right' },
    { top: '50%', left: '6%', width: '46%', rotate: '3deg', z: 3, tape: 'top-center' },
    { top: '6%', left: '48%', width: '48%', rotate: '4.5deg', z: 2, tape: 'top-left' },
    { top: '46%', left: '46%', width: '46%', rotate: '-3deg', z: 4, tape: 'top-right' },
  ],
  // Preset 3
  [
    { top: '8%', left: '4%', width: '48%', rotate: '4deg', z: 3, tape: 'top-center' },
    { top: '4%', left: '48%', width: '46%', rotate: '-3deg', z: 1, tape: 'top-right' },
    { top: '48%', left: '10%', width: '44%', rotate: '-4deg', z: 2, tape: 'top-left' },
    { top: '45%', left: '50%', width: '46%', rotate: '2.5deg', z: 4, tape: 'top-center' },
  ],
]

function Tape({ position = 'top-center' }: { position?: string }) {
  let posClass = '-top-2.5 left-1/2 -translate-x-1/2 rotate-[-3deg]'
  if (position === 'top-left') {
    posClass = '-top-2.5 left-4 rotate-[-12deg]'
  } else if (position === 'top-right') {
    posClass = '-top-2.5 right-4 rotate-[10deg]'
  }
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 h-4 w-14 bg-[#d7c995]/85 shadow-xs backdrop-blur-[0.5px] ${posClass}`}
    />
  )
}

export function JourneyCollage({ hackathon, frameIndex, onPhotoClick }: JourneyCollageProps) {
  const visiblePhotos = hackathon.photos.slice(0, 4)
  const remainingCount = hackathon.photos.length - 4
  const preset = LAYOUT_PRESETS[frameIndex % LAYOUT_PRESETS.length]

  return (
    <div className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[500px] w-full select-none">
      {/* Decorative Stamp if Winner / Organizer */}
      {hackathon.badge.tone === 'winner' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-4 z-30 rotate-12 rounded border-2 border-dashed border-signal px-3 py-1 font-mono text-xs font-bold tracking-widest text-signal uppercase opacity-90 shadow-sm"
        >
          1st Prize
        </div>
      )}
      {hackathon.badge.tone === 'organizer' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-3 right-4 z-30 -rotate-12 rounded border-2 border-dashed border-signal px-3 py-1 font-mono text-xs font-bold tracking-widest text-signal uppercase opacity-90 shadow-sm"
        >
          Organized by us
        </div>
      )}

      {/* Render photos */}
      {visiblePhotos.map((photoId, i) => {
        const layout = preset[i] || preset[0]
        const isLastAndMore = i === 3 && remainingCount > 0
        const isPriority = frameIndex === 0 && i < 2

        return (
          <div
            key={photoId}
            style={{
              position: 'absolute',
              top: layout.top,
              left: layout.left,
              width: layout.width,
              transform: `rotate(${layout.rotate})`,
              zIndex: layout.z,
            }}
            className="group transition-transform duration-300 ease-out hover:!z-30 hover:scale-[1.04] hover:rotate-0"
          >
            <Tape position={layout.tape} />
            <button
              type="button"
              onClick={() => onPhotoClick(i)}
              className="relative block w-full rounded-[2px] bg-[#f5f0e6] p-2 pb-5 text-left shadow-lg ring-1 ring-black/10 transition-shadow duration-200 group-hover:shadow-2xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-signal"
              aria-label={`View photo ${i + 1} of ${hackathon.title}`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[1px] bg-[#dcd5c7]">
                <Image
                  src={`/journey/sq/${photoId}.webp`}
                  alt={hackathon.shortName}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, (min-width: 640px) 40vw, 85vw"
                  priority={isPriority}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {isLastAndMore && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/70 font-mono text-xs font-semibold text-bone backdrop-blur-[1px]">
                    +{remainingCount} more photos
                  </div>
                )}
              </div>

              {/* Polaroid bottom caption strip */}
              <div className="mt-1.5 flex items-center justify-between px-1">
                <span className="truncate font-[cursive] text-[11px] italic text-ink/75">
                  {hackathon.city} · {hackathon.dateLabel}
                </span>
                <span className="font-mono text-[9px] text-ink/40">#{i + 1}</span>
              </div>
            </button>
          </div>
        )
      })}

      {/* Sticky note */}
      {hackathon.note && (
        <div
          style={{
            position: 'absolute',
            bottom: '2%',
            right: frameIndex % 2 === 0 ? '4%' : 'auto',
            left: frameIndex % 2 === 0 ? 'auto' : '4%',
            maxWidth: '180px',
            transform: frameIndex % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)',
            zIndex: 10,
          }}
          className="rounded-[2px] bg-[#e8d99a] px-3.5 py-2.5 text-ink shadow-md"
        >
          <span
            aria-hidden="true"
            className="absolute -top-2 left-1/2 h-3.5 w-10 -translate-x-1/2 rotate-1 bg-[#d7c995]/70"
          />
          <p className="font-[cursive] text-xs leading-snug italic text-[#2d2a24]">
            {hackathon.note}
          </p>
        </div>
      )}
    </div>
  )
}
