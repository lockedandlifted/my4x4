import { z } from 'zod'

import { updateUserByIdValidationSchema } from '@validationSchemas/user'

import { createTRPCRouter, publicProcedure } from '../trpc'

const issuer = process.env.KINDE_ISSUER_URL || ''

const getUserByIdIncludes = {
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
}

const usersRouter = createTRPCRouter({
  getUsers: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),

  findOrCreateUserForProviderById: publicProcedure
    .input(z.object({
      providerAccountId: z.string(),
      provider: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const existingUserForProvider = await ctx.prisma.user.findFirst({
        where: {
          accounts: {
            some: {
              provider: input.provider,
              providerAccountId: input.providerAccountId,
            },
          },
        },
        include: getUserByIdIncludes,
      })

      // No Existing User
      if (!existingUserForProvider) {
        try {
          // Get User Info from Kinde
          const kindeProfileResponse = await fetch(
            `${issuer}/oauth2/v2/user_profile`,
            {
              headers: new Headers({
                Authorization: `Bearer ${ctx.token}`,
              }),
            },
          )

          const data = await kindeProfileResponse.json()
          const { email, id, name } = data

          // Match User by Email
          const existingUserForEmail = await ctx.prisma.user.findFirst({
            where: {
              email,
            },
          })

          // If user exists by email, just link the account
          if (existingUserForEmail) {
            return await ctx.prisma.user.update({
              where: {
                id: existingUserForEmail.id,
              },
              data: {
                accounts: {
                  create: {
                    provider: input.provider,
                    providerAccountId: id,
                    type: 'oauth',
                  },
                },
              },
              include: getUserByIdIncludes,
            })
          }

          // No email match, create a new user
          return await ctx.prisma.user.create({
            data: {
              accounts: {
                create: {
                  provider: input.provider,
                  providerAccountId: id,
                  type: 'oauth',
                },
              },
              name,
              email,
              username: `user-${id}`,
            },
            include: getUserByIdIncludes,
          })
        } catch (error) {
          return undefined
        }
      }

      return existingUserForProvider
    }),

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
        countryId: input.countryId,
        email: input.email,
        name: input.name,
        username: input.username,
      },
    })),
})

export default usersRouter
