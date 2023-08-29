import { z } from 'zod'

import inngestClient from '@utils/inngestClient'

import { createTRPCRouter, protectedProcedure } from '../trpc'

const postsCommentsRouter = createTRPCRouter({
  createPostsComment: protectedProcedure
    .input(z.object({
      commentBody: z.string(),
      postId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create PostsComment
      const postsComment = await ctx.prisma.postsComment.create({
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
          post: {
            connect: {
              id: input.postId,
            },
          },
        },
        include: {
          post: true,
        },
      })

      // Queue Notification Email
      // Dont send if the post user is the same as the comment user
      const postOwnerId = postsComment?.post?.userId

      if (postOwnerId !== ctx.session?.user?.id && postsComment?.commentId && postsComment?.postId) {
        await inngestClient.send({
          name: 'mailers/new-post-comment-email',
          data: {
            commentId: postsComment?.commentId,
            postId: postsComment?.postId,
          },
        })
      }

      return postsComment
    }),
})

export default postsCommentsRouter
