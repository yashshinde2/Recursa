export type TeamMember = {
  name: string
  role: string
  builds: string
  portrait: 'architect' | 'designer' | 'engineer' | 'maker' | 'strategist' | 'builder'
  accent: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Alex Morgan',
    role: 'Founder & Product',
    builds: 'I build clear paths from ambitious ideas to useful products.',
    portrait: 'architect',
    accent: 'bg-[#c6a58b]',
  },
  {
    name: 'Sam Rivera',
    role: 'Design Lead',
    builds: 'I build interfaces that feel considered, simple, and human.',
    portrait: 'designer',
    accent: 'bg-[#91a5a0]',
  },
  {
    name: 'Jordan Lee',
    role: 'Software Engineer',
    builds: 'I build dependable systems that make complex things work.',
    portrait: 'engineer',
    accent: 'bg-[#b8a0a0]',
  },
  {
    name: 'Taylor Quinn',
    role: 'Mobile Developer',
    builds: 'I build small-screen experiences that go wherever life does.',
    portrait: 'maker',
    accent: 'bg-[#c4b38d]',
  },
  {
    name: 'Casey Patel',
    role: 'Connected Products',
    builds: 'I build bridges between software, sensors, and the world.',
    portrait: 'strategist',
    accent: 'bg-[#9aa4bc]',
  },
  {
    name: 'Riley Chen',
    role: 'Delivery & Strategy',
    builds: 'I build momentum by keeping teams focused on what matters.',
    portrait: 'builder',
    accent: 'bg-[#ba9bb0]',
  },
]
