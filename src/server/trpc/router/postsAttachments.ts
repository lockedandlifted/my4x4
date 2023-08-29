import { z } from 'zod'

import createActivityItem from '@utils/createActivityItem'
import deleteActivityItem from '@utils/deleteActivityItem'

import type { Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

const postsAttachmentsRouter = createTRPCRouter({
  createPostsAttachment: protectedProcedure
    .input(z.object({
      attachment: z.object({
        fileExtension: z.string(),
        fileKey: z.string(),
        filename: z.string(),
        height: z.number().optional(),
        id: z.string(),
        originalFilename: z.string(),
        width: z.number().optional(),
      }),
      postId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { sort } = (await ctx.prisma.postsAttachment.findFirst({
        where: { postId: input.postId },
        orderBy: {
          sort: 'desc',
        },
      })) || {}

      const result = await ctx.prisma.$transaction([
        ctx.prisma.postsAttachment.create({
          data: {
            post: {
              connect: {
                id: input.postId,
              },
            },
            attachment: {
              create: {
                title: input.attachment.originalFilename,
                userId: ctx.session?.user?.id || '',
                ...input.attachment,
              },
            },
            sort: sort ? sort + 1 : 1,
            user: {
              connect: {
                id: ctx.session?.user?.id || '',
              },
            },
          },
        }),
        ctx.prisma.post.update({
          where: {
            id: input.postId,
          },
          data: {
            updatedAt: new Date(),
          },
        }),
      ])

      return result
    }),

  getPostsAttachments: publicProcedure
    .input(z.object({
      ids: z.array(z.string()).optional(),
      include: z.object({
        attachment: z.boolean().optional(),
        post: z.boolean().optional(),
      }).optional(),
      postId: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.PostsAttachmentWhereInput = {
        postId: input.postId,
      }

      if (input.ids) {
        filters.id = {
          in: input.ids,
        }
      }

      return ctx.prisma.postsAttachment.findMany({
        where: filters,
        include: input.include,
        orderBy: {
          sort: 'asc',
        },
      })
    }),
})

export default postsAttachmentsRouter
