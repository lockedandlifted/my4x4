import { createTRPCRouter, publicProcedure } from '../trpc'

const servicesRouter = createTRPCRouter({
  getServices: publicProcedure
    .query(({ ctx }) => ctx.prisma.service.findMany({
      orderBy: {
        title: 'asc',
      },
    })),
})

export default servicesRouter
