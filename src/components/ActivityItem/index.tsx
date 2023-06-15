import React from 'react'

import type { ActivityItem as ActivityItemType } from '@prisma/client'

import PostCreated from './components/PostCreated'
import ProjectPublished from './components/ProjectPublished'
import ProjectsImageCreated from './components/ProjectsImageCreated'
import ProjectsPartCreated from './components/ProjectsPartCreated'

const components = {
  'posts.created': PostCreated,
  'projects.published': ProjectPublished,
  'projects_images.created': ProjectsImageCreated,
  'projects_manufacturer_parts.created': ProjectsPartCreated,
} as const

type ActivityItemProps = {
  activityItem: ActivityItemType,
}

const ActivityItem = (props: ActivityItemProps) => {
  const { activityItem } = props

  const Component = components[activityItem.eventType]
  if (!Component) return null

  return (
    <Component
      activityItem={activityItem}
    />
  )
}

export default ActivityItem
