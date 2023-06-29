import { z } from 'zod'

import createActivityItem from '@utils/createActivityItem'
import deleteActivityItem from '@utils/deleteActivityItem'

import type { Prisma } from '@prisma/client'

import { router, publicProcedure, protectedProcedure } from '../trpc'

const projectsImagesRouter = router({
  createProjectsImage: protectedProcedure
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

      const result = await ctx.prisma.$transaction([
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
                userId: ctx.session?.user?.id || '',
                ...input.image,
              },
            },
            sort: sort ? sort + 1 : 1,
            user: {
              connect: {
                id: ctx.session?.user?.id || '',
              },
            },
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

      const [projectsImage, project] = result

      // Create Activity
      if (project.published) {
        await createActivityItem({
          eventType: 'projects_images.created',
          ownerId: ctx.session?.user?.id || '',
          ownerType: 'User',
          parentSubjectId: project.id,
          parentSubjectType: 'Project',
          subjectId: projectsImage.id,
          subjectType: 'ProjectsImage',
        })
      }

      return result
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
        image: {
          include: {
            user: {
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
            },
          },
        },
        project: true,
      },
    })),

  getProjectsImages: publicProcedure
    .input(z.object({
      ids: z.array(z.string()).optional(),
      include: z.object({
        image: z.boolean().optional(),
        project: z.boolean().optional(),
      }).optional(),
      projectId: z.string(),
    }))
    .query(({ ctx, input }) => {
      const filters: Prisma.ProjectsImageWhereInput = {
        projectId: input.projectId,
      }

      if (input.ids) {
        filters.id = {
          in: input.ids,
        }
      }

      return ctx.prisma.projectsImage.findMany({
        where: filters,
        include: input.include,
        orderBy: {
          sort: 'asc',
        },
      })
    }),

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
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.projectsImage.delete({
        where: {
          id: input.id,
        },
      })

      // Delete Activity
      await deleteActivityItem({
        subjectId: input.id,
        subjectType: 'ProjectsImage',
      })

      return result
    }),
})

export default projectsImagesRouter
