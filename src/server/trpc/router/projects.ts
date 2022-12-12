import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

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
  }
) => {
  const projectsAttributes: ProjectsAttribute[] = []

  if (!input.projectsAttributes){
    return projectsAttributes
  }

  input.projectsAttributes.forEach((projectsAttribute) => {
    const { key, value } = projectsAttribute

    if (key && value){
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

export const projectsRouter = router({
  createProject: publicProcedure
    .input(z.object({
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
      return ctx.prisma.project.create({
        data: {
          manufacturerModelId: input.manufacturerModelId,
          slug: input.slug,
          temporaryUserId: input.temporaryUserId,
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
        },
      })
    }),

  getProjects: publicProcedure
    .input(z.object({
      userId: z.string().uuid(),
    }))
    .query(({ ctx, input }) => {
      const userConditions = []
      if (input.userId){
        userConditions.push({
          projectUsers: {
            some: {
              userId: input.userId,
            },
          }
        })
      }

      return ctx.prisma.project.findMany({
        where: {
          AND: userConditions,
        },
      })
    }),

  getProjectById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
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
        },
      })
    }),

  getProjectBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
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
        },
      })
    }),

    updateProjectById: publicProcedure
      .input(z.object({
        id: z.string(),
        description: z.string(),
        manufacturerModelId: z.string(),
        projectsAttributes: z.array(z.object({
          key: z.string(),
          value: z.string(),
        })),
        slug: z.string(),
        title: z.string(),
      }))
      .mutation(({ ctx, input }) => {
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
            },
          }),
        ])
      }),
})
