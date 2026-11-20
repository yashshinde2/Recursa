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
    slug: 'kd-export',
    name: 'KD Export CRM',
    category: 'SAAS / AGRI EXPORT CRM',
    problem:
      'A global banana exporter and cold-storage enterprise needed a specialized CRM to manage 1,500+ farmers, harvest batches, international buyers, and multi-currency billing.',
    built:
      'A custom cloud CRM and export operations platform connecting field agents, cold storage logs, and global shipment tracking.',
    result:
      'Streamlined operations across 12+ destination countries with real-time farmer settlement tracking.',
    approach:
      'We mapped the physical supply chain from farm gate to refrigerated container, designing role-based workflows for field procurement, quality grading, and automated export documentation.',
    solution:
      'A fast web-based CRM with offline-first field logging, multi-currency invoicing, container telemetry integration, and automated farmer ledger reconciliation.',
    results: [
      '1,500+ active farmers managed seamlessly',
      'Operations tracking across 12+ export countries',
      'Eliminated manual paperwork in cold storage dispatch',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Cloud Infrastructure'],
    gallery: ['Farmer CRM Dashboard', 'Shipment & Container Tracker', 'Ledger & Settlement View'],
    visual: 'dashboard',
  },
  {
    slug: 'house-of-666',
    name: 'House of 666',
    category: 'WEB / HOSPITALITY & BRAND',
    problem:
      'A premier restaurant & café in Kolhapur needed a distinctive digital experience reflecting its royal, coastal architectural atmosphere.',
    built:
      'A branded, animated digital flagship with interactive menus, ambient visuals, reservation integration, and location discovery.',
    result:
      'Live in production with a 5.0 Google rating showcased directly on the homepage and high reservation conversion.',
    approach:
      'We translated the physical restaurant’s luxury aesthetic into digital form, pairing bespoke serif typography and gold accents with responsive performance.',
    solution:
      'An expressive Next.js experience featuring smooth micro-interactions, responsive digital menus, and clear booking pathways.',
    results: [
      '5.0 Google rating maintained',
      '100% responsive across mobile and desktop',
      'Sub-second load times with high-resolution imagery',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    gallery: ['Editorial Homepage', 'Digital Menu Experience', 'Reservation & Story View'],
    visual: 'commerce',
  },
  {
    slug: 'stickerdump',
    name: 'StickerDump.exe',
    category: 'MOBILE / E-COMMERCE & CREATOR APP',
    problem:
      'A fast-growing custom sticker and merchandise company needed a mobile-first app for customers to design, customize, and order premium sticker packs.',
    built:
      'A playful, high-performance mobile application with real-time sticker preview, bundle builder, and instant checkout.',
    result:
      'Delivered high engagement and frictionless ordering for sticker drops and custom artist collaborations.',
    approach:
      'We built a mobile experience that feels tactile and snappy, optimizing image rendering for custom die-cut previews on touch screens.',
    solution:
      'A cross-platform app featuring an interactive pack builder, live vector die-cut rendering, and one-tap checkout.',
    results: [
      'Smooth 60fps pack customizer',
      'Instant checkout flow with digital wallet integration',
      'Scalable architecture for high-traffic collection drops',
    ],
    technologies: ['React Native', 'TypeScript', 'Mobile Payments', 'Cloud Storage'],
    gallery: ['Interactive Pack Customizer', 'Artist Collaboration Feed', 'One-Tap Checkout Flow'],
    visual: 'mobile',
  },
  {
    slug: 'e-tongue',
    name: 'E-Tongue',
    category: 'IOT / BIO-SENSOR & TASTE TELEMETRY',
    problem:
      'Food and pharmaceutical manufacturers lacked portable, real-time taste profile analysis without slow laboratory chemical testing.',
    built:
      'A connected multi-sensor electronic tongue hardware device and real-time telemetry dashboard for rapid liquid taste analysis.',
    result:
      'Instant classification of taste signatures and contaminant detection with high reproducibility.',
    approach:
      'We connected specialized potentiometric sensor arrays to an embedded gateway, streaming signal data to cloud inference models.',
    solution:
      'A unified IoT system encompassing device firmware, BLE/Wi-Fi telemetry pipeline, and a web dashboard visualizing chemical response curves.',
    results: [
      'Real-time sensor curve telemetry',
      'Portable field testing without lab delays',
      'Automated anomaly detection in liquid samples',
    ],
    technologies: ['Embedded C++', 'IoT Telemetry', 'Next.js', 'TypeScript', 'Signal Processing'],
    gallery: ['Sensor Array Telemetry', 'Taste Fingerprint Radar', 'Batch Quality Analysis'],
    visual: 'iot',
  },
  {
    slug: 'smart-bharat-ai',
    name: 'Smart Bharat AI',
    category: 'AI & AUTOMATION / MULTILINGUAL ASSISTANT',
    problem:
      'Rural citizens faced digital exclusion due to complex English-first interfaces and low literacy barriers.',
    built:
      'A multilingual voice AI assistant and automated service dispatcher working across regional Indian languages.',
    result:
      'First prize winner at SGU Prabal Hackathon; validated across diverse regional dialects.',
    approach:
      'We designed around speech-first interaction, using local dialect translation and automated workflow execution.',
    solution:
      'An automated agent framework connecting speech recognition, localized LLM reasoning, and automated voice response.',
    results: [
      'Low-latency regional language voice processing',
      'Hands-free automated request dispatching',
      'Simple enough for non-technical rural users',
    ],
    technologies: ['Python', 'Voice AI APIs', 'FastAPI', 'Next.js', 'Speech Recognition'],
    gallery: ['Voice Interaction Canvas', 'Workflow Dispatcher', 'Dialect Accuracy Monitor'],
    visual: 'dashboard',
  },
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
