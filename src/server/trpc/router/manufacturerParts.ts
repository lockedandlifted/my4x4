import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { getProjectsWithPartValidationSchema } from '@validationSchemas/manufacturerPart'

import { router, publicProcedure } from '../trpc'

const manufacturerPartsRouter = router({
  getManufacturerParts: publicProcedure
    .input(z.object({
      manufacturerId: z.string().optional(),
      manufacturerTitle: z.string().optional(),
      string: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ManufacturerPartWhereInput = {}

      if (input.manufacturerId) {
        filters.manufacturerId = input.manufacturerId
      }

      if (!input.manufacturerId && input.manufacturerTitle) {
        filters.manufacturer = {
          title: {
            contains: input.manufacturerTitle,
            mode: 'insensitive',
          },
        }
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

  getProjectsWithPartId: publicProcedure
    .input(getProjectsWithPartValidationSchema)
    .query(async ({ ctx, input }) => ctx.prisma.manufacturerPart.findFirst({
      where: {
        id: input.manufacturerPartId,
      },
      include: {
        projectsParts: {
          include: {
            project: {
              include: {
                projectsImages: {
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
      orderBy: {
        updatedAt: 'desc',
      },
      take: input.limit || 3,
    })),
})

export default manufacturerPartsRouter
