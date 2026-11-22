'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'

import type { Hackathon } from '@/data/hackathons'

type JourneyLightboxProps = {
  hackathon: Hackathon | null
  photoIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function JourneyLightbox({
  hackathon,
  photoIndex,
  isOpen,
  onClose,
  onNavigate,
}: JourneyLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const photos = hackathon?.photos || []
  const currentPhoto = photos[photoIndex]
  const total = photos.length

  const handlePrev = useCallback(() => {
    if (total <= 1) return
    onNavigate((photoIndex - 1 + total) % total)
  }, [photoIndex, total, onNavigate])

  const handleNext = useCallback(() => {
    if (total <= 1) return
    onNavigate((photoIndex + 1) % total)
  }, [photoIndex, total, onNavigate])

  // Open / Close modal
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement | null
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
      if (lastActiveElement.current) {
        lastActiveElement.current.focus()
        lastActiveElement.current = null
      }
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handlePrev, handleNext, onClose])

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  if (!hackathon || !currentPhoto) return null

  const prevPhoto = photos[(photoIndex - 1 + total) % total]
  const nextPhoto = photos[(photoIndex + 1) % total]

  const altText =
    hackathon.photoDetails?.[currentPhoto]?.alt ||
    `Team Recursa at ${hackathon.shortName}, photo ${photoIndex + 1}`
  const captionText =
    hackathon.photoDetails?.[currentPhoto]?.caption ||
    `${hackathon.shortName} · Photo ${photoIndex + 1}`

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Photo gallery: ${hackathon.shortName}`}
      onClose={onClose}
      onClick={(e) => {
        // Close if click backdrop
        if (e.target === dialogRef.current) onClose()
      }}
      className="backdrop:bg-black/85 fixed inset-0 m-auto flex h-full max-h-none w-full max-w-none cursor-default flex-col items-center justify-between bg-transparent p-4 text-bone outline-none backdrop:backdrop-blur-sm sm:p-6 md:p-8"
    >
      {/* Top Header bar */}
      <div className="flex w-full max-w-5xl items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-bone/70 uppercase">
          <span>{hackathon.shortName}</span>
          <span className="text-bone/30">/</span>
          <span className="text-bone">
            {photoIndex + 1} of {total}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo gallery"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-[2px] border border-bone/20 font-mono text-xs uppercase tracking-wider text-bone/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        >
          ✕
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative my-auto flex h-[75svh] w-full max-w-5xl items-center justify-center"
      >
        <Image
          src={`/journey/full/${currentPhoto}.webp`}
          alt={altText}
          fill
          sizes="(min-width: 1200px) 1100px, 95vw"
          className="object-contain"
          priority
        />

        {/* Hidden Preload for neighboring full images */}
        {total > 1 && (
          <div className="hidden" aria-hidden="true">
            <img src={`/journey/full/${prevPhoto}.webp`} alt="" />
            <img src={`/journey/full/${nextPhoto}.webp`} alt="" />
          </div>
        )}
      </div>

      {/* Bottom Bar: Caption and Prev/Next Navigation */}
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-2 pb-2 sm:flex-row">
        <p className="font-[cursive] text-sm text-bone/85 italic sm:text-base">
          {captionText}
        </p>

        {total > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[2px] border border-bone/25 px-4 font-mono text-xs uppercase tracking-wider text-bone transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[2px] border border-bone/25 px-4 font-mono text-xs uppercase tracking-wider text-bone transition-colors hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
