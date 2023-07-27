import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const imagesCommentsRouter = router({
  getImagesComments: publicProcedure
    .input(z.object({
      imageId: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ImagesCommentWhereInput = {
        imageId: input.imageId,
      }

      return ctx.prisma.imagesComment.findMany({
        where: filters,
        include: {
          comment: {
            include: {
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
        },
        orderBy: {
          sort: 'asc',
        },
      })
    }),

  createImagesComment: protectedProcedure
    .input(z.object({
      commentBody: z.string(),
      imageId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create ImagesComment
      const imagesComment = await ctx.prisma.imagesComment.create({
        data: {
          comment: {
            create: {
              body: input.commentBody,
              user: {
                connect: {
                  id: ctx.session?.user?.id,
                },
              },
            },
          },
          image: {
            connect: {
              id: input.imageId,
            },
          },
        },
        include: {
          image: true,
        },
      })

      return imagesComment
    }),
})

export default imagesCommentsRouter
