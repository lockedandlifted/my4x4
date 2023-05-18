import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

const projectsImagesRouter = router({
  createProjectsImage: publicProcedure
    .input(z.object({
      projectId: z.string(),
      image: z.object({
        fileKey: z.string(),
        filename: z.string(),
        height: z.number(),
        id: z.string(),
        originalFilename: z.string(),
        width: z.number(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const { sort } = (await ctx.prisma.projectsImage.findFirst({
        where: { projectId: input.projectId },
        orderBy: {
          sort: 'desc',
        },
      })) || {}

      return ctx.prisma.$transaction([
        ctx.prisma.projectsImage.create({
          data: {
            project: {
              connect: {
                id: input.projectId,
              },
            },
            image: {
              create: {
                title: input.image.originalFilename,
                ...input.image,
              },
            },
            sort: sort ? sort + 1 : 1,
          },
        }),
        ctx.prisma.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            updatedAt: new Date(),
          },
        }),
      ])
    }),

  getProjectsImageById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsImage.findFirst({
      where: {
        id: input.id,
      },
      include: {
        image: true,
      },
    })),

  getProjectsImages: publicProcedure
    .input(z.object({
      include: z.object({
        image: z.boolean().optional(),
      }).optional(),
      projectId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsImage.findMany({
      where: {
        projectId: input.projectId,
      },
      include: input.include,
      orderBy: {
        sort: 'asc',
      },
    })),

  getProjectsImagesCount: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.projectsImage.count({
      where: {
        project: {
          slug: input.slug,
        },
      },
    })),

  setImageAsDefault: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const projectsImage = await ctx.prisma.projectsImage.findFirst({
        where: { id: input.id },
      })

      const projectsImages = await ctx.prisma.projectsImage.findMany({
        where: { projectId: projectsImage?.projectId },
        orderBy: {
          sort: 'asc',
        },
        select: {
          id: true,
        },
      })

      const currentIndex = projectsImages.findIndex(p => p.id === projectsImage?.id)
      projectsImages.splice(currentIndex, 1)
      projectsImages.splice(0, 0, { id: projectsImage?.id })

      const queries = projectsImages.map((p, index) => ctx.prisma.projectsImage.update({
        where: {
          id: p.id,
        },
        data: {
          sort: index,
        },
      }))

      return ctx.prisma.$transaction(queries)
    }),

  deleteProjectsImageById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.projectsImage.delete({
      where: {
        id: input.id,
      },
    })),
})

export default projectsImagesRouter
