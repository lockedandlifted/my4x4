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
      allowedFileTypes: allowedFileTypes || ['.jpg', '.jpeg', '.png'],
    },
    ...uppyOptions,
  })
    .use(AwsS3, {
      // Generate Presigned Upload Url
      getUploadParameters: async (file) => {
        const { meta, name, type } = file

        const presignData = await trpcClient.aws.presignFileUpload.fetch({
          filename: name,
          fileType: type,
          key: fileKey,
        })

        uppy.setFileMeta(file.id, { ...meta, ...presignData })

        return presignData
      },
    })
    .on('file-added', (file) => {
      const { data, meta } = file
      const url = URL.createObjectURL(data)
      const image = new Image()
      image.src = url

      image.onload = () => {
        const mergedData = {
          ...meta,
          width: image.width,
          height: image.height,
        }

        uppy.setFileMeta(file.id, mergedData)

        URL.revokeObjectURL(url)
      }
    })
    .on('upload-success', (file) => {
      if (uploadSuccess) {
        uploadSuccess(file)
      }
    })

  return uppy
}

function useUppy(options: InitializeOptions, deps: string[] = []) {
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
