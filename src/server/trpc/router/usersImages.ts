import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const usersImagesRouter = router({
  createUsersImage: publicProcedure
    .input(z.object({
      userId: z.string(),
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
          usersImages: {
            some: {
              userId: input.userId,
            },
          },
        },
      })

      return ctx.prisma.usersImage.create({
        data: {
          user: {
            connect: {
              id: input.userId,
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

export default usersImagesRouter
