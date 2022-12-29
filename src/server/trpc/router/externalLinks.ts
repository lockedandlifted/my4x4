import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const externalLinksRouter = router({
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
