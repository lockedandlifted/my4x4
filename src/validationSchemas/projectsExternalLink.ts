import { z } from 'zod'

export const createProjectsExternalLinkValidationSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  url: z.string().url(),
})
