import React from 'react'

import type { ActivityItem as ActivityItemType } from '@prisma/client'

import PostCreated from './components/PostCreated'
import PostPublished from './components/PostPublished'
import ProjectPublished from './components/ProjectPublished'
import ProjectsImageCreated from './components/ProjectsImageCreated'
import ProjectsImageCreatedGrouped from './components/ProjectsImageCreatedGrouped'
import ProjectsPartCreated from './components/ProjectsPartCreated'
import ProjectsPartCreatedGrouped from './components/ProjectsPartCreatedGrouped'

const components = {
  'posts.created': PostCreated,
  'posts.published': PostPublished,
  'projects.published': ProjectPublished,
  'projects_images.created': ProjectsImageCreated,
  'projects_images.created.grouped': ProjectsImageCreatedGrouped,
  'projects_manufacturer_parts.created': ProjectsPartCreated,
  'projects_manufacturer_parts.created.grouped': ProjectsPartCreatedGrouped,
} as const

type ActivityItemProps = {
  activityItem: ActivityItemType,
}

const ActivityItem = (props: ActivityItemProps) => {
  const { activityItem } = props

  const Component = components[activityItem.eventType]
  if (!Component) {
    return null
  }

  return (
    <Component
      activityItem={activityItem}
    />
  )
}

export default ActivityItem
