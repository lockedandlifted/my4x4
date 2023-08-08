import { z } from 'zod'

import inngestClient from '@utils/inngestClient'

import { router, protectedProcedure } from '../trpc'

const projectsCommentsRouter = router({
  createProjectsComment: protectedProcedure
    .input(z.object({
      commentBody: z.string(),
      projectId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create ProjectsComment
      const projectsComment = await ctx.prisma.projectsComment.create({
        data: {
          comment: {
            create: {
              body: input.commentBody,
              user: {
                connect: {
                  id: ctx.session?.user?.id,
                },
              },
            },
          },
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
        include: {
          project: {
            include: {
              projectsUsers: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      })

      // Queue Notification Email
      // Dont send if the project user is the same as the comment user
      const projectOwnerIds = projectsComment?.project?.projectsUsers.map(projectsUser => projectsUser.user.id)

      if (
        !projectOwnerIds.includes(ctx.session?.user?.id)
        && projectsComment?.commentId
        && projectsComment?.projectId
      ) {
        await inngestClient.send({
          name: 'mailers/new-project-comment-email',
          data: {
            commentId: projectsComment?.commentId,
            projectId: projectsComment?.projectId,
          },
        })
      }

      return projectsComment
    }),
})

export default projectsCommentsRouter
