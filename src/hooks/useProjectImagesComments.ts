import { useState } from 'react'

import { trpc } from '@utils/trpc'

import type { ProjectsImage } from '@prisma/client'

type UseProjectImagesCommentsParams = {
  projectsImage: ProjectsImage,
}

function useProjectImagesComments(options: UseProjectImagesCommentsParams) {
  const { projectsImage } = options

  const [inputValue, setInputValue] = useState('')

  const { projectImagesComments: { getProjectImagesComments: { invalidate } } } = trpc.useContext()

  const createProjectImagesCommentMutation = trpc.projectImagesComments.createProjectImagesComment.useMutation({
    onSuccess: () => {
      setInputValue('')
      invalidate({ projectsImageId: projectsImage.id })
    },
  })
  const { mutate: createProjectImagesCommentFn, isLoading } = createProjectImagesCommentMutation

  return {
    callbacks: {
      createProjectImagesComment: (params: { body: string }) => createProjectImagesCommentFn({
        commentBody: params.body,
        projectsImageId: projectsImage.id,
      }),
      invalidateProjectImageComments: () => invalidate({ projectsImageId: projectsImage.id }),
      isLoading,
      setInputValue,
    },
    inputValue,
  }
}

export default useProjectImagesComments
