import { useCallback } from 'react'

import { trpc } from '@utils/trpc'

import useUppy from '@hooks/useUppy'

type UseUserImageUploadOptions = {
  callbacks: {
    onSuccess: (data: object) => void,
  },
  userId: string,
}

function useUserImageUpload(options: UseUserImageUploadOptions) {
  const { callbacks: { onSuccess }, userId } = options

  // Create ProjectsImage Mutation
  const createProjectsImageMutation = trpc.usersImages.createUsersImage.useMutation({
    onSuccess,
  })

  const { mutate } = createProjectsImageMutation

  const uploadSuccess = useCallback((file) => {
    const params = {
      userId,
      image: {
        fileKey: file?.meta?.fileKey,
        filename: file?.meta?.filename,
        height: file?.meta?.height,
        id: file?.meta?.fileId,
        originalFilename: file?.meta?.originalFilename,
        width: file?.meta?.width,
      },
    }

    mutate(params)

    return params
  }, [userId, mutate])

  const uppy = useUppy(
    {
      callbacks: {
        uploadSuccess,
      },
    },
    [userId],
  )

  return {
    uppy,
  }
}

export default useUserImageUpload
