import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const externalLinkViewsRouter = router({
  createExternalLinkView: publicProcedure
    .input(z.object({
      externalLinkId: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.externalLinkView.create({
      data: {
        externalLink: {
          connect: {
            id: input.externalLinkId,
          },
        },
      },
    })),
})

export default externalLinkViewsRouter
