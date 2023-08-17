import { useCallback } from 'react'

import { trpc } from '@utils/trpc'

import useUppy from '@hooks/useUppy'

type UsePostImageUploadOptions = {
  callbacks: {
    onSuccess: (data: object) => void,
  },
  postId: string,
}

function usePostImageUpload(options: UsePostImageUploadOptions) {
  const { callbacks: { onSuccess }, postId } = options

  // Create PostsImage Mutation
  const createPostsImageMutation = trpc.postsImages.createPostsImage.useMutation({
    onSuccess,
  })

  const { mutate } = createPostsImageMutation

  const uploadSuccess = useCallback((file) => {
    const params = {
      postId,
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
  }, [postId, mutate])

  const uppy = useUppy(
    {
      callbacks: {
        uploadSuccess,
      },
      maxNumberOfFiles: 1,
    },
    [postId],
  )

  return {
    uppy,
  }
}

export default usePostImageUpload
