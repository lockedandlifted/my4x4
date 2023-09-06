import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const attachmentsRouter = createTRPCRouter({
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
