import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const attachmentsRouter = router({
  getAttachmentById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.attachment.findFirst({
      where: {
        id: input.id,
      },
    })),

})

export default attachmentsRouter
