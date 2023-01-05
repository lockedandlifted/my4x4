import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const projectPageViewsRouter = router({
  createProjectPageView: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectPageView.create({
      data: {
        project: {
          connect: {
            slug: input.slug,
          },
        },
      },
    })),
})

export default projectPageViewsRouter
