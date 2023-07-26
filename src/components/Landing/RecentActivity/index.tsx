import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import ActivityItem from '@components/ActivityItem'

const RecentActivity = () => {
  const activityItemsQuery = trpc.activityItems.getActivityItems.useQuery({
    limit: 20,
  })
  const { data: activityItems } = activityItemsQuery

  return (
    <Flex
      borderTopWidth="1px"
      borderStyle="dashed"
      direction="column"
      marginTop="8"
      paddingTop="8"
      width="100%"
    >
      <Heading as="h1" fontWeight="medium" marginBottom="8" size="lg">
        Recent Activity
      </Heading>

      {activityItems?.map(activityItem => (
        <ActivityItem key={activityItem.id} activityItem={activityItem} />
      ))}
    </Flex>
  )
}

export default RecentActivity
