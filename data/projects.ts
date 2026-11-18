export type Project = {
  slug: string
  name: string
  category: string
  image: string
  video?: string
  imageAlt: string
  url: string
  problem: string
  built: string
  result: string
}

export const PROJECTS = [
  {
    slug: 'house-of-666',
    name: 'House of 666',
    category: 'Website · Restaurant & Café',
    image: '/work/house-of-666.webp',
    video: '/work/videos/house-of-666.mp4',
    imageAlt: 'House of 666 Resto & Cafe website homepage with gold palm trees',
    url: 'https://house-of-666.netlify.app/',
    problem: 'A new Kolhapur café needed an online presence that matched its royal, coastal feel.',
    built: 'A branded, animated site with menu, story and directions.',
    result: 'Live, with a 5.0 Google rating shown on the homepage.',
  },
  {
    slug: 'dhanshri-foods',
    name: 'Dhanshri Foods',
    category: 'E-commerce · Food Manufacturing',
    image: '/work/dhanshri-foods.webp',
    video: '/work/videos/dhanshri-foods.mp4',
    imageAlt: 'Dhanshri Foods e-commerce homepage with namkeen and chips',
    url: 'https://dhanashri-foods.netlify.app/',
    problem: 'A chips and namkeen maker wanted to sell retail and take bulk B2B orders online.',
    built: 'An online store with product catalogue, cart and a B2B enquiry flow.',
    result: 'Live store serving both retail buyers and bulk customers.',
  },
  {
    slug: 'murti-maker-pro',
    name: 'Murti Maker Pro',
    category: 'Web App · Automation · Silver Jewellery',
    image: '/work/murti-maker-pro.webp',
    video: '/work/videos/murti-maker-pro.mp4',
    imageAlt: 'Silver idol catalogue app for Roukhar Brothers with search and filters',
    url: 'https://murti-maker-pro.lovable.app/',
    problem: 'A silver idol maker was quoting orders by hand across 99 products.',
    built: 'A bilingual catalogue and order app with search, filters and silver-weight totals.',
    result: 'Orders are built and totalled in the app instead of by hand.',
  },
  {
    slug: 'kd-export',
    name: 'KD Export',
    category: 'Website · CRM Software · Agri Export',
    image: '/work/kd-export.webp',
    video: '/work/videos/kd-export.mp4',
    imageAlt: 'KD Export banana supplier website with export statistics',
    url: 'https://kdexport.co.in/',
    problem: 'A banana exporter and cold-storage company needed a credible web presence and a way to manage farmers and clients.',
    built: 'A corporate website, plus a custom CRM for their operations.',
    result: 'Live in production, with 12+ countries and 1500+ farmers shown on the site.',
  },
] as const

export type SelectedProject = {
  slug: string
  name: string
  category: string
  problem: string
  built: string
  result: string
  approach: string
  solution: string
  results: string[]
  technologies: string[]
  gallery: string[]
  visual: 'dashboard' | 'commerce' | 'mobile' | 'iot'
}

export const SELECTED_PROJECTS: SelectedProject[] = [
  {
    slug: 'northstar',
    name: 'Northstar',
    category: 'SAAS / ANALYTICS',
    problem: 'Teams were working from scattered, hard-to-read data.',
    built: 'A clear workspace for live business signals.',
    result: 'One shared view for faster, more confident decisions.',
    approach: 'We mapped the decisions teams needed to make, then brought the most useful signals into one shared workflow.',
    solution: 'A modular analytics workspace with live summaries, focused dashboards, and clear paths from signal to action.',
    results: ['Shared visibility across teams', 'Faster access to key business signals', 'A flexible foundation for new data sources'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Data visualization'],
    gallery: ['Signal overview', 'Team dashboard', 'Metric detail'],
    visual: 'dashboard',
  },
  {
    slug: 'forma',
    name: 'Forma',
    category: 'WEB / COMMERCE',
    problem: 'A growing maker brand had outgrown its storefront.',
    built: 'A flexible editorial shop with a simpler checkout.',
    result: 'A more personal path from discovery to purchase.',
    approach: 'We focused the shopping journey around the character of the products, making discovery feel editorial and checkout feel effortless.',
    solution: 'A responsive commerce experience with flexible content blocks, considered product pages, and a streamlined purchase flow.',
    results: ['A more cohesive brand experience', 'Clearer product discovery', 'A storefront ready to grow with the catalog'],
    technologies: ['Next.js', 'TypeScript', 'Commerce APIs', 'Content platform'],
    gallery: ['Editorial storefront', 'Product collection', 'Product detail'],
    visual: 'commerce',
  },
  {
    slug: 'stride',
    name: 'Stride',
    category: 'MOBILE / WELLNESS',
    problem: 'Healthy routines were difficult to keep consistent.',
    built: 'A gentle mobile companion for daily movement.',
    result: 'Small, achievable steps made progress feel visible.',
    approach: 'We designed around short, repeatable moments instead of demanding routines, testing the core flow on small screens early.',
    solution: 'A mobile companion with simple daily prompts, progress cues, and a calm interface that keeps the focus on the next step.',
    results: ['Lower-friction daily planning', 'Progress made visible over time', 'A consistent experience across devices'],
    technologies: ['React Native', 'TypeScript', 'Mobile analytics', 'API integration'],
    gallery: ['Daily check-in', 'Movement plan', 'Progress view'],
    visual: 'mobile',
  },
  {
    slug: 'fieldnote',
    name: 'Fieldnote',
    category: 'IOT / CLIMATE',
    problem: 'Building teams lacked a useful view of indoor conditions.',
    built: 'A sensor-connected dashboard for spaces and energy.',
    result: 'Clearer signals for more thoughtful daily choices.',
    approach: 'We connected building signals to the decisions people make each day, prioritizing readable trends and useful context.',
    solution: 'A connected monitoring experience that brings sensor data, space status, and actionable summaries together.',
    results: ['A clearer view of indoor conditions', 'Connected signals in one place', 'A foundation for more informed energy choices'],
    technologies: ['IoT protocols', 'Cloud services', 'TypeScript', 'Telemetry'],
    gallery: ['Space overview', 'Sensor status', 'Trend detail'],
    visual: 'iot',
  },
]
