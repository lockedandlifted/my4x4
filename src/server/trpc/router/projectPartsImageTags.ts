import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { createProjectPartsImageTagValidationSchema } from '@validationSchemas/projectPartsImageTag'

import { createTRPCRouter, publicProcedure } from '../trpc'

const projectPartsImageTagsRouter = createTRPCRouter({
  getProjectPartsImageTags: publicProcedure
    .input(z.object({
      include: z.object({
        imageTag: z.boolean().optional(),
        projectPart: z.object({
          include: z.object({
            manufacturerPart: z.object({
              include: z.object({
                manufacturer: z.boolean(),
              }),
            }),
          }),
        }).optional(),
      }).optional(),
      imageId: z.string().optional(),
      projectsPartId: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectPartsImageTagWhereInput = {}

      if (input.imageId) {
        filters.imageTag = {
          imageId: input.imageId,
        }
      }

      if (input.projectsPartId) {
        filters.projectPartId = input.projectsPartId
      }

      return ctx.prisma.projectPartsImageTag.findMany({
        where: filters,
        include: input.include,
      })
    }),

  createProjectPartsImageTag: publicProcedure
    .input(createProjectPartsImageTagValidationSchema)
    .mutation(({ ctx, input }) => {
      const data = {
        projectPart: {
          connect: {
            id: input.projectsPartId,
          },
        },
        imageTag: {
          create: {
            image: {
              connect: {
                id: input.imageId,
              },
            },
            x: input.x,
            y: input.y,
          },
        },
      }

      return ctx.prisma.projectPartsImageTag.create({
        data,
        include: {
          imageTag: true,
          projectPart: {
            include: {
              manufacturerPart: {
                include: {
                  manufacturer: true,
                },
              },
            },
          },
        },
      })
    }),

  deleteProjectPartsImageTagById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectPartsImageTag.delete({
      where: {
        id: input.id,
      },
    })),
})

export default projectPartsImageTagsRouter
