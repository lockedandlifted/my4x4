import NextAuth, { type NextAuthOptions } from 'next-auth'
import { deleteCookie, getCookie } from 'cookies-next'

import Auth0Provider from 'next-auth/providers/auth0'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import FacebookProvider from 'next-auth/providers/facebook'
import InstagramProvider from 'next-auth/providers/instagram'

import { type NextApiRequest, type NextApiResponse } from 'next'

import { env } from '../../../env/server.mjs'
import { prisma } from '../../../server/db/client'

function CustomPrismaAdapter(p: typeof prisma, req: NextApiRequest, res: NextApiResponse) {
  return {
    ...PrismaAdapter(p),
    createUser: (data) => {
      const cookieKey = 'my4x4-referrered-by-user-id'
      const referredByUserId = getCookie(cookieKey, { req, res })
      deleteCookie(cookieKey, { req, res })

      return p.user.create({
        data: {
          ...data,
          referredByUserId,
        },
      })
    },
  }
}

export const authOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => ({
  // Include user.id on session
  callbacks: {
    async signIn({ account, user }: any) {
      const { id } = user

      const existingUser = await prisma.user.findFirst({
        where: {
          id,
        },
      })

      if (existingUser && !existingUser.username) {
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            username: `user-${id}`,
          },
        })
      }

      delete account.user_id
      return true
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  adapter: CustomPrismaAdapter(prisma, req, res),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: env.INSTAGRAM_CLIENT_ID,
      clientSecret: env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
})

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions(req, res))
