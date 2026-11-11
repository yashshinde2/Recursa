import { SELECTED_PROJECTS } from '@/data/projects'

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServiceStep = {
  title: string
  description: string
}

export type ServicePage = {
  slug: string
  name: string
  eyebrow: string
  headline: string
  description: string
  intro: string
  process: ServiceStep[]
  technologies: string[]
  relatedProjectSlugs: string[]
  faqs: ServiceFaq[]
  metadata: {
    title: string
    description: string
  }
}

export const SERVICES: ServicePage[] = [
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    eyebrow: 'PRODUCT ENGINEERING / 01',
    headline: 'Software that keeps getting better.',
    description:
      'We design and build reliable SaaS products, from the first useful release to the systems that support what comes next.',
    intro:
      'A successful SaaS product balances a clear customer experience with a dependable technical foundation. We work with you to find the valuable first version, build it carefully, and make room for learning and growth.',
    process: [
      { title: 'Find the signal', description: 'Align on the customer, the problem, and the smallest meaningful release.' },
      { title: 'Shape the product', description: 'Map key journeys, define the system, and prototype the experience.' },
      { title: 'Build and validate', description: 'Ship in focused increments, test assumptions, and keep quality visible.' },
      { title: 'Improve with intent', description: 'Measure real use, prioritize what matters, and evolve the platform.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Cloud infrastructure'],
    relatedProjectSlugs: ['northstar'],
    faqs: [
      { question: 'Can you help take an idea from concept to launch?', answer: 'Yes. We can work from early discovery and product definition through design, engineering, testing, and launch.' },
      { question: 'Can you join an existing product team?', answer: 'Yes. We can contribute as a focused delivery partner, strengthen a specific area, or work alongside your in-house team.' },
      { question: 'How do you approach the first release?', answer: 'We prioritize the core customer problem and agree on a useful, testable first release before expanding scope.' },
    ],
    metadata: {
      title: 'SaaS Development',
      description: 'Build and evolve thoughtful SaaS products with Recursa, from first release through reliable growth.',
    },
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    eyebrow: 'DIGITAL EXPERIENCES / 02',
    headline: 'A better web, built around people.',
    description:
      'We create fast, accessible websites and web applications that bring a brand and its goals into focus.',
    intro:
      'The web is often the first place people meet your product. We combine clear information architecture, considered visual design, and robust frontend engineering to make that first interaction count.',
    process: [
      { title: 'Understand the audience', description: 'Clarify the people, purpose, content, and measures of success.' },
      { title: 'Design the experience', description: 'Create a coherent structure and responsive visual direction.' },
      { title: 'Build for the real world', description: 'Develop accessible, performant pages and useful interactions.' },
      { title: 'Launch and learn', description: 'Test across devices, ship with confidence, and refine from feedback.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Content platforms', 'Web performance'],
    relatedProjectSlugs: ['forma'],
    faqs: [
      { question: 'Do you build both marketing sites and web applications?', answer: 'Yes. We work on brand and content-led websites as well as interactive web products and customer portals.' },
      { question: 'Will the site work on mobile and assistive technology?', answer: 'Responsive behavior and accessibility are part of the design and implementation process from the start.' },
      { question: 'Can our team update content after launch?', answer: 'We can integrate an appropriate content platform and shape an editing experience around your team.' },
    ],
    metadata: {
      title: 'Web Development',
      description: 'Recursa builds accessible, high-performing websites and web applications for ambitious teams.',
    },
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    eyebrow: 'MOBILE PRODUCTS / 03',
    headline: 'Useful ideas, always within reach.',
    description:
      'We build mobile experiences that feel natural to use, work reliably, and help people make progress wherever they are.',
    intro:
      'Great mobile products respect the pace and context of everyday life. We help shape the right experience, then bring it to life with thoughtful interaction design and dependable engineering.',
    process: [
      { title: 'Explore the context', description: 'Understand users, devices, environments, and the moments that matter.' },
      { title: 'Prototype the flow', description: 'Define core journeys and test the interaction before committing to build.' },
      { title: 'Build the product', description: 'Develop the app, connect services, and verify behavior across devices.' },
      { title: 'Release and evolve', description: 'Prepare for launch, learn from use, and improve with each iteration.' },
    ],
    technologies: ['React Native', 'TypeScript', 'iOS', 'Android', 'API integration', 'App analytics'],
    relatedProjectSlugs: ['stride'],
    faqs: [
      { question: 'Do you build for both iOS and Android?', answer: 'Yes. We can recommend a native or cross-platform approach based on the product, audience, and constraints.' },
      { question: 'Can the app connect to our existing services?', answer: 'We can integrate with existing APIs and systems, and help define new service interfaces where needed.' },
      { question: 'Do you support app store release?', answer: 'Yes. Release preparation, device testing, and store submission can be part of the engagement.' },
    ],
    metadata: {
      title: 'Mobile App Development',
      description: 'Design and build useful iOS and Android apps with Recursa, from validated concept to launch.',
    },
  },
  {
    slug: 'iot-solutions',
    name: 'IoT Solutions',
    eyebrow: 'CONNECTED PRODUCTS / 04',
    headline: 'Connect the signal to the useful.',
    description:
      'We bring connected devices, data, and software together to make real-world systems easier to understand and act on.',
    intro:
      'Connected products need to work across physical devices and digital experiences. We help teams make the important signals reliable, understandable, and useful to the people who depend on them.',
    process: [
      { title: 'Map the environment', description: 'Understand devices, users, connectivity, constraints, and operating conditions.' },
      { title: 'Prove the connection', description: 'Prototype data flows and validate the device-to-cloud architecture.' },
      { title: 'Build the system', description: 'Connect firmware, services, and interfaces with security and reliability in mind.' },
      { title: 'Deploy and observe', description: 'Test in context, monitor performance, and improve from real-world signals.' },
    ],
    technologies: ['IoT protocols', 'Device gateways', 'Cloud services', 'TypeScript', 'Telemetry', 'Data visualization'],
    relatedProjectSlugs: ['fieldnote'],
    faqs: [
      { question: 'Can you work with devices we already have?', answer: 'Often, yes. We begin by understanding device capabilities, protocols, connectivity, and constraints.' },
      { question: 'Can you build the dashboard as well as the data pipeline?', answer: 'Yes. We can work across device connectivity, backend services, data handling, and user-facing tools.' },
      { question: 'How do you account for unreliable connectivity?', answer: 'We design around the operating context, including buffering, retries, observability, and graceful offline behavior where appropriate.' },
    ],
    metadata: {
      title: 'IoT Solutions',
      description: 'Build connected products and IoT software with Recursa, from device integration to useful data experiences.',
    },
  },
]

export const SERVICE_BY_SLUG = new Map(SERVICES.map((service) => [service.slug, service]))

export const SERVICE_PROJECTS = SELECTED_PROJECTS
