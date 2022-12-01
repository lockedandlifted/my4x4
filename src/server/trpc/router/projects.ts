import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectsRouter = router({
  getProjects: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  getProject: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),
})
