import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

type ProjectsAttribute = {
  attribute: {
    connect: {
      key: string,
    },
  },
  value?: string,
}

const mapCreateProjectsAttributes = (
  input: {
    projectsAttributes: { key: string, value: string }[],
  },
) => {
  const projectsAttributes: ProjectsAttribute[] = []

  if (!input.projectsAttributes) {
    return projectsAttributes
  }

  input.projectsAttributes.forEach((projectsAttribute) => {
    const { key, value } = projectsAttribute

    if (key && value) {
      projectsAttributes.push({
        attribute: {
          connect: {
            key,
          },
        },
        value,
      })
    }
  })

  return projectsAttributes
}

const projectsRouter = router({
  createProject: publicProcedure
    .input(z.object({
      createdByOwner: z.boolean().optional(),
      manufacturerModelId: z.string(),
      projectsAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      slug: z.string(),
      title: z.string(),
      temporaryUserId: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      const data: Prisma.ProjectCreateArgs['data'] = {
        createdByOwner: input.createdByOwner,
        manufacturerModelId: input.manufacturerModelId,
        slug: input.slug,
        temporaryUserId: input.temporaryUserId,
        title: input.title,
        projectsAttributes: {
          create: mapCreateProjectsAttributes(input),
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

      return ctx.prisma.project.create({
        data,
        include: {
          projectsAttributes: {
            include: {
              attribute: true,
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
      limit: z.number().optional(),
      userId: z.string().uuid().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectWhereInput = {}

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
          NOT: {
            id: project?.id,
          },
        },
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
        projectsAttributes: {
          include: {
            attribute: true,
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
      createdByOwner: z.boolean().optional(),
      description: z.string(),
      manufacturerModelId: z.string(),
      projectsAttributes: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      slug: z.string(),
      title: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.$transaction([
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
          createdByOwner: input.createdByOwner,
          description: input.description,
          manufacturerModelId: input.manufacturerModelId,
          slug: input.slug,
          title: input.title,
          projectsAttributes: {
            create: mapCreateProjectsAttributes(input),
          },
        },
        include: {
          projectsAttributes: {
            include: {
              attribute: true,
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
    ])),
})

export default projectsRouter
