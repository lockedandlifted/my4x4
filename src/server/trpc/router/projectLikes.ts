import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const projectLikesRouter = router({
  createProjectLike: protectedProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectLike.create({
      data: {
        project: {
          connect: {
            slug: input.slug,
          },
        },
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    })),

  getLikesCountForProjectSlug: publicProcedure
    .input(z.object({
      currentUserOnly: z.boolean().optional(),
      slug: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectLikeWhereInput = {
        project: {
          slug: input.slug,
        },
      }

      if (input.currentUserOnly) {
        filters.user = {
          id: ctx.session?.user?.id || 'unauthenticated',
        }
      }

      return ctx.prisma.projectLike.count({
        where: filters,
      })
    }),

  deleteProjectLike: protectedProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectLike.deleteMany({
      where: {
        project: {
          slug: input.slug,
        },
        user: {
          id: ctx.session.user.id,
        },
      },
    })),
})

export default projectLikesRouter
