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

  getComments: publicProcedure
    .input(z.object({
      projectId: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.Enumerable<Prisma.CommentWhereInput> = []

      // Project ID
      if (input.projectId) {
        filters.push({
          projectsComments: {
            some: {
              projectId: input.projectId,
            },
          },
        })
      }

      return ctx.prisma.comment.findMany({
        where: {
          AND: filters,
        },
        include: {
          _count: {
            select: {
              subComments: true,
              commentLikes: true,
            },
          },
          subComments: {
            include: {
              _count: {
                select: {
                  commentLikes: true,
                },
              },
              user: {
                include: {
                  usersImages: {
                    include: {
                      image: true,
                    },
                    orderBy: {
                      sort: 'asc',
                    },
                    take: 1,
                  },
                },
              },
            },
          },
          commentLikes: true,
          user: {
            include: {
              usersImages: {
                include: {
                  image: true,
                },
                orderBy: {
                  sort: 'asc',
                },
                take: 1,
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),
})

export default commentsRouter
