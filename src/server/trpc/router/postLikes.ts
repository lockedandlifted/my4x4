import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

const postLikesRouter = createTRPCRouter({
  createPostLike: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.postLike.create({
      data: {
        post: {
          connect: {
            id: input.id,
          },
        },
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    })),

  getLikesCountForPostId: publicProcedure
    .input(z.object({
      currentUserOnly: z.boolean().optional(),
      id: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.PostLikeWhereInput = {
        post: {
          id: input.id,
        },
      }

      if (input.currentUserOnly) {
        filters.user = {
          id: ctx.user?.id || 'unauthenticated',
        }
      }

      return ctx.prisma.postLike.count({
        where: filters,
      })
    }),

  deletePostLike: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.postLike.deleteMany({
      where: {
        post: {
          id: input.id,
        },
        user: {
          id: ctx.user.id,
        },
      },
    })),
})

export default postLikesRouter
