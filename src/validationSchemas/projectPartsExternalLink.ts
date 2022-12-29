import { z } from 'zod'

export const createProjectPartsExternalLinkValidationSchema = z.object({
  url: z.string().url(),
  title: z.string(),
})
