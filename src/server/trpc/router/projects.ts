import { z } from 'zod'

import type { AttributeValue, Prisma } from '@prisma/client'

import createActivityItem from '@utils/createActivityItem'
import deleteActivityItem from '@utils/deleteActivityItem'
import { snakeCase } from '@utils/string'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const mapCreateProjectsAttributes = (
  input: {
    projectsAttributes: { key: string, value: string }[],
  },
  attributeValues: AttributeValue[],
) => {
  const projectsAttributes: Prisma.ProjectsAttributeCreateWithoutProjectInput[] = []

  if (!input.projectsAttributes) {
    return projectsAttributes
  }

  input.projectsAttributes.forEach((projectsAttribute) => {
    const { key, value } = projectsAttribute

    if (key && value) {
      const matchedAttributeValue = attributeValues.find(attributeValue => attributeValue.key === value)

      const data: Prisma.ProjectsAttributeCreateWithoutProjectInput = {
        attribute: {
          connect: {
            key,
          },
        },
        value,
      }

      if (matchedAttributeValue) {
        data.attributeValue = {
          connect: {
            key: matchedAttributeValue.key,
          },
        }
      }

      projectsAttributes.push(data)
    }
  })

  return projectsAttributes
}

const projectsRouter = router({
  createProject: publicProcedure
    .input(z.object({
      countryId: z.string(),
      createdByOwner: z.boolean().optional(),
      manufacturerModelId: z.string(),
      manufacturerModelSeriesId: z.string().optional(),
      manufacturerModelSeriesTitle: z.string(),
      projectsAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      slug: z.string(),
      title: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const attributeValues = await ctx.prisma.attributeValue.findMany()

      const data: Prisma.ProjectCreateInput = {
        createdByOwner: input.createdByOwner,
        country: {
          connect: {
            id: input.countryId,
          },
        },
        manufacturerModel: {
          connect: {
            id: input.manufacturerModelId,
          },
        },
        manufacturerModelSeries: {
          connectOrCreate: {
            where: {
              id: input.manufacturerModelSeriesId || 'new-manufacturer-model-series',
            },
            create: {
              key: `${input.manufacturerModelId}_${snakeCase(input.manufacturerModelSeriesTitle)}`,
              manufacturerModel: {
                connect: {
                  id: input.manufacturerModelId,
                },
              },
              title: input.manufacturerModelSeriesTitle,
            },
          },
        },
        slug: input.slug,
        title: input.title,
        projectsAttributes: {
          create: mapCreateProjectsAttributes(input, attributeValues),
        },
      }

      if (ctx.session?.user?.id) {
        data.projectsUsers = {
          create: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        }
      }

      const project = await ctx.prisma.project.create({
        data,
        include: {
          projectsAttributes: {
            include: {
              attribute: true,
              attributeValue: true,
            },
          },
          projectsUsers: {
            include: {
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
          },
        },
      })

      return project
    }),

  claimProjectsByTemporaryUserId: protectedProcedure
    .input(z.object({
      temporaryUserId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.findMany({
        where: {
          temporaryUserId: input.temporaryUserId,
        },
      })

      const updatedProjects = projects.map(async project => ctx.prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          temporaryUserId: null,
          projectsUsers: {
            create: {
              user: {
                connect: {
                  id: ctx.session?.user?.id,
                },
              },
            },
          },
        },
      }))

      return updatedProjects
    }),

  getProjects: publicProcedure
    .input(z.object({
      includeUnpublished: z.boolean().optional(),
      limit: z.number().optional(),
      manufacturerId: z.string().optional(),
      manufacturerModelId: z.string().optional(),
      userId: z.string().uuid().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectWhereInput = {}

      /// Published
      if (!input.includeUnpublished) {
        filters.published = true
      }

      // Manufacturer
      if (input.manufacturerId) {
        filters.manufacturerModel = {
          manufacturerId: input.manufacturerId,
        }
      }

      // Model
      if (input.manufacturerModelId) {
        filters.manufacturerModelId = input.manufacturerModelId
      }

      // User
      if (input.userId) {
        filters.projectsUsers = {
          some: {
            userId: input.userId,
          },
        }
      }

      return ctx.prisma.project.findMany({
        where: filters,
        include: {
          manufacturerModel: {
            include: {
              manufacturer: true,
            },
          },
          projectsImages: {
            include: {
              image: true,
            },
            orderBy: {
              sort: 'asc',
            },
            take: 1,
          },
          projectsUsers: {
            include: {
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
          },
        },
        take: input.limit || undefined,
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),

  getRecentProjects: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
    }))
    .query(({ ctx, input }) => ctx.prisma.project.findMany({
      where: {
        published: true,
      },
      include: {
        manufacturerModel: {
          include: {
            manufacturer: true,
          },
        },
        projectsImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
        projectsUsers: {
          include: {
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
        },
      },
      take: input.limit || undefined,
      orderBy: {
        updatedAt: 'desc',
      },
    })),

  getSimilarProjects: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      projectId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const project = (await ctx.prisma.project.findFirst({
        where: { id: input.projectId },
      }))

      return ctx.prisma.project.findMany({
        where: {
          manufacturerModelId: project?.manufacturerModelId,
          published: true,
          NOT: {
            id: project?.id,
          },
        },
        include: {
          manufacturerModel: {
            include: {
              manufacturer: true,
            },
          },
          projectsImages: {
            include: {
              image: true,
            },
            orderBy: {
              sort: 'asc',
            },
            take: 1,
          },
          projectsUsers: {
            include: {
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
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: input.limit || 3,
      })
    }),

  getProjectById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.project.findUnique({
      where: {
        id: input.id,
      },
      include: {
        manufacturerModel: {
          include: {
            manufacturer: true,
          },
        },
        manufacturerModelSeries: true,
        projectsAttributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
          orderBy: {
            attribute: {
              sort: 'asc',
            },
          },
        },
        projectsImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
        projectsUsers: {
          include: {
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
        },
      },
    })),

  getProjectBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ ctx, input }) => ctx.prisma.project.findUnique({
      where: {
        slug: input.slug,
      },
      include: {
        manufacturerModel: {
          include: {
            manufacturer: true,
          },
        },
        projectsAttributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
          orderBy: {
            attribute: {
              sort: 'asc',
            },
          },
        },
        projectsImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
        projectsUsers: {
          include: {
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
        },
      },
    })),

  updateProjectById: publicProcedure
    .input(z.object({
      id: z.string(),
      countryId: z.string(),
      createdByOwner: z.boolean().optional(),
      description: z.string(),
      manufacturerModelId: z.string(),
      manufacturerModelSeriesId: z.string(),
      manufacturerModelSeriesTitle: z.string(),
      notificationsEnabled: z.boolean().optional(),
      projectsAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      slug: z.string(),
      title: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const attributeValues = await ctx.prisma.attributeValue.findMany()

      return ctx.prisma.$transaction([
        // Delete existing attributes
        ctx.prisma.projectsAttribute.deleteMany({
          where: {
            projectId: input.id,
          },
        }),
        // Update project
        ctx.prisma.project.update({
          where: {
            id: input.id,
          },
          data: {
            country: {
              connect: {
                id: input.countryId,
              },
            },
            createdByOwner: input.createdByOwner,
            description: input.description,
            manufacturerModel: {
              connect: {
                id: input.manufacturerModelId,
              },
            },
            manufacturerModelSeries: {
              connectOrCreate: {
                where: {
                  id: input.manufacturerModelSeriesId || 'new-manufacturer-model-series',
                },
                create: {
                  key: `${input.manufacturerModelId}_${snakeCase(input.manufacturerModelSeriesTitle)}`,
                  manufacturerModel: {
                    connect: {
                      id: input.manufacturerModelId,
                    },
                  },
                  title: input.manufacturerModelSeriesTitle,
                },
              },
            },
            notificationsEnabled: input.notificationsEnabled,
            slug: input.slug,
            title: input.title,
            projectsAttributes: {
              create: mapCreateProjectsAttributes(input, attributeValues),
            },
            updatedAt: new Date(),
          },
          include: {
            projectsAttributes: {
              include: {
                attribute: true,
                attributeValue: true,
              },
            },
            projectsUsers: {
              include: {
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
            },
          },
        }),
      ])
    }),

  publishProjectById: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          published: true,
        },
      })

      // Create Activity
      await createActivityItem({
        eventType: 'projects.published',
        ownerId: ctx.session?.user?.id || '',
        ownerType: 'User',
        subjectId: project.id,
        subjectType: 'Project',
      })

      return project
    }),

  unpublishProjectById: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          published: false,
        },
      })

      // Delete Activity
      await deleteActivityItem({
        subjects: [
          {
            eventType: 'projects.published',
            subjectId: project.id,
            subjectType: 'Project',
          },
        ],
      })

      return project
    }),
})

export default projectsRouter
