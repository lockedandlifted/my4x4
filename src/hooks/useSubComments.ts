import { useState } from 'react'

import type { Comment } from '@prisma/client'

import { trpc } from '@utils/trpc'

type UseSubCommentsOptions = {
  callbacks: {
    invalidate: VoidFunction,
  },
  parentComment: Comment,
}

function useSubComments(options: UseSubCommentsOptions) {
  const {
    callbacks: {
      invalidate,
    },
    parentComment,
  } = options

  const [inputValue, setInputValue] = useState('')
  const [showAddComment, setShowAddComment] = useState(false)

  const createCommentMutation = trpc.comments.createComment.useMutation({
    onSuccess: () => {
      invalidate()
      setInputValue('')
    },
  })
  const { mutate: createCommentFn, isLoading } = createCommentMutation

  const subComments = parentComment?.subComments
  const hasSubComments = subComments?.length > 0

  return {
    callbacks: {
      createComment: (params: { body: string }) => createCommentFn({
        body: params.body,
        parentCommentId: parentComment.id,
      }),
      setInputValue,
      setShowAddComment,
    },
    hasSubComments,
    inputValue,
    isLoading,
    showAddComment,
    subComments,
  }
}

export default useSubComments
