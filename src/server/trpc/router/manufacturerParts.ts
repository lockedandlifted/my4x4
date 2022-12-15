import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

type GetManufacturerPartsFilters = {
  manufacturerId?: string,
  title?: {
    contains: string,
    mode: string,
  },
}

export const manufacturerPartsRouter = router({
  getManufacturerParts: publicProcedure
    .input(z.object({
      manufacturerId: z.string().nullable(),
      string: z.string().nullable(),
    }))
    .query(({ ctx, input }) => {
      const filters: GetManufacturerPartsFilters = {}

      if (input.manufacturerId){
        filters.manufacturerId = input.manufacturerId
      }

      if (input.string){
        filters.title = {
          contains: input.string,
          mode: 'insensitive',
        }
      }

      return ctx.prisma.manufacturerPart.findMany({
        where: filters,
        orderBy: {
          title: 'asc',
        },
      })
    }),
})
