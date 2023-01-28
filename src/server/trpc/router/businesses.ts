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
    .mutation(({ ctx, input }) => {
      const data = {
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
            email: input.email,
            phone: input.phone,
          },
        },
        businessesServices: {
          create: mapBusinessServices(input),
        },
        title: input.title,
        website: input.website,
      }

      console.log(JSON.stringify(data))

      // return ctx.prisma.business.create({
      //   data: data,
      // })
    }),
})

export default businessesRouter
