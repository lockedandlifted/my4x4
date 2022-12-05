import { router, publicProcedure } from "../trpc";

export const manufacturersRouter = router({
  getManufacturers: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.manufacturer.findMany({
        orderBy: {
          title: 'asc',
        },
      })
    }),
})
