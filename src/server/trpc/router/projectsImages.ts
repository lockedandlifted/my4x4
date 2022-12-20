import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const projectsImagesRouter = router({
  createProjectsImage: publicProcedure
    .input(z.object({
      projectId: z.string(),
      image: z.object({
        id: z.string(),
        fileKey: z.string(),
        filename: z.string(),
        originalFilename: z.string(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const { sort } = (await ctx.prisma.projectsImage.findFirst({
        where: { projectId: input.projectId },
        orderBy: {
          sort: 'desc',
        },
      })) || {}

      return ctx.prisma.projectsImage.create({
        data: {
          project: {
            connect: {
              id: input.projectId,
            },
          },
          image: {
            create: input.image,
          },
          sort: sort ? sort + 1 : 1,
        },
      })
    }),

  getProjectsImages: publicProcedure
    .input(z.object({
      include: z.object({
        image: z.boolean().optional(),
      }).optional(),
      projectId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsImage.findMany({
      where: {
        projectId: input.projectId,
      },
      include: input.include,
    })),
})

export default projectsImagesRouter
