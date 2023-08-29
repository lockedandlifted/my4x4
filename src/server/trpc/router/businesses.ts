import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createBusinessValidationSchema } from '@validationSchemas/business'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

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

const businessesRouter = createTRPCRouter({
  createBusiness: protectedProcedure
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
        businessesUsers: {
          create: {
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
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
        businessesImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
        businessLocations: {
          include: {
            businessLocationsAddresses: true,
            businessLocationsServices: true,
          },
        },
        businessesServices: {
          include: {
            service: true,
          },
        },
      },
    })),

  getBusinesses: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      userId: z.string().uuid().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.BusinessWhereInput = {}

      if (input.userId) {
        filters.businessesUsers = {
          some: {
            userId: input.userId,
          },
        }
      }

      return ctx.prisma.business.findMany({
        where: filters,
        include: {
          businessesImages: {
            include: {
              image: true,
            },
            orderBy: {
              sort: 'asc',
            },
            take: 1,
          },
          businessesUsers: {
            include: {
              user: {
                include: {
                  usersImages: {
                    include: {
                      image: true,
                    },
                    orderBy: {
                      sort: 'asc',
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
        take: input.limit || undefined,
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),

  deleteBusinessById: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const result = ctx.prisma.business.delete({
        where: {
          id: input.id,
        },
      })

      return result
    }),
})

export default businessesRouter
