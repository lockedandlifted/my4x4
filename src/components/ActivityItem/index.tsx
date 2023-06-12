import React, { Suspense } from 'react'
import { Flex } from '@chakra-ui/react'

import type { ActivityItem as ActivityItemType } from '@prisma/client'

import useActivityItem from '@hooks/useActivityItem'

import PostCreated from './components/PostCreated'
import ProjectCreated from './components/ProjectCreated'

const components = {
  'posts.created': PostCreated,
  'projects.created': ProjectCreated,
} as const

type ActivityItemProps = {
  activityItem: ActivityItemType,
}

const ActivityItem = (props: ActivityItemProps) => {
  const { activityItem } = props

  const activityItemPayload = useActivityItem({ activityItem })

  const Component = components[activityItem.eventType]
  if (!Component) return null

  return (
    <Suspense>
      <Component
        {...activityItemPayload}
      />
    </Suspense>
  )
}

export default ActivityItem
