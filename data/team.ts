export type TeamMemberLinks = {
  email: string
  linkedin: string
  github: string
  x: string
  portfolio?: string
}

export type TeamMember = {
  name: string
  role: string
  title: string
  image: string
  imageAlt: string
  links: TeamMemberLinks
}

export const TEAM: TeamMember[] = [
  {
    name: 'Yash Sandeep Shinde',
    role: 'Co-founder',
    title: 'Software Engineer',
    image: '/people/yash-shinde.png',
    imageAlt:
      'Portrait of Yash Sandeep Shinde, Co-founder and Software Engineer at Recursa Technologies',
    links: {
      email: 'yashysshinde@gmail.com',
      linkedin: 'https://www.linkedin.com/in/yashshinde2',
      github: 'https://github.com/yashshinde2',
      x: 'https://x.com/yashshinde__',
      portfolio: 'https://yash-shinde.vercel.app/',
    },
  },
  {
    name: 'Rupesh Bhauso Patil',
    role: 'Co-founder',
    title: 'Software Engineer',
    image: '/people/rupesh-patil.png',
    imageAlt:
      'Portrait of Rupesh Bhauso Patil, Co-founder and Software Engineer at Recursa Technologies',
    links: {
      email: 'rupeshgbpatil@gmail.com',
      linkedin: 'https://www.linkedin.com/in/imrupeshpatil',
      github: 'https://github.com/rupeshpatil-web',
      x: 'https://x.com/Imrupeshpatil',
    },
  },
  {
    name: 'Aditya Shivaji Nikam',
    role: 'Co-founder',
    title: 'Software Engineer',
    image: '/people/aditya-nikam.png',
    imageAlt:
      'Portrait of Aditya Shivaji Nikam, Co-founder and Software Engineer at Recursa Technologies',
    links: {
      email: 'nikama235@gmail.com',
      linkedin: 'https://www.linkedin.com/in/adityanikam24',
      github: 'https://github.com/adityanikam1363',
      x: 'https://x.com/Adityanikam24',
    },
  },
  {
    name: 'Arya Sanjay Nigavekar',
    role: 'Co-founder',
    title: 'Software Engineer',
    image: '/people/ary-nigavekar.png',
    imageAlt:
      'Portrait of Arya Sanjay Nigavekar, Co-founder and Software Engineer at Recursa Technologies',
    links: {
      email: 'aryanigavekar@gmail.com',
      linkedin: 'https://www.linkedin.com/in/aryanigavakar/',
      github: 'https://github.com/Arya2005-ni',
      x: 'https://x.com/AryaN24393',
    },
  },
]
