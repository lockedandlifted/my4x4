import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const projectPageViewsRouter = createTRPCRouter({
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

  getViewCountForProjectSlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectPageView.count({
      where: {
        project: {
          slug: input.slug,
        },
      },
    })),
})

export default projectPageViewsRouter
