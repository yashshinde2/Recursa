import { SITE } from '@/lib/site'

export function canonicalUrl(path: string) {
  return new URL(path, SITE.url).toString()
}

export function jsonLdScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  }
}
