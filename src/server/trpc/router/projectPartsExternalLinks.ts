import { z } from 'zod'

import { createProjectPartsExternalLinkValidationSchema } from '@validationSchemas/projectPartsExternalLink'

import { getExternalLinkUrlType } from '@utils/externalLinkType'

import { createTRPCRouter, publicProcedure } from '../trpc'

const projectPartsExternalLinksRouter = createTRPCRouter({
  getProjectPartsExternalLinks: publicProcedure
    .input(z.object({
      include: z.object({
        externalLink: z.object({
          include: z.object({
            externalLinkType: z.boolean().default(false),
          }).optional(),
        }).optional(),
      }).optional(),
      projectsPartId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectPartsExternalLink.findMany({
      where: {
        projectPartId: input.projectsPartId,
      },
      include: input.include,
    })),

  createProjectPartsExternalLink: publicProcedure
    .input(createProjectPartsExternalLinkValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.projectPartsExternalLink.create({
      data: {
        projectPart: {
          connect: {
            id: input.projectsPartId,
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

export default projectPartsExternalLinksRouter
