import { notFound } from 'next/navigation'

import { createOgImage, OG_IMAGE_SIZE } from '@/components/og-image'
import { SERVICE_BY_SLUG } from '@/data/services'

type Props = { params: Promise<{ slug: string }> }

export const alt = 'Recursa Technologies service'
export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params
  const service = SERVICE_BY_SLUG.get(slug)
  if (!service) notFound()
  return createOgImage(service.name, 'RECURSA / SERVICES')
}
