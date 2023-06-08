import { z } from 'zod'

import { router, protectedProcedure } from '../trpc'

const postsCommentsRouter = router({
  createPostsComment: protectedProcedure
    .input(z.object({
      commentBody: z.string(),
      postId: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.postsComment.create({
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
    })),
})

export default postsCommentsRouter
