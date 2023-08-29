import { createTRPCRouter, publicProcedure } from '../trpc'

const attributesRouter = createTRPCRouter({
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
