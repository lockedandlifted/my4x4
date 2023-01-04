import { z } from 'zod'

export const updateUserByIdValidationSchema = z.object({
  email: z.string(),
  id: z.string(),
  name: z.string(),
  username: z.string(),
})
