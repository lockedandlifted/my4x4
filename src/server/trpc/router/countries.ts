import { router, publicProcedure } from '../trpc'

const countriesRouter = router({
  getCountries: publicProcedure
    .query(({ ctx }) => ctx.prisma.country.findMany({
      orderBy: {
        title: 'asc',
      },
    })),
})

export default countriesRouter
