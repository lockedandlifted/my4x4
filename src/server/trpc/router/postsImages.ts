import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const postsImagesRouter = createTRPCRouter({
  createPostsImage: publicProcedure
    .input(z.object({
      postId: z.string(),
      image: z.object({
        fileKey: z.string(),
        filename: z.string(),
        height: z.number(),
        id: z.string(),
        originalFilename: z.string(),
        width: z.number(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      // Clear Existing Images - Limit to 1 image at this stage
      await ctx.prisma.image.deleteMany({
        where: {
          postsImages: {
            some: {
              postId: input.postId,
            },
          },
        },
      })

      return ctx.prisma.postsImage.create({
        data: {
          post: {
            connect: {
              id: input.postId,
            },
          },
          image: {
            create: {
              title: input.image.originalFilename,
              ...input.image,
            },
          },
        },
      })
    }),
})

export default postsImagesRouter
