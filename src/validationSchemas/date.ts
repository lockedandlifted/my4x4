import { z } from 'zod'

export const dateSchema = z.preprocess((arg) => {
  if ((typeof arg === 'string' && arg !== '') || arg instanceof Date) {
    return new Date(arg)
  }

  return undefined
}, z.date().optional())

export type DateSchema = z.infer<typeof dateSchema>
