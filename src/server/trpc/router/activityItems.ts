import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const activityItemsRouter = router({
  getActivityItems: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
    }))
    .query(({ ctx, input }) => ctx.prisma.activityItem.findMany({
      where: {
        parentItemId: null,
      },
      include: {
        subItems: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: input.limit || 10,
    })),
})

export default activityItemsRouter
