import { z } from 'zod'
import { dateSchema } from './date'

export const createProjectsPartValidationSchema = z.object({
  description: z.string().optional(),
  installedAt: z.optional(dateSchema),
  manufacturerId: z.string(),
  manufacturerPartId: z.string().optional(),
  partNumber: z.string(),
  projectId: z.string(),
  title: z.string(),
})

export const getSimilarProjectsValidationSchema = z.object({
  limit: z.number().optional(),
  projectsPartId: z.string(),
})
