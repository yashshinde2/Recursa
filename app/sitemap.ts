import type { MetadataRoute } from 'next'

import { SELECTED_PROJECTS } from '@/data/projects'
import { SERVICES } from '@/data/services'
import { canonicalUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['/', '/about', '/journey']
  return [
    ...staticPages.map((path) => ({
      url: canonicalUrl(path),
      changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : 0.7,
    })),
    ...SERVICES.map((service) => ({
      url: canonicalUrl(`/services/${service.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...SELECTED_PROJECTS.map((project) => ({
      url: canonicalUrl(`/work/${project.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
