import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { snakeCase } from '@utils/string'

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

  getTaggedImages: publicProcedure
    .input(z.object({
      projectsPartId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.image.findMany({
      where: {
        imageTags: {
          some: {
            projectPartsImageTags: {
              some: {
                projectPartId: input.projectsPartId,
              },
            },
          },
        },
      },
      include: {
        imageTags: {
          where: {
            projectPartsImageTags: {
              some: {
                projectPartId: input.projectsPartId,
              },
            },
          },
          include: {
            projectPartsImageTags: {
              where: {
                projectPartId: input.projectsPartId,
              },
            },
          },
        },
        projectsImages: true,
      },
    })),

  createProjectsPart: publicProcedure
    .input(createProjectsPartValidationSchema)
    .mutation(({ ctx, input }) => {
      const data: Prisma.ProjectsPartCreateInput = {
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
              id: input.manufacturerPartId || 'new-manufacturer-part',
            },
            create: {
              category: {
                connect: {
                  id: input.categoryId,
                },
              },
              manufacturer: {
                connectOrCreate: {
                  where: {
                    id: input.manufacturerId || 'new-manufacturer',
                  },
                  create: {
                    key: snakeCase(input.manufacturerTitle),
                    manufacturerType: {
                      connect: {
                        key: 'part',
                      },
                    },
                    title: input.manufacturerTitle,
                  },
                },
              },
              partNumber: input.partNumber,
              title: input.title,
            },
          },
        },
      }

      if (input.installedByBusinessTitle) {
        data.installedByBusiness = {
          connectOrCreate: {
            where: {
              id: input.installedByBusinessId || 'new-record',
            },
            create: {
              title: input.installedByBusinessTitle,
            },
          },
        }
      }

      return ctx.prisma.$transaction([
        ctx.prisma.projectsPart.create({
          data,
          include: {
            manufacturerPart: {
              include: {
                category: true,
                manufacturer: true,
              },
            },
          },
        }),
        ctx.prisma.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            updatedAt: new Date(),
          },
        }),
      ])
    }),

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
