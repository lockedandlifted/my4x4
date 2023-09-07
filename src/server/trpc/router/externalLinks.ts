import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const externalLinksRouter = createTRPCRouter({
  getExternalLinkById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.externalLink.findFirst({
      where: {
        id: input.id,
      },
    })),
})

export default externalLinksRouter
