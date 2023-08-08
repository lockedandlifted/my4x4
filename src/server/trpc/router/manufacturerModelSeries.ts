import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure } from '../trpc'

const manufacturerModelSeriesRouter = router({
  getManufacturerModelSeries: publicProcedure
    .input(z.object({
      manufacturerModelId: z.string().optional(),
      string: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ManufacturerModelSeriesWhereInput = {}

      if (input.manufacturerModelId) {
        filters.manufacturerModelId = input.manufacturerModelId
      }

      if (input.string) {
        filters.title = {
          contains: input.string,
          mode: 'insensitive',
        }
      }

      return ctx.prisma.manufacturerModelSeries.findMany({
        where: filters,
        orderBy: {
          title: 'asc',
        },
      })
    }),

  getManufacturerModelSeriesById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.manufacturerModelSeries.findUnique({
      where: {
        id: input.id,
      },
    })),
})

export default manufacturerModelSeriesRouter
