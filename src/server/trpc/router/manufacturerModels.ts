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

  getManufacturerModelById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.manufacturerModel.findUnique({
      where: {
        id: input.id,
      },
    })),

  getManufacturerModelByKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.manufacturerModel.findUnique({
      where: {
        key: input.key,
      },
    })),
})

export default manufacturerModelsRouter
