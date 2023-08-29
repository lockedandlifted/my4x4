import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import inngestClient from '@utils/inngestClient'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

const projectImagesCommentsRouter = createTRPCRouter({
  getProjectImagesComments: publicProcedure
    .input(z.object({
      projectsImageId: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectImagesCommentWhereInput = {
        projectsImageId: input.projectsImageId,
      }

      return ctx.prisma.projectImagesComment.findMany({
        where: filters,
        include: {
          comment: {
            include: {
              _count: {
                select: {
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

  createProjectImagesComment: protectedProcedure
    .input(z.object({
      commentBody: z.string(),
      projectsImageId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create ProjectImagesComment
      const projectImagesComment = await ctx.prisma.projectImagesComment.create({
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
          projectsImage: {
            connect: {
              id: input.projectsImageId,
            },
          },
        },
        include: {
          comment: true,
          projectsImage: true,
        },
      })

      // Queue Notification Email
      // Dont send if the project user is the same as the comment user
      const commentOwnerId = projectImagesComment?.comment?.userId

      if (
        commentOwnerId !== ctx.session?.user?.id
        && projectImagesComment?.commentId
        && projectImagesComment?.projectsImageId
      ) {
        await inngestClient.send({
          name: 'mailers/new-project-images-comment-email',
          data: {
            commentId: projectImagesComment?.commentId,
            projectsImageId: projectImagesComment?.projectsImageId,
          },
        })
      }

      return projectImagesComment
    }),
})

export default projectImagesCommentsRouter
