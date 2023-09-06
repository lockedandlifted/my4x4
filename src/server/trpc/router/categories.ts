import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const categoriesRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(z.object({
      categoryTypeKey: z.string().nullable(),
    }))
    .query(({ ctx, input }) => ctx.prisma.category.findMany({
      where: {
        categoryType: {
          key: input?.categoryTypeKey || undefined,
        },
      },
      orderBy: {
        title: 'asc',
      },
    })),

  getCategoryById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.category.findFirst({
      where: {
        id: input.id,
      },
    })),

  getCategoryByKey: publicProcedure
    .input(z.object({
      key: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.category.findFirst({
      where: {
        key: input.key,
      },
    })),
})

export default categoriesRouter
