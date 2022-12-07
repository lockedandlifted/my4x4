import { z } from "zod";

import { router, publicProcedure } from "../trpc";

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
    }))
    .mutation(({ ctx, input }) => {
      let projectsAttributes = undefined
      if (input.projectsAttributes){
        projectsAttributes = input.projectsAttributes.map((projectsAttribute) => {
          const { key, value } = projectsAttribute

          return {
            attribute: {
              connect: {
                key,
              },
            },
            value,
          }
        })
      }

      return ctx.prisma.project.create({
        data: {
          manufacturerModelId: input.manufacturerModelId,
          slug: input.slug,
          title: input.title,
          projectsAttributes: {
            create: projectsAttributes,
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
  getProjectBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          slug: input.slug,
        },
      })
    }),
})
