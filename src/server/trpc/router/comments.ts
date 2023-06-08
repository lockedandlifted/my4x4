import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const commentsRouter = router({
  createComment: protectedProcedure
    .input(z.object({
      body: z.string(),
      parentCommentId: z.string().optional(),
    }))
    .mutation(({ ctx, input }) => {
      const data: Prisma.CommentCreateInput = {
        body: input.body,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      }

      if (input.parentCommentId) {
        data.parentComment = {
          connect: {
            id: input.parentCommentId,
          },
        }
      }

      return ctx.prisma.comment.create({
        data,
        include: {
          parentComment: true,
          user: true,
        },
      })
    }),
})

export default commentsRouter
