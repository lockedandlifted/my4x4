import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createBusinessValidationSchema } from '@validationSchemas/business'

import { router, publicProcedure } from '../trpc'

const businessesRouter = router({
  createBusiness: publicProcedure
    .input(createBusinessValidationSchema)
    .mutation(({ ctx, input }) => {
      console.log(input)

      return ctx.prisma.business.create({
        data: {
          businessLocations: {
            create: {
              businessLocationsServices: {
                connectOrCreate: [],
              },
              email: input.email,
              phone: input.phone,
            },
          },
          businessesServices: {
            connectOrCreate: [],
          },
          title: input.title,
          website: input.website,
        },
      })
    }),
})

export default businessesRouter
