import { z } from 'zod'

import { createUsersExternalLinkValidationSchema } from '@validationSchemas/usersExternalLink'

import { getExternalLinkUrlType } from '@utils/externalLinkType'

import { router, publicProcedure } from '../trpc'

const usersExternalLinksRouter = router({
  getUsersExternalLinks: publicProcedure
    .input(z.object({
      include: z.object({
        externalLink: z.object({
          include: z.object({
            externalLinkType: z.boolean().default(false),
          }).optional(),
        }).optional(),
      }).optional(),
      userId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.usersExternalLink.findMany({
      where: {
        userId: input.userId,
      },
      include: input.include,
    })),

  createUsersExternalLink: publicProcedure
    .input(createUsersExternalLinkValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.usersExternalLink.create({
      data: {
        user: {
          connect: {
            id: input.userId,
          },
        },
        externalLink: {
          create: {
            externalLinkType: {
              connect: {
                key: getExternalLinkUrlType(input.url),
              },
            },
            title: input.title,
            url: input.url,
          },
        },
      },
      include: {
        externalLink: {
          include: {
            externalLinkType: true,
          },
        },
      },
    })),
})

export default usersExternalLinksRouter
