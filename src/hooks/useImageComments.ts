import { useState } from 'react'

import { trpc } from '@utils/trpc'

import type { Image } from '@prisma/client'

type UseImageCommentsParams = {
  image: Image,
}

function useImageComments(options: UseImageCommentsParams) {
  const { image } = options

  const [inputValue, setInputValue] = useState('')

  const { imagesComments: { getImagesComments: { invalidate } } } = trpc.useContext()

  const createImagesCommentMutation = trpc.imagesComments.createImagesComment.useMutation({
    onSuccess: () => {
      setInputValue('')
      invalidate({ imageId: image.id })
    },
  })
  const { mutate: createImagesCommentFn, isLoading } = createImagesCommentMutation

  return {
    callbacks: {
      createImagesComment: (params: { body: string }) => createImagesCommentFn({
        commentBody: params.body,
        imageId: image.id,
      }),
      invalidateImageComments: () => invalidate({ imageId: image.id }),
      isLoading,
      setInputValue,
    },
    inputValue,
  }
}

export default useImageComments
