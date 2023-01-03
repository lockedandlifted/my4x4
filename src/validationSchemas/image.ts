import { z } from 'zod'

export const updateImageByIdValidationSchema = z.object({
  description: z.string(),
  id: z.string(),
  title: z.string(),
})
