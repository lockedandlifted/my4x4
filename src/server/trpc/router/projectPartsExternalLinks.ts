import { z } from 'zod'

import { createProjectsPartValidationSchema, getSimilarProjectsValidationSchema } from '@validationSchemas/projectsPart'

import { router, publicProcedure } from '../trpc'

const projectPartsExternalLinksRouter = router({
  getProjectPartsExternalLinks: publicProcedure
    .input(z.object({
      include: z.object({
        externalLink: z.boolean().default(false),
      }).optional(),
      projectsPartId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectPartsExternalLink.findMany({
      where: {
        projectPartId: input.projectsPartId,
      },
      include: input.include,
    })),

  // createProjectPartsExternalLink: publicProcedure
  //   .input(createProjectsPartValidationSchema)
  //   .mutation(({ ctx, input }) => ctx.prisma.projectsPart.create({
  //     data: {
  //       description: input.description,
  //       installedAt: input.installedAt,
  //       project: {
  //         connect: {
  //           id: input.projectId,
  //         },
  //       },
  //       manufacturerPart: {
  //         connectOrCreate: {
  //           where: {
  //             id: input.manufacturerPartId || 'new-record',
  //           },
  //           create: {
  //             manufacturerId: input.manufacturerId,
  //             partNumber: input.partNumber,
  //             title: input.title,
  //           },
  //         },
  //       },
  //     },
  //     include: {
  //       manufacturerPart: {
  //         include: {
  //           category: true,
  //           manufacturer: true,
  //         },
  //       },
  //     },
  //   })),
})

export default projectPartsExternalLinksRouter
