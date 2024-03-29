import { getServerSession } from 'next-auth'

import { type GetServerSidePropsContext } from 'next'

import { authOptions } from '../pages/api/auth/[...nextauth]'

/**
 * Wrapper for getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
}) => getServerSession(ctx.req, ctx.res, authOptions(ctx.req, ctx.res))

export default getServerAuthSession
