import { useCallback } from 'react'

import { trpc } from '@utils/trpc'

import useUppy from '@hooks/useUppy'

type UseProjectImageUploadOptions = {
  callbacks: {
    onSuccess: (data: object) => void,
  },
  projectId: string,
}

function useProjectImageUpload(options: UseProjectImageUploadOptions) {
  const { callbacks: { onSuccess }, projectId } = options

  // Create ProjectsImage Mutation
  const createProjectsImageMutation = trpc.projectsImages.createProjectsImage.useMutation({
    onSuccess,
  })

  const { mutate } = createProjectsImageMutation

  const uploadSuccess = useCallback((file) => {
    const params = {
      projectId,
      image: {
        id: file?.meta?.fileId,
        fileKey: file?.meta?.fileKey,
        filename: file?.meta?.filename,
        originalFilename: file?.meta?.originalFilename,
      },
    }

    mutate(params)

    return params
  }, [projectId, mutate])

  const uppy = useUppy(
    {
      callbacks: {
        uploadSuccess,
      },
    },
    [projectId],
  )

  return {
    uppy,
  }
}

export default useProjectImageUpload
