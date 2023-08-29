import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

const businessLocationsRouter = createTRPCRouter({
  getBusinessLocations: publicProcedure
    .input(z.object({
      businessId: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.BusinessLocationWhereInput = {}

      if (input.businessId) {
        filters.businessId = input.businessId
      }

      return ctx.prisma.businessLocation.findMany({
        where: filters,
        include: input.include,
      })
    }),
})

export default businessLocationsRouter
