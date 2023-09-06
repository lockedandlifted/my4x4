import NextAuth, { type NextAuthOptions } from 'next-auth'
import { deleteCookie, getCookie } from 'cookies-next'
import cuid from 'cuid'

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
          username: `user-${cuid()}`,
          referredByUserId,
        },
      })
    },
  }
}

export const authOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => ({
  // Include user.id on session
  callbacks: {
    async signIn({ account }: any) {
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
    {
      id: 'kinde',
      name: 'Kinde',
      type: 'oauth',
      wellKnown: `${process.env.KINDE_ISSUER_URL}/.well-known/openid-configuration`,
      idToken: true,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
      checks: ['state', 'pkce'],
      options: {
        clientId: process.env.KINDE_CLIENT_ID,
        clientSecret: process.env.KINDE_CLIENT_SECRET,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
    },
  ],
})

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions(req, res))
