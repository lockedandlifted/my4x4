import { z } from 'zod'

import { updateImageByIdValidationSchema } from '@validationSchemas/image'

import deleteActivityItem from '@utils/deleteActivityItem'

import { createTRPCRouter, publicProcedure } from '../trpc'

const imagesRouter = createTRPCRouter({
  updateImageById: publicProcedure
    .input(updateImageByIdValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.image.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        title: input.title,
      },
    })),

  deleteImageById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Projects Image
      const projectsImages = await ctx.prisma.projectsImage.findMany({
        where: {
          imageId: input.id,
        },
      })

      // Delete Image
      const result = await ctx.prisma.image.delete({
        where: {
          id: input?.id,
        },
      })

      // Delete Activity
      const projectsImagesSubjects = projectsImages.map(projectsImage => ({
        subjectId: projectsImage.id,
        subjectType: 'ProjectsImage',
      }))

      deleteActivityItem({
        subjects: [
          {
            subjectId: input.id,
            subjectType: 'Image',
          },
          ...projectsImagesSubjects,
        ],
      })

      return result
    }),
})

export default imagesRouter
