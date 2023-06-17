import { prisma } from '@server/db/client'

import type { ActivityItem } from '@prisma/client'

const currentDate = new Date()
const oneHourAgo = new Date(currentDate.getTime() - 1000 * 60 * 60)

const eventTypes = [
  'posts.created',
  'posts_comments.created',
  'projects.published',
  'projects_images.created',
  'projects_manufacturer_parts.created',
] as const

const groupableEventTypes = [
  'projects_images.created',
] as const

type EventType = typeof eventTypes[number]

type CreateActivityItemParams = {
  eventType: EventType,
  ownerId: string,
  ownerType: string,
  parentSubjectId?: string,
  parentSubjectType?: string,
  subjectId: string,
  subjectType: string,
}

const groupSimilarActivityItems = async (params: CreateActivityItemParams) => {
  const {
    eventType,
    ownerId,
    ownerType,
    parentSubjectId,
    parentSubjectType,
  } = params

  if (!groupableEventTypes.includes(eventType) || !parentSubjectType || !parentSubjectId) {
    return
  }

  const similarItems = await prisma.activityItem.findMany({
    where: {
      eventType,
      parentSubjectId,
      parentSubjectType,
      createdAt: {
        gte: oneHourAgo,
      },
    },
    include: {
      parentItem: true,
    },
  })

  if (similarItems.length < 2) {
    return
  }

  // Existing Parent Activity Item
  const existingParentItemAttributes = {
    eventType: `${eventType}.grouped`,
    isGroup: true,
    ownerId,
    ownerType,
    subjectId: parentSubjectId,
    subjectType: parentSubjectType,
  }

  const existingParentItem = await prisma.activityItem.findFirst({
    where: {
      ...existingParentItemAttributes,
      createdAt: {
        gte: oneHourAgo,
      },
    },
  })

  // Setup the Parent Activity Item
  const parentItem = existingParentItem || await prisma.activityItem.create({
    data: existingParentItemAttributes,
  })

  // Update the Parent Activity Item for each similar Activity Item
  await Promise.all(
    similarItems.map(async (activityItem: ActivityItem) => {
      await prisma.activityItem.update({
        where: {
          id: activityItem.id,
        },
        data: {
          parentItemId: parentItem.id,
        },
      })
    }),
  )
}

const createActivityItem = async (params: CreateActivityItemParams) => {
  const {
    eventType,
    ownerId,
    ownerType,
    parentSubjectId,
    parentSubjectType,
    subjectId,
    subjectType,
  } = params

  const activityItem = await prisma.activityItem.create({
    data: {
      eventType,
      ownerId,
      ownerType,
      parentSubjectId,
      parentSubjectType,
      subjectId,
      subjectType,
    },
  })

  // Group Similar Items belonging to Parent Subject
  await groupSimilarActivityItems(params)

  return activityItem
}

export default createActivityItem
