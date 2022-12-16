import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const manufacturerModelsRouter = router({
  getManufacturerModels: publicProcedure
    .input(z.object({ manufacturerId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.manufacturerModel.findMany({
        where: {
          manufacturerId: input.manufacturerId,
        },
        orderBy: {
          title: 'asc',
        },
      })
    }),
})
