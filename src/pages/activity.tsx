import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import ActivityItem from '@components/ActivityItem'

const ActivityPage = () => {
  const activityItemsQuery = trpc.activityItems.getActivityItems.useQuery({
    limit: 20,
  })
  const { data: activityItems } = activityItemsQuery

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" size="lg">
          Recent Activity
        </Heading>
      </Flex>

      {activityItems?.map(activityItem => (
        <ActivityItem key={activityItem.id} activityItem={activityItem} />
      ))}
    </MobileLayout>
  )
}

export default ActivityPage
