import { useState } from 'react'

import { trpc } from '@utils/trpc'

import type { Post } from '@prisma/client'

type UsePostCommentsParams = {
  post: Post,
}

function usePostComments(options: UsePostCommentsParams) {
  const { post } = options

  const [inputValue, setInputValue] = useState('')

  const { posts: { getPost: { invalidate } } } = trpc.useContext()

  const createPostsCommentMutation = trpc.postsComments.createPostsComment.useMutation({
    onSuccess: () => {
      invalidate({ id: post.id })
      setInputValue('')
    },
  })
  const { mutate: createPostsCommentFn, isLoading } = createPostsCommentMutation

  return {
    callbacks: {
      createPostsComment: (params: { body: string }) => createPostsCommentFn({
        commentBody: params.body,
        postId: post.id,
      }),
      invalidatePost: () => invalidate({ id: post.id }),
      isLoading,
      setInputValue,
    },
    inputValue,
  }
}

export default usePostComments
