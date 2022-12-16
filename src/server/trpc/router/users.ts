import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const usersRouter = router({
  getUsers: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),

  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.user.findUnique({
      where: {
        username: input.username,
      },
    })),
})

export default usersRouter
