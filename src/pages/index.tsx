import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import MobileLayout from '@layouts/MobileLayout'

import About from '@components/Landing/About'
import BrowseManufacturers from '@components/Landing/BrowseManufacturers'
import Hero from '@components/Landing/Hero'
import RecentActivity from '@components/Landing/RecentActivity'
import RecentProjects from '@components/Landing/RecentProjects'

const HomePage = (
  { time }: InferGetServerSidePropsType<typeof getServerSideProps>,
) => (
  <MobileLayout generatedAt={time}>
    <Hero />
    <RecentProjects />
    <BrowseManufacturers />
    <RecentActivity />
    <About />
  </MobileLayout>
)

export const getServerSideProps: GetServerSideProps<{ time: string }> = async ({
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=3600',
  )

  return {
    props: {
      time: new Date().toISOString(),
    },
  }
}

export default HomePage
