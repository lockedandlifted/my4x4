import { prisma } from '@server/db/client'

type ActivitySubject = {
  eventType?: string,
  subjectId: string,
  subjectType: string,
}

type DeleteActivityItemParams = {
  subjects: ActivitySubject[],
}

const deleteActivityItem = async (params: DeleteActivityItemParams) => {
  const { subjects } = params

  // Find Activity
  const activityItems = await prisma.activityItem.findMany({
    where: {
      OR: subjects,
    },
  })

  const parentItemIds = activityItems.map(activityItem => activityItem.parentItemId)
    .filter(id => id)

  // Loop through Parent Item Ids
  parentItemIds.forEach(async (parentItemId) => {
    // Find Similar Items
    const similarItems = await prisma.activityItem.findMany({
      where: {
        parentItemId,
      },
    })

    // If we have less than 2 items in the group, delete the parent activity
    if (similarItems.length <= 2) {
      // Delete Parent Activity
      await prisma.activityItem.delete({
        where: {
          id: parentItemId || 'undefined',
        },
      })
    }
  })

  // Delete Activities
  await prisma.activityItem.deleteMany({
    where: {
      OR: subjects,
    },
  })
}

export default deleteActivityItem
