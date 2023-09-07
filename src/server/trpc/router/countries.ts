import { createTRPCRouter, publicProcedure } from '../trpc'

const countriesRouter = createTRPCRouter({
  getCountries: publicProcedure
    .query(({ ctx }) => ctx.prisma.country.findMany({
      orderBy: {
        title: 'asc',
      },
    })),
})

export default countriesRouter
