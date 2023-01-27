import { z } from 'zod'

export const createBusinessValidationSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  title: z.string(),
  website: z.string(),
})
