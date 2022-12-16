import { z } from 'zod'
import { HttpRequest } from '@aws-sdk/protocol-http'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { parseUrl } from '@aws-sdk/url-parser'
import { Hash } from '@aws-sdk/hash-node'
import { formatUrl } from '@aws-sdk/util-format-url'
import { v4 as uuidv4 } from 'uuid'

import { router, publicProcedure } from '../trpc'

const generateFileKey = (filename: string, fileType: string) => {
  if (['image/jpeg', 'image/jpg'].includes(fileType)) {
    const uuid = uuidv4()
    const fileExtension = filename.match(/\.(jpg|jpeg)/g)[0]
    const newFileName = `${uuid}${fileExtension}`

    return {
      fileId: uuid,
      fileKey: `images/${newFileName}`,
      filename: newFileName,
    }
  }

  return {}
}

const awsRouter = router({
  presignFileUpload: publicProcedure
    .input(z.object({
      filename: z.string(),
      fileType: z.string(),
    }))
    .query(async ({ input }) => {
      const originalFilename = input.filename

      const { fileId, fileKey, filename } = generateFileKey(
        originalFilename,
        input.fileType,
      )

      if (!fileId) return {}

      const s3ObjectUrl = parseUrl(
        `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
      )

      const presignerOptions = {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || '',
        sha256: Hash.bind(null, 'sha256'),
      }

      const presigner = new S3RequestPresigner(presignerOptions)

      // Create a GET request from S3 url.
      const presignedParams = await presigner.presign(
        new HttpRequest({ ...s3ObjectUrl, method: 'PUT' }),
        { expiresIn: 300 },
      )

      return {
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
