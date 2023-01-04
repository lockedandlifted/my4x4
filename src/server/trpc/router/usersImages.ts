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
      const { sort } = (await ctx.prisma.usersImage.findFirst({
        where: { userId: input.userId },
        orderBy: {
          sort: 'desc',
        },
      })) || {}

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
          sort: sort ? sort + 1 : 1,
        },
      })
    }),

  getUsersImages: publicProcedure
    .input(z.object({
      include: z.object({
        image: z.boolean().optional(),
      }).optional(),
      userId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.usersImage.findMany({
      where: {
        userId: input.userId,
      },
      include: input.include,
    })),

  deleteUsersImageById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.usersImage.delete({
      where: {
        id: input.id,
      },
    })),
})

export default usersImagesRouter
