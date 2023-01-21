import { router, publicProcedure } from '../trpc'

const attributesRouter = router({
  getAttributes: publicProcedure
    .query(({ ctx }) => ctx.prisma.attribute.findMany({
      include: {
        attributeValues: {
          orderBy: {
            title: 'asc',
          },
        },
      },
      orderBy: {
        sort: 'asc',
      },
    })),
})

export default attributesRouter
