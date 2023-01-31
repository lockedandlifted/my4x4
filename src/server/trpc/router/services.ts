import { router, publicProcedure } from '../trpc'

const servicesRouter = router({
  getServices: publicProcedure
    .query(({ ctx }) => ctx.prisma.service.findMany({
      orderBy: {
        title: 'asc',
      },
    })),
})

export default servicesRouter
