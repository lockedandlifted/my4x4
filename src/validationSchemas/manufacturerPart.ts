import { z } from 'zod'

export const getProjectsWithPartValidationSchema = z.object({
  limit: z.number().optional(),
  manufacturerPartId: z.string(),
})
