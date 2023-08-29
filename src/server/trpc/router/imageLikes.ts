import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

const imageLikesRouter = createTRPCRouter({
  createImageLike: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.imageLike.create({
      data: {
        image: {
          connect: {
            id: input.id,
          },
        },
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    })),

  getLikesCountForImageId: publicProcedure
    .input(z.object({
      currentUserOnly: z.boolean().optional(),
      id: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ImageLikeWhereInput = {
        image: {
          id: input.id,
        },
      }

      if (input.currentUserOnly) {
        filters.user = {
          id: ctx.session?.user?.id || 'unauthenticated',
        }
      }

      return ctx.prisma.imageLike.count({
        where: filters,
      })
    }),

  deleteImageLike: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.imageLike.deleteMany({
      where: {
        image: {
          id: input.id,
        },
        user: {
          id: ctx.session.user.id,
        },
      },
    })),
})

export default imageLikesRouter
