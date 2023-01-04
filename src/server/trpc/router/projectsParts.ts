import { z } from 'zod'

import type { Prisma } from '@prisma/client'

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
      string: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectsPartWhereInput = {}

      if (input.projectId) {
        filters.projectId = input.projectId
      }

      if (input.string) {
        filters.OR = [
          {
            manufacturerPart: {
              title: {
                contains: input.string,
                mode: 'insensitive',
              },
            },
          },
          {
            manufacturerPart: {
              manufacturer: {
                title: {
                  contains: input.string,
                  mode: 'insensitive',
                },
              },
            },
          },
        ]
      }

      return ctx.prisma.projectsPart.findMany({
        where: filters,
        include: input.include,
      })
    }),

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
        take: input.limit || 4,
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
              categoryId: input.categoryId,
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

  deleteProjectsPartById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectsPart.delete({
      where: {
        id: input.id,
      },
    })),
})

export default projectsPartsRouter
