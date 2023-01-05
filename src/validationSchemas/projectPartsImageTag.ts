import { z } from 'zod'

export const createProjectPartsImageTagValidationSchema = z.object({
  imageId: z.string(),
  projectsPartId: z.string(),
  x: z.number(),
  y: z.number(),
})
