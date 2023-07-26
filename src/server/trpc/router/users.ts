import { z } from 'zod'

import { updateUserByIdValidationSchema } from '@validationSchemas/user'

import { router, publicProcedure } from '../trpc'

const usersRouter = router({
  getUsers: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),

  getUserById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.user.findFirst({
      where: {
        id: input.id,
      },
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
        role: {
          select: {
            key: true,
          },
        },
      },
    })),

  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => ctx.prisma.user.findUnique({
      where: {
        username: input.username,
      },
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
      },
    })),

  updateUserById: publicProcedure
    .input(updateUserByIdValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        bio: input.bio,
        email: input.email,
        name: input.name,
        username: input.username,
      },
    })),
})

export default usersRouter
