import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const manufacturerModelsRouter = router({
  getManufacturerModels: publicProcedure
    .input(z.object({ manufacturerId: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.manufacturerModel.findMany({
      where: {
        manufacturerId: input.manufacturerId,
      },
      orderBy: {
        title: 'asc',
      },
    })),
})

export default manufacturerModelsRouter
