import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const postPageViewsRouter = router({
  createPostPageView: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.postPageView.create({
      data: {
        post: {
          connect: {
            id: input.id,
          },
        },
      },
    })),

  getViewCountForPostId: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.postPageView.count({
      where: {
        post: {
          id: input.id,
        },
      },
    })),
})

export default postPageViewsRouter
