'use client'

import { useCallback, useState, useSyncExternalStore } from 'react'

import { Hero } from '@/components/home/hero'
import { Loader } from '@/components/home/loader'
import { hasSeenIntro, markIntroSeen } from '@/lib/intro-session'

type Phase = 'loading' | 'revealing' | 'done'

const subscribe = () => () => {}

export function HomeIntro() {
  // Both read as "first visit, not hydrated" on the server and during
  // hydration, then correct themselves before the browser paints.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const seen = useSyncExternalStore(subscribe, hasSeenIntro, () => false)
  const [phase, setPhase] = useState<Phase>('loading')

  const handleReveal = useCallback(() => {
    setPhase((current) => (current === 'loading' ? 'revealing' : current))
  }, [])

  const handleDone = useCallback(() => {
    markIntroSeen()
    setPhase('done')
  }, [])

  return (
    <>
      {!seen && phase !== 'done' && (
        <Loader
          inlineSessionCheck={!hydrated}
          onReveal={handleReveal}
          onDone={handleDone}
        />
      )}
      <Hero ready={seen || phase !== 'loading'} />
    </>
  )
}
