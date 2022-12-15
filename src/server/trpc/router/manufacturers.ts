import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const manufacturersRouter = router({
  getManufacturers: publicProcedure
    .input(z.object({ manufacturerType: z.string().nullable() }))
    .query(({ ctx, input }) => {

      return ctx.prisma.manufacturer.findMany({
        where: {
          manufacturerType: {
            key: input?.manufacturerType || undefined,
          },
        },
        orderBy: {
          title: 'asc',
        },
      })
    }),
})
