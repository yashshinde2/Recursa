import { notFound } from 'next/navigation'

import { createOgImage, OG_IMAGE_SIZE } from '@/components/og-image'
import { SELECTED_PROJECTS } from '@/data/projects'

type Props = { params: Promise<{ slug: string }> }

export const alt = 'Recursa Technologies case study'
export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params
  const project = SELECTED_PROJECTS.find((item) => item.slug === slug)
  if (!project) notFound()
  return createOgImage(project.name, `${project.category} / CASE STUDY`)
}
