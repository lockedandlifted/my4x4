import { Flex, Heading } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import ActivityItem from '@components/ActivityItem'
import Hero from '@components/Landing/Hero'

const HomePage = () => {
  const { data: sessionData } = useSession()
  const isAuthenticated = !!sessionData?.user?.id

  const activityItemsQuery = trpc.activityItems.getActivityItems.useQuery({
    limit: 20,
  })
  const { data: activityItems } = activityItemsQuery

  return (
    <MobileLayout>
      {!isAuthenticated && <Hero />}

      <Flex
        borderTopWidth="1px"
        borderStyle={isAuthenticated ? 'none' : 'dashed'}
        direction="column"
        marginTop="8"
        paddingTop={isAuthenticated ? '0' : '8'}
        width="100%"
      >
        <Heading as="h1" fontWeight="medium" marginBottom="8" size="lg">
          Recent Activity
        </Heading>

        {activityItems?.map(activityItem => (
          <ActivityItem key={activityItem.id} activityItem={activityItem} />
        ))}
      </Flex>
    </MobileLayout>
  )
}

export default HomePage
