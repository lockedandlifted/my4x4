import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

const manufacturersRouter = createTRPCRouter({
  getManufacturers: publicProcedure
    .input(z.object({
      include: z.object({
        manufacturerParts: z.object({
          include: z.object({
            category: z.boolean().default(false),
            manufacturer: z.boolean().default(false),
          }).optional(),
        }).optional(),
      }).optional(),
      limit: z.number().optional(),
      manufacturerPartCategoryId: z.string().optional(),
      manufacturerTypeKey: z.string().optional(),
      string: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ManufacturerWhereInput = {}

      if (input.manufacturerTypeKey) {
        filters.manufacturerType = {
          key: input.manufacturerTypeKey,
        }
      }

      if (input.manufacturerPartCategoryId) {
        filters.manufacturerParts = {
          some: {
            categoryId: input.manufacturerPartCategoryId,
          },
        }
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
        include: input.include,
      })
    }),

  getManufacturerById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.manufacturer.findUnique({
      where: {
        id: input.id,
      },
    })),

  getManufacturerByKey: publicProcedure
    .input(z.object({
      key: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.manufacturer.findUnique({
      where: {
        key: input.key,
      },
    })),
})

export default manufacturersRouter
