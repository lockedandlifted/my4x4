import { useCallback } from 'react'

import { trpc } from '@utils/trpc'

import useUppy from '@hooks/useUppy'

type UseBusinessImageUploadOptions = {
  businessId: string,
  callbacks: {
    onSuccess: (data: object) => void,
  },
}

function useBusinessImageUpload(options: UseBusinessImageUploadOptions) {
  const { callbacks: { onSuccess }, businessId } = options

  // Create ProjectsImage Mutation
  const createBusinessesImageMutation = trpc.businessesImages.createBusinessesImage.useMutation({
    onSuccess,
  })

  const { mutate } = createBusinessesImageMutation

  const uploadSuccess = useCallback((file) => {
    const params = {
      businessId,
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
  }, [businessId, mutate])

  const uppy = useUppy(
    {
      callbacks: {
        uploadSuccess,
      },
    },
    [businessId],
  )

  return {
    uppy,
  }
}

export default useBusinessImageUpload
