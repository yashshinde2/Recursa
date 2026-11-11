import type { Metadata } from 'next'

import { NotFoundVisual } from '@/components/not-found-visual'

export const metadata: Metadata = {
  title: 'Infinite loop detected',
  description: 'This page could not be found. Go back to Recursa.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundVisual />
}
