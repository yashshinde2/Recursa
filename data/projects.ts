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
