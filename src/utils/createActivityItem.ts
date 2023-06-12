import { prisma } from '@server/db/client'

const eventTypes = [
  'posts.created',
  'posts_comments.created',
  'projects.created',
  'projects_images.created',
  'projects_manufacturer_parts.created',
  'projects.updated',
] as const

type EventType = typeof eventTypes[number]

type CreateActivityItemParams = {
  eventType: EventType,
  ownerId: string,
  ownerType: string,
  subjectId: string,
  subjectType: string,
}

const createActivityItem = async (params: CreateActivityItemParams) => {
  const {
    eventType,
    ownerId,
    ownerType,
    subjectId,
    subjectType,
  } = params

  const activityItem = await prisma.activityItem.create({
    data: {
      eventType,
      ownerId,
      ownerType,
      subjectId,
      subjectType,
    },
  })

  return activityItem
}

export default createActivityItem
