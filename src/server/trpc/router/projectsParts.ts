import { z } from 'zod'

import { createProjectsPartValidationSchema, getSimilarProjectsValidationSchema } from '@validationSchemas/projectsPart'

import { router, publicProcedure } from '../trpc'

const projectsPartsRouter = router({
  getProjectsParts: publicProcedure
    .input(z.object({
      include: z.object({
        manufacturerPart: z.object({
          include: z.object({
            category: z.boolean().default(false),
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
            category: true,
            manufacturer: true,
          },
        },
      },
    })),

  getSimilarProjectsWithPartId: publicProcedure
    .input(getSimilarProjectsValidationSchema)
    .query(async ({ ctx, input }) => {
      const projectsPart = (await ctx.prisma.projectsPart.findFirst({
        where: { id: input.projectsPartId },
      }))

      return ctx.prisma.projectsPart.findMany({
        where: {
          manufacturerPartId: projectsPart?.manufacturerPartId,
          NOT: {
            id: projectsPart?.id,
          },
        },
        include: {
          project: {
            include: {
              projectsImages: {
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
          updatedAt: 'desc',
        },
        take: input.limit || 3,
      })
    }),

  createProjectsPart: publicProcedure
    .input(createProjectsPartValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.projectsPart.create({
      data: {
        description: input.description,
        installedAt: input.installedAt,
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
            category: true,
            manufacturer: true,
          },
        },
      },
    })),
})

export default projectsPartsRouter
