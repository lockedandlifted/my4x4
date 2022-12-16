import { z } from 'zod'

import type { Prisma } from '@prisma/client'
import { router, publicProcedure } from '../trpc'

const manufacturerPartsRouter = router({
  getManufacturerParts: publicProcedure
    .input(z.object({
      manufacturerId: z.string().nullable(),
      string: z.string().nullable(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ManufacturerPartWhereInput = {}

      if (input.manufacturerId) {
        filters.manufacturerId = input.manufacturerId
      }

      if (input.string) {
        filters.title = {
          contains: input.string,
          mode: 'insensitive',
        }
      }

      return ctx.prisma.manufacturerPart.findMany({
        where: filters,
        orderBy: {
          title: 'asc',
        },
      })
    }),
})

export default manufacturerPartsRouter
