import MobileLayout from '@layouts/MobileLayout'

import BrowseManufacturers from '@components/Landing/BrowseManufacturers'
import Hero from '@components/Landing/Hero'
import RecentActivity from '@components/Landing/RecentActivity'
import RecentProjects from '@components/Landing/RecentProjects'

const HomePage = () => (
  <MobileLayout>
    <Hero />
    <RecentProjects />
    <BrowseManufacturers />
    <RecentActivity />
  </MobileLayout>
)

export default HomePage
