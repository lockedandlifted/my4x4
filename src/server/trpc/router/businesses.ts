import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createBusinessValidationSchema } from '@validationSchemas/business'

import { router, publicProcedure } from '../trpc'

const mapBusinessServices = (
  input: {
    serviceKeys: string[],
  },
) => {
  const businessLocationsServices: Prisma.BusinessesServiceCreateWithoutBusinessInput[] = []

  if (!input.serviceKeys) {
    return businessLocationsServices
  }

  input.serviceKeys.forEach((key) => {
    const data: Prisma.BusinessesServiceCreateWithoutBusinessInput = {
      service: {
        connect: {
          key,
        },
      },
    }

    businessLocationsServices.push(data)
  })

  return businessLocationsServices
}

const businessesRouter = router({
  createBusiness: publicProcedure
    .input(createBusinessValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.business.create({
      data: {
        businessLocations: {
          create: {
            businessLocationsAddresses: {
              create: {
                address: {
                  create: input.address,
                },
              },
            },
            businessLocationsServices: {
              create: mapBusinessServices(input),
            },
            ...input.location,
          },
        },
        businessesServices: {
          create: mapBusinessServices(input),
        },
        title: input.title,
        website: input.website,
      },
    })),

  getBusinessById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.business.findFirst({
      where: {
        id: input.id,
      },
      include: {
        businessLocations: {
          include: {
            businessLocationsAddresses: true,
            businessLocationsServices: true,
          },
        },
        businessesServices: true,
      },
    })),

})

export default businessesRouter
