export type JourneyFrame = {
  name: string
  date: string
  location: string
  problem: string
  result: string
  learned: string
  teamPhotoPlaceholder: string
  screenshotPlaceholder: string
}

export const JOURNEY_FRAMES: JourneyFrame[] = [
  {
    name: 'Origin Story',
    date: '2021 · THE BEGINNING',
    location: 'A shared desk, a big idea',
    problem: 'How do we turn a small idea into something people can use?',
    result: 'We started building, testing, and learning together.',
    learned: 'Start curious. Keep showing up.',
    teamPhotoPlaceholder: 'The first team photo goes here',
    screenshotPlaceholder: 'The first sketch goes here',
  },
  {
    name: 'Build For Good',
    date: '2022 · PLACEHOLDER',
    location: 'Bengaluru, India',
    problem: 'Help local communities discover nearby support and resources.',
    result: 'A working prototype connecting people to local initiatives.',
    learned: 'The best solutions begin by listening.',
    teamPhotoPlaceholder: 'Build For Good team photo',
    screenshotPlaceholder: 'Community resource app screenshot',
  },
  {
    name: 'Climate Code',
    date: '2023 · PLACEHOLDER',
    location: 'Pune, India',
    problem: 'Make everyday energy use easier to understand and improve.',
    result: 'An interactive dashboard for tracking household energy habits.',
    learned: 'Make useful data clear, then make action possible.',
    teamPhotoPlaceholder: 'Climate Code team photo',
    screenshotPlaceholder: 'Energy dashboard screenshot',
  },
  {
    name: 'Open Health',
    date: '2024 · PLACEHOLDER',
    location: 'Hyderabad, India',
    problem: 'Make reliable health information easier to find on the move.',
    result: 'A multilingual mobile-first guide built over one weekend.',
    learned: 'Accessibility belongs in the first draft.',
    teamPhotoPlaceholder: 'Open Health team photo',
    screenshotPlaceholder: 'Mobile health guide screenshot',
  },
  {
    name: 'Future Interfaces',
    date: '2025 · PLACEHOLDER',
    location: 'Chennai, India',
    problem: 'Explore a more natural way for people to interact with connected devices.',
    result: 'A sensor-powered prototype with a simple, responsive control panel.',
    learned: 'Experiment boldly, then refine what works.',
    teamPhotoPlaceholder: 'Future Interfaces team photo',
    screenshotPlaceholder: 'Connected device interface screenshot',
  },
]
