import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectsRouter = router({
  createProject: publicProcedure
    .input(z.object({
      colour: z.string().nullable(),
      manufacturerId: z.string(),
      manufacturerModelId: z.string(),
      year: z.string().nullable(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.create({
        data: input,
      })
    }),
  getProjects: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      const userConditions = []
      if (input.userId){
        // userConditions.push({
        //   projectUsers
        // })
      }

      return ctx.prisma.project.findMany({
        where: {
          AND: [{
            projectUsers: {
              some: {
                userId: input.userId,
              },
            }
          }],
        },
      })
    }),
  getProjectBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          slug: input.slug,
        },
      })
    }),
})
