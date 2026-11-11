import { createOgImage, OG_IMAGE_SIZE } from '@/components/og-image'
import { SITE } from '@/lib/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return createOgImage(SITE.shortName, SITE.name)
}
