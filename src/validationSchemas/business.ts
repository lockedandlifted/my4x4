import { z } from 'zod'

export const createBusinessValidationSchema = z.object({
  address: z.object({
    countryId: z.string(),
    stateName: z.string(),
    streetName: z.string(),
    streetNumber: z.string(),
    suburbName: z.string(),
    unitNumber: z.string().optional(),
  }),
  location: z.object({
    email: z.string().email(),
    phone: z.string(),
    title: z.string(),
  }),
  serviceKeys: z.array(z.string()),
  title: z.string(),
  website: z.string(),
})
