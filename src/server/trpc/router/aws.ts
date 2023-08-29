import { z } from 'zod'
import { HttpRequest } from '@aws-sdk/protocol-http'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { parseUrl } from '@aws-sdk/url-parser'
import { Hash } from '@aws-sdk/hash-node'
import { formatUrl } from '@aws-sdk/util-format-url'
import { v4 as uuidv4 } from 'uuid'

import { supportedMimeTypes } from '@utils/asset'

import { router, publicProcedure } from '../trpc'

type GenerateFileKeyParams = {
  fileKeyPrefix?: string,
  filename: string,
  fileType: string,
}

const generateFileKey = (params: GenerateFileKeyParams) => {
  const {
    fileKeyPrefix = 'images',
    filename,
    fileType,
  } = params

  if (supportedMimeTypes.includes(fileType)) {
    const uuid = uuidv4()
    const fileExtension = filename.toLowerCase().match(/\.(heic|jpg|jpeg|pdf|png|webp)/g)?.[0] || '.jpg'
    const newFileName = `${uuid}${fileExtension}`

    return {
      fileExtension: fileExtension.replace('.', ''),
      fileId: uuid,
      fileKey: `${fileKeyPrefix}/${newFileName}`,
      filename: newFileName,
    }
  }

  return {}
}

const awsRouter = router({
  presignFileUpload: publicProcedure
    .input(z.object({
      fileKeyPrefix: z.string().optional(),
      filename: z.string(),
      fileType: z.string(),
    }))
    .query(async ({ input }) => {
      const originalFilename = input.filename

      const {
        fileExtension, fileId, fileKey, filename,
      } = generateFileKey({
        fileKeyPrefix: input.fileKeyPrefix || 'images',
        fileType: input.fileType,
        filename: originalFilename,
      })

      if (!fileId) return {}

      const s3ObjectUrl = parseUrl(
        `https://${process.env.PROJECT_AWS_S3_BUCKET}.s3.${process.env.PROJECT_AWS_REGION}.amazonaws.com/${fileKey}`,
      )

      const presignerOptions = {
        credentials: {
          accessKeyId: process.env.PROJECT_AWS_ACCESS_KEY || '',
          secretAccessKey: process.env.PROJECT_AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.PROJECT_AWS_REGION || '',
        sha256: Hash.bind(null, 'sha256'),
      }

      const presigner = new S3RequestPresigner(presignerOptions)

      // Create a GET request from S3 url.
      const presignedParams = await presigner.presign(
        new HttpRequest({ ...s3ObjectUrl, method: 'PUT' }),
        { expiresIn: 300 },
      )

      return {
        fileExtension,
        fileId,
        fileKey,
        filename,
        originalFilename,
        method: presignedParams.method,
        url: formatUrl(presignedParams),
      }
    }),
})

export default awsRouter
