import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const imagesRouter = router({
  deleteImageById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.image.delete({
      where: {
        id: input?.id,
      },
    })),
})

export default imagesRouter
