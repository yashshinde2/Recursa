export type HackathonBadge = {
  text: string
  tone: 'first' | 'winner' | 'selected' | 'organizer' | 'none'
}

export type HackathonLink = {
  label: string
  href: string
}

export type HackathonPhoto = {
  id: string
  caption?: string
  alt?: string
}

export type Hackathon = {
  slug: string
  shortName: string
  event: string
  venue: string
  city: string
  dateLabel: string
  duration?: string
  teamLabel?: string
  badge: HackathonBadge
  title: string
  summary: string
  story: string
  facts: string[]
  learned: string
  links: HackathonLink[]
  note: string
  photos: string[]
  photoDetails?: Record<string, { caption?: string; alt?: string }>
}

export const HACKATHONS: Hackathon[] = [
  {
    slug: 'sgu-prabal',
    shortName: 'SGU Prabal',
    event: 'Prabal Hackathon',
    venue: 'Sanjay Ghodawat University', // TODO confirm
    city: 'Kolhapur',
    dateLabel: '18-20 Apr 2025',
    duration: '60 hours',
    teamLabel: 'Team of 4',
    badge: { tone: 'first', text: 'Our first hackathon' },
    title: 'Smart Bharat AI Assistant',
    summary: 'A multilingual AI assistant for rural India, simple enough for anyone to use.',
    // TODO edit story copy
    story:
      'Our first hackathon, and the start of everything. Four of us, sixty hours, one question: what if an AI assistant spoke the way rural India speaks? We built Smart Bharat: multilingual, and made for people who have never used an assistant before.',
    facts: ['60 hours', '4 of us', 'Multilingual', 'Rural-first'],
    learned: "You don't need to be ready. You need to begin.",
    note: '60 hrs. 4 of us. Day one.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/yashshinde2/smart-bharat-ai-assistant',
      },
    ],
    photos: ['sgu1', 'sgu2', 'sgu3', 'sgu4', 'sgu5'],
  },
  {
    slug: 'dkte-prarambha',
    shortName: 'DKTE Prarambha',
    event: 'Prarambha Hackathon',
    venue: 'DKTE College',
    city: 'Ichalkaranji',
    dateLabel: '30 Aug 2025',
    teamLabel: 'Team of 4',
    badge: { tone: 'none', text: '' },
    title: 'Call For Life',
    summary: 'Blood and plasma, one phone call away.',
    // TODO edit story copy
    story:
      'Plasma expires early, so every hour counts. We built Call For Life: a dashboard for blood banks to manage stock and requests, plus a fully automated WhatsApp and phone-call system. A person just calls, asks for blood or plasma, and the system does the rest.',
    facts: ['Blood bank dashboard', 'WhatsApp + call automation', 'Full system'],
    learned: 'Build for the person on the other end of the phone.',
    note: 'Plasma expires fast.',
    links: [
      {
        label: 'Call For Life',
        href: 'https://github.com/yashshinde2/Call-For-Life',
      },
      {
        label: 'Blood bank dashboard',
        href: 'https://github.com/yashshinde2/blood-bank-dashboard',
      },
    ],
    photos: ['dkte1', 'dkte2', 'dkte3', 'dkte4'],
  },
  {
    slug: 'sih-e-tongue',
    shortName: 'SIH Internal',
    event: 'Smart India Hackathon, internal round',
    venue: 'Our college', // TODO confirm
    city: 'Kolhapur',
    dateLabel: '22 Sep 2025',
    teamLabel: 'Team of 6',
    badge: { tone: 'winner', text: '1st Prize' },
    title: 'E-Tongue',
    summary: 'A low-cost device that identifies dravya and detects adulteration in ayurvedic products.',
    // TODO edit story copy
    story:
      'Industrial devices that identify the rasa of an ayurvedic product, or spot adulteration, cost lakhs and crores. We wanted one that costs thousands. Six of us spent months collecting data, training ML models and building the device. In September 2025 it won first prize at our college’s SIH internal hackathon.',
    facts: ['Team of 6', 'Months of work', 'Costs thousands, not lakhs', 'ML + hardware'],
    learned: 'Months of quiet effort can fit into one demo. Do the months.',
    note: 'Lakhs to thousands.',
    links: [],
    photos: ['sih1', 'sih2', 'sih3', 'sih4'],
  },
  {
    slug: 'plaksha-hammer-time',
    shortName: 'TrackShift 1',
    event: 'TrackShift Hackathon x MoneyGram Haas F1 Team',
    venue: 'Plaksha University',
    city: 'Chandigarh',
    dateLabel: '15-16 Nov 2025',
    badge: { tone: 'selected', text: 'Top 10% selected' },
    title: 'Hammer Time',
    summary: 'Fast, secure and reliable file transfer for F1 teams.',
    // TODO confirm "thousands" and the 40 hours of travel; edit story copy
    story:
      'Our love for Formula 1 pulled us to Plaksha University for the TrackShift Hackathon with the MoneyGram Haas F1 Team. We were selected from thousands of applicants, in the top 10%, and travelled about 2,000 km from Maharashtra to be there. Then we built Hammer Time: file transfer that is fast, secure and reliable enough for an F1 team.',
    facts: ['About 2,000 km', '40 hours on the road', 'Top 10%'],
    learned: 'Curiosity is worth 2,000 km.',
    note: '2,000 km for an idea.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/yashshinde2/hammer_time',
      },
    ],
    photos: ['chandigarh1', 'chandigarh2', 'chandigarh3'],
  },
  {
    slug: 'hackoutsav-2026',
    shortName: 'Hackoutsav 2026',
    event: 'Hackoutsav 2026, national-level hackathon',
    venue: 'D. Y. Patil School of Engineering and Management',
    city: 'Kolhapur',
    dateLabel: '24 Apr 2026',
    duration: '24 hours',
    badge: { tone: 'organizer', text: 'Organized by us' },
    title: 'From participating to hosting',
    summary: 'Our own national-level hackathon.',
    // TODO edit story copy
    story:
      'We started as participants. Then we wanted to build the room ourselves. On 24 April 2026, at D. Y. Patil School of Engineering and Management in Kolhapur, we organised Hackoutsav: a 24-hour national-level hackathon.',
    facts: ['National level', '24 hours', 'Organized by our team'],
    learned: 'Hosting a hackathon teaches what taking part never can.',
    note: 'We built the room.',
    links: [],
    photos: ['hackoutsav1', 'hackoutsav2', 'hackoutsav3', 'hackoutsav4', 'hackoutsav5'],
  },
  {
    slug: 'plaksha-raceiq',
    shortName: 'TrackShift 2',
    event: 'TrackShift Innovation Challenge x TGR Haas F1 Team',
    venue: 'Plaksha University',
    city: 'Chandigarh',
    dateLabel: '13 Sep 2026',
    teamLabel: '2 teams of 2',
    badge: { tone: 'selected', text: 'Both teams selected' },
    title: 'RaceIQ',
    summary: 'Energy and overtake intelligence for F1 cars, with no AI.',
    // TODO edit story copy
    story:
      'Back to Plaksha, again 2,000 km and 40 hours away, this time with the TGR Haas F1 Team. We sent two teams of two, and both were selected. We built RaceIQ: when to hold, attack, defend or overtake, worked out with pure maths. No LLM, no AI, because at F1 speeds latency is everything. We designed it around the rules, including the 50/50 split between battery and engine power and the limits on remaining charge.',
    facts: ['2 teams of 2', 'No LLM, no AI', 'Minimal latency', 'Built around the rules'],
    learned: "The right tool isn't always the newest one.",
    note: 'Pure maths. Zero AI.',
    links: [
      {
        label: 'View on GitHub',
        href: 'https://github.com/yashshinde2/RaceIQ',
      },
    ],
    photos: ['chandigarhsecond1', 'chandigarhsecond2', 'chandigarhsecond3', 'chandigarhsecond4'],
  },
]

export const JOURNEY_FRAMES = HACKATHONS

