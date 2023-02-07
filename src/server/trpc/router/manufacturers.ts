import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure } from '../trpc'

const manufacturersRouter = router({
  getManufacturers: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      manufacturerTypeKey: z.string().optional(),
      string: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ManufacturerWhereInput = {}

      if (input.manufacturerTypeKey) {
        filters.key = input.manufacturerTypeKey
      }

      if (input.string) {
        filters.title = {
          contains: input.string,
          mode: 'insensitive',
        }
      }

      return ctx.prisma.manufacturer.findMany({
        where: filters,
        orderBy: {
          title: 'asc',
        },
        take: input.limit || undefined,
      })
    }),
})

export default manufacturersRouter
