import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

const manufacturerModelSeriesRouter = createTRPCRouter({
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

  getManufacturerModelSeriesByKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.manufacturerModelSeries.findUnique({
      where: {
        key: input.key,
      },
    })),
})

export default manufacturerModelSeriesRouter
