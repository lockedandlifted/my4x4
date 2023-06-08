import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const commentLikesRouter = router({
  createCommentLike: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.commentLike.create({
      data: {
        comment: {
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

  getLikesCountForCommentId: publicProcedure
    .input(z.object({
      currentUserOnly: z.boolean().optional(),
      id: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.CommentLikeWhereInput = {
        comment: {
          id: input.id,
        },
      }

      if (input.currentUserOnly) {
        filters.user = {
          id: ctx.session?.user?.id || 'unauthenticated',
        }
      }

      return ctx.prisma.commentLike.count({
        where: filters,
      })
    }),

  deleteCommentLike: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.commentLike.deleteMany({
      where: {
        comment: {
          id: input.id,
        },
        user: {
          id: ctx.session.user.id,
        },
      },
    })),
})

export default commentLikesRouter
