import { useState } from 'react'

import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

type UseProjectCommentsParams = {
  project: Project,
}

function useProjectComments(options: UseProjectCommentsParams) {
  const { project } = options

  const [inputValue, setInputValue] = useState('')

  const { comments: { getComments: { invalidate } } } = trpc.useContext()

  const createProjectsCommentMutation = trpc.projectsComments.createProjectsComment.useMutation({
    onSuccess: () => {
      invalidate({ projectId: project.id })
      setInputValue('')
    },
  })
  const { mutate: createProjectsCommentFn, isLoading } = createProjectsCommentMutation

  return {
    callbacks: {
      createProjectsComment: (params: { body: string }) => createProjectsCommentFn({
        commentBody: params.body,
        projectId: project.id,
      }),
      invalidateProjectsComment: () => invalidate({ projectId: project.id }),
      setInputValue,
    },
    inputValue,
    isLoading,
  }
}

export default useProjectComments
