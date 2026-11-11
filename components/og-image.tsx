import { ImageResponse } from 'next/og'

import { SITE } from '@/lib/site'

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const

export function createOgImage(title: string, eyebrow: string = SITE.name) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          background: '#0e1013',
          color: '#f1ece2',
          padding: '72px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-90px',
            top: '-160px',
            width: '700px',
            height: '700px',
            border: '1px solid rgba(138,147,160,.3)',
            transform: 'rotate(12deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '25px',
            top: '-75px',
            width: '520px',
            height: '520px',
            border: '1px solid rgba(255,90,31,.6)',
            transform: 'rotate(-8deg)',
          }}
        />
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', maxWidth: '980px', fontSize: 86, lineHeight: 0.98, letterSpacing: '-0.04em' }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 18, letterSpacing: '0.08em', color: '#8a93a0' }}>
          SOFTWARE FOR SAAS · WEB · MOBILE · IOT
        </div>
      </div>
    ),
    OG_IMAGE_SIZE,
  )
}
