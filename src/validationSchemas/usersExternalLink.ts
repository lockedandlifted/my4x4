import { z } from 'zod'

export const createUsersExternalLinkValidationSchema = z.object({
  userId: z.string(),
  title: z.string(),
  url: z.string().url(),
})
