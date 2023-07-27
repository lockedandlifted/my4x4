import { z } from 'zod'

export const updateUserByIdValidationSchema = z.object({
  bio: z.string().optional(),
  countryId: z.string().optional(),
  email: z.string(),
  id: z.string(),
  name: z.string(),
  username: z.string(),
})
