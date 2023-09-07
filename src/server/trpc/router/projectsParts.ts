import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import createActivityItem from '@utils/createActivityItem'
import { snakeCase } from '@utils/string'

import { createProjectsPartValidationSchema, getSimilarProjectsValidationSchema } from '@validationSchemas/projectsPart'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

const projectsPartsRouter = createTRPCRouter({
  getProjectsParts: publicProcedure
    .input(z.object({
      ids: z.array(z.string()).optional(),
      include: z.object({
        manufacturerPart: z.object({
          include: z.object({
            category: z.boolean().default(false),
            manufacturer: z.boolean().default(false),
          }).optional(),
        }).optional(),
        project: z.boolean().optional(),
        status: z.boolean().optional(),
      }).optional(),
      projectId: z.string(),
      string: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectsPartWhereInput = {}

      if (input.ids) {
        filters.id = {
          in: input.ids,
        }
      }

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

  getProjectsPartsCount: publicProcedure
    .input(z.object({
      projectId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsPart.count({
      where: {
        projectId: input.projectId,
      },
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
        project: true,
        status: true,
        user: {
          include: {
            usersImages: {
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

  createProjectsPart: protectedProcedure
    .input(createProjectsPartValidationSchema)
    .mutation(async ({ ctx, input }) => {
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
        user: {
          connect: {
            id: ctx.user?.id || 'unauthenticated',
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

      const result = await ctx.prisma.$transaction([
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

      const [projectsPart, project] = result

      // Create Activity - if project published
      if (project.published) {
        await createActivityItem({
          eventType: 'projects_manufacturer_parts.created',
          ownerId: ctx.user?.id || '',
          ownerType: 'User',
          parentSubjectId: project.id,
          parentSubjectType: 'Project',
          subjectId: projectsPart.id,
          subjectType: 'ProjectsPart',
        })
      }

      return result
    }),

  deleteProjectsPartById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.projectsPart.delete({
        where: {
          id: input.id,
        },
      })

      // Delete Activity
      await ctx.prisma.activityItem.deleteMany({
        where: {
          subjectId: input.id,
          subjectType: 'ProjectsPart',
        },
      })

      return result
    }),

  updateProjectsPartById: protectedProcedure
    .input(z.object({
      id: z.string(),
      statusKey: z.string().optional(),
    }))
    .mutation(({ ctx, input }) => {
      const data: Prisma.ProjectsPartUpdateInput = {}

      if (input.statusKey) {
        data.status = {
          connect: {
            key: input.statusKey,
          },
        }
      }

      return ctx.prisma.projectsPart.update({
        where: {
          id: input.id,
        },
        data,
      })
    }),
})

export default projectsPartsRouter
