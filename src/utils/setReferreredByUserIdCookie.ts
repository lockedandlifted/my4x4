import { setCookie } from 'cookies-next'

import type { GetServerSideProps } from 'next'

const setReferreredByUserIdCookie = (context: GetServerSideProps) => {
  const { req, res, query } = context

  const cookieKey = 'my4x4-referrered-by-user-id'
  const { referredByUserId } = query

  if (referredByUserId) {
    setCookie(cookieKey, referredByUserId, { req, res, maxAge: 86400 * 31 }) // Expires in 31 days
  }

  return referredByUserId
}

export default setReferreredByUserIdCookie
