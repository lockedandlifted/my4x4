import type { GetServerSideProps } from 'next'

import MobileLayout from '@layouts/MobileLayout'

import Hero from '@components/Landing/Hero'
import RecentProjects from '@components/Landing/RecentProjects'

const Home = () => (
  <MobileLayout>
    <Hero />

    <RecentProjects />
  </MobileLayout>
)

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  )

  return { props: {} }
}

export default Home
