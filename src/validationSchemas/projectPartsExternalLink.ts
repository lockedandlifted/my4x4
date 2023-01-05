import { z } from 'zod'

export const createProjectPartsExternalLinkValidationSchema = z.object({
  projectsPartId: z.string(),
  title: z.string(),
  url: z.string().url(),
})
