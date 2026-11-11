export const SITE = {
  name: 'Recursa Technologies',
  shortName: 'Recursa',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://recursa.com',
  tagline: 'Software for SaaS, Web, Mobile & IoT',
  description:
    'Recursa Technologies is a software company building SaaS platforms, web and mobile applications, and connected IoT products.',
} as const

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
] as const

export const PRIMARY_CTA = {
  label: 'Start a project',
  href: '#contact',
} as const
