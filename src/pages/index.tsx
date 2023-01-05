import MobileLayout from '@layouts/MobileLayout'

import Hero from '@components/Landing/Hero'
import RecentProjects from '@components/Landing/RecentProjects'

const Home = () => (
  <MobileLayout>
    <Hero />

    <RecentProjects />
  </MobileLayout>
)

export default Home
