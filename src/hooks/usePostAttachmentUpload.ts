import { useCallback } from 'react'

import { trpc } from '@utils/trpc'

import useUppy from '@hooks/useUppy'

type UsePostAttachmentUploadOptions = {
  callbacks: {
    onSuccess: (data: object) => void,
  },
  postId: string,
}

function usePostAttachmentUpload(options: UsePostAttachmentUploadOptions) {
  const { callbacks: { onSuccess }, postId } = options

  // Create PostsAttachment Mutation
  const createPostsAttachmentMutation = trpc.postsAttachments.createPostsAttachment.useMutation({
    onSuccess,
  })

  const { mutate } = createPostsAttachmentMutation

  const uploadSuccess = useCallback((file) => {
    const params = {
      attachment: {
        fileExtension: file?.meta?.fileExtension,
        fileKey: file?.meta?.fileKey,
        filename: file?.meta?.filename,
        height: file?.meta?.height,
        id: file?.meta?.fileId,
        originalFilename: file?.meta?.originalFilename,
        width: file?.meta?.width,
      },
      postId,
    }

    mutate(params)

    return params
  }, [postId, mutate])

  const uppy = useUppy(
    {
      callbacks: {
        uploadSuccess,
      },
      fileKeyPrefix: 'attachments',
      uppyOptions: {
        allowedFileTypes: ['.jpg', '.jpeg', '.pdf', '.png'],
      },
    },
    [postId],
  )

  return {
    uppy,
  }
}

export default usePostAttachmentUpload
