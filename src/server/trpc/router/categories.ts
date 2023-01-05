import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const categoriesRouter = router({
  getCategories: publicProcedure
    .input(z.object({
      categoryType: z.string().nullable(),
    }))
    .query(({ ctx, input }) => ctx.prisma.category.findMany({
      where: {
        categoryType: {
          key: input?.categoryType || undefined,
        },
      },
      orderBy: {
        title: 'asc',
      },
    })),
})

export default categoriesRouter
