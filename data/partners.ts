export type Partner = {
  name: string
  href: string
  logo?: string
  alt: string
}

export const PARTNERS: Partner[] = [
  {
    name: 'House of 666',
    href: 'https://house-of-666.netlify.app/',
    logo: '/partners/house-of-666.webp',
    alt: 'House of 666',
  },
  {
    name: 'Dhanshri Foods',
    href: 'https://dhanashri-foods.netlify.app/',
    logo: '/partners/dhanshri-foods.webp',
    alt: 'Dhanshri Foods',
  },
  {
    name: 'Roukhar Brothers',
    href: 'https://murti-maker-pro.lovable.app/',
    logo: '/partners/roukhar-brothers.webp',
    alt: 'Roukhar Brothers',
  },
  {
    name: 'KD Export',
    href: 'https://kdexport.co.in/',
    logo: '/partners/kd-export.webp',
    alt: 'KD Export',
  },
]
