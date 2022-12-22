import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const projectsPartsRouter = router({
  getProjectsParts: publicProcedure
    .input(z.object({
      include: z.object({
        manufacturerPart: z.object({
          include: z.object({
            manufacturer: z.boolean().default(false),
          }).optional(),
        }).optional(),
      }).optional(),
      projectId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsPart.findMany({
      where: {
        projectId: input.projectId,
      },
      include: input.include,
    })),

  getProjectsPartById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsPart.findFirst({
      where: {
        id: input.id,
      },
      include: {
        manufacturerPart: {
          include: {
            manufacturer: true,
          },
        },
      },
    })),

  createProjectsPart: publicProcedure
    .input(z.object({
      manufacturerId: z.string(),
      manufacturerPartId: z.string().nullable(),
      partNumber: z.string(),
      projectId: z.string(),
      title: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectsPart.create({
      data: {
        project: {
          connect: {
            id: input.projectId,
          },
        },
        manufacturerPart: {
          connectOrCreate: {
            where: {
              id: input.manufacturerPartId || 'new-record',
            },
            create: {
              manufacturerId: input.manufacturerId,
              partNumber: input.partNumber,
              title: input.title,
            },
          },
        },
      },
      include: {
        manufacturerPart: {
          include: {
            manufacturer: true,
          },
        },
      },
    })),
})

export default projectsPartsRouter
