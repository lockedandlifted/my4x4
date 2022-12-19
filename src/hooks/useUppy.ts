import { useEffect, useRef } from 'react'
import Uppy from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'

import { trpc } from '@utils/trpc'

interface InitializeOptions {
  callbacks?: {
    uploadSuccess?: (response) => void,
  },
  fileKey?: string,
  maxNumberOfFiles?: number,
  uppyOptions?: {
    id?: string,
    allowedFileTypes: string[],
  },
}

const initializeUppy = (options: InitializeOptions, trpcClient) => {
  const {
    callbacks, fileKey, maxNumberOfFiles, uppyOptions,
  } = options || {}
  const { uploadSuccess } = callbacks || {}
  const { allowedFileTypes, id } = uppyOptions || {}

  const uppy = new Uppy({
    autoProceed: true,
    debug: true,
    id: id || 'uppy',
    restrictions: {
      maxNumberOfFiles: maxNumberOfFiles || 5,
      allowedFileTypes: allowedFileTypes || ['.jpg', 'jpeg'],
    },
    ...uppyOptions,
  })
    .use(AwsS3, {
      // Generate Presigned Upload Url
      getUploadParameters: async (file) => {
        const data = await trpcClient.aws.presignFileUpload.fetch({
          filename: file.name,
          fileType: file.type,
          key: fileKey,
        })

        uppy.setFileMeta(file.id, data)

        return data
      },
    })
    .on('upload-success', (file) => {
      if (uploadSuccess) {
        uploadSuccess(file)
      }
    })

  return uppy
}

function useUppy(options: InitializeOptions, deps = []) {
  const trpcClient = trpc.useContext()

  const uppyRef = useRef<Uppy>()

  useEffect(() => {
    uppyRef.current = initializeUppy(options, trpcClient)

    return () => {
      uppyRef.current ? uppyRef.current.close() : null
    }
  }, [...deps])

  return uppyRef.current
}

export default useUppy
