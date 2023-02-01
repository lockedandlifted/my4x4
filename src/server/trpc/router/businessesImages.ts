import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const businessesImagesRouter = router({
  createBusinessesImage: publicProcedure
    .input(z.object({
      businessId: z.string(),
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
          businessesImages: {
            some: {
              businessId: input.businessId,
            },
          },
        },
      })

      return ctx.prisma.businessesImage.create({
        data: {
          business: {
            connect: {
              id: input.businessId,
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

export default businessesImagesRouter
