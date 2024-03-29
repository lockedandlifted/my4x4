// @ts-check
import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_ISSUER: z.string(),
  DATABASE_URL: z.string().url(),
  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  INSTAGRAM_CLIENT_ID: z.string(),
  INSTAGRAM_CLIENT_SECRET: z.string(),
  KINDE_CLIENT_ID: z.string(),
  KINDE_ISSUER_URL: z.string().url(),
  KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
  KINDE_SITE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === 'production'
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    str => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url(),
  ),
  PROJECT_AWS_ACCESS_KEY: z.string(),
  PROJECT_AWS_REGION: z.string(),
  PROJECT_AWS_S3_BUCKET: z.string(),
  PROJECT_AWS_SECRET_ACCESS_KEY: z.string(),
})

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL: z.string().url(),
  NEXT_PUBLIC_VERCEL_URL: z.string().url(),
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
}
