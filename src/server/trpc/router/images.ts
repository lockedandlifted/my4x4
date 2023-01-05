import { z } from 'zod'

import { updateImageByIdValidationSchema } from '@validationSchemas/image'

import { router, publicProcedure } from '../trpc'

const imagesRouter = router({
  updateImageById: publicProcedure
    .input(updateImageByIdValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.image.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        title: input.title,
      },
    })),

  deleteImageById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.image.delete({
      where: {
        id: input?.id,
      },
    })),
})

export default imagesRouter
