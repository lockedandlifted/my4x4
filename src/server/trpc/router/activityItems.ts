import { z } from 'zod'

import { Prisma } from '@prisma/client'
import { router, publicProcedure } from '../trpc'

const activityItemsRouter = router({
  getActivityItems: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      parentSubjectId: z.string().optional(),
      parentSubjectType: z.enum(['Project']).optional(),
    }))
    .query(({ ctx, input }) => {
      const { limit, parentSubjectId, parentSubjectType } = input

      const filters: Prisma.ActivityItemWhereInput = {
        parentItemId: null,
      }

      if (parentSubjectType && parentSubjectId) {
        filters.parentSubjectType = parentSubjectType
        filters.parentSubjectId = parentSubjectId
      }

      return ctx.prisma.activityItem.findMany({
        where: {
          parentItemId: null,
        },
        include: {
          subItems: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit || 10,
      })
    }),
})

export default activityItemsRouter
