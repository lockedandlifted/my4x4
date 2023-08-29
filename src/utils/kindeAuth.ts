import { JwtRsaVerifier } from 'aws-jwt-verify'

import type { GetServerSidePropsContext } from 'next'

const issuer = process.env.KINDE_ISSUER_URL || ''

export const getServerSession = async (context: GetServerSidePropsContext) => {
  const { req } = context

  const kindeToken = req?.cookies?.kinde_token || ''
  if (!kindeToken) return undefined

  try {
    const verifier = JwtRsaVerifier.create({
      audience: null,
      issuer,
      jwksUri: `${issuer}/.well-known/jwks.json`,
    })

    const payload = await verifier.verify(
      JSON.parse(kindeToken).access_token,
    )

    return payload
  } catch (error) {
    return undefined
  }
}

export default getServerSession
