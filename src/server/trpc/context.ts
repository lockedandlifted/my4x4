import { JwtRsaVerifier } from 'aws-jwt-verify'

import type { inferAsyncReturnType } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'

import type { User } from '@prisma/client'

import { prisma } from '../db/client'

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type ContextUser = User & {
  kindeId?: string,
}

type CreateContextOptions = {
  token?: string,
  user: ContextUser | null,
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 */
export const createInnerTRPCContext = async (options: CreateContextOptions) => ({
  prisma,
  token: options.token,
  user: options.user,
})

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (options: CreateNextContextOptions) => {
  const {
    req: {
      headers: {
        authorization: authHeader,
      },
    },
  } = options

  const issuer = process.env.KINDE_ISSUER_URL || ''

  try {
    const verifier = JwtRsaVerifier.create({
      audience: null,
      issuer,
      jwksUri: `${issuer}/.well-known/jwks.json`,
    })

    const token = authHeader && authHeader.split(' ')[1]
    const payload = await verifier.verify(token)

    const kindeUserId = payload.sub as string

    const user = await prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            provider: 'kinde',
            providerAccountId: kindeUserId,
          },
        },
      },
    })

    return await createInnerTRPCContext({
      token,
      user,
    })
  } catch (error) {
    return createInnerTRPCContext({
      user: null,
    })
  }
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>
