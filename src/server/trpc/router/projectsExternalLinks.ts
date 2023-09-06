import { z } from 'zod'

import { createProjectsExternalLinkValidationSchema } from '@validationSchemas/projectsExternalLink'

import { getExternalLinkUrlType } from '@utils/externalLinkType'

import { createTRPCRouter, publicProcedure } from '../trpc'

const projectsExternalLinksRouter = createTRPCRouter({
  getProjectsExternalLinks: publicProcedure
    .input(z.object({
      include: z.object({
        externalLink: z.object({
          include: z.object({
            externalLinkType: z.boolean().default(false),
          }).optional(),
        }).optional(),
      }).optional(),
      projectId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsExternalLink.findMany({
      where: {
        projectId: input.projectId,
      },
      include: input.include,
    })),

  createProjectsExternalLink: publicProcedure
    .input(createProjectsExternalLinkValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.projectsExternalLink.create({
      data: {
        project: {
          connect: {
            id: input.projectId,
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

export default projectsExternalLinksRouter
