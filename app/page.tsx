import { HomeIntro } from '@/components/home/home-intro'
import { Contact } from '@/components/home/contact'
import { OurJourney } from '@/components/home/our-journey'
import { Partners } from '@/components/home/partners'
import { SelectedWork } from '@/components/selected-work'
import { Services } from '@/components/home/services'
import { Team } from '@/components/home/team'
import { WhoWeAre } from '@/components/home/who-we-are'

export default function Page() {
  return (
    <main id="main" className="min-h-svh flex-1">
      <HomeIntro />
      <WhoWeAre />
      <SelectedWork />
      <Services />
      <Partners />
      <OurJourney />
      <Team />
      <Contact />
    </main>
  )
}
