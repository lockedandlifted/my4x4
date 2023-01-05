import cuid from 'cuid'
import { getCookie, setCookie } from 'cookies-next'

import type { GetServerSideProps } from 'next'

const setTemporaryUserIdCookie = (context: GetServerSideProps) => {
  const { req, res } = context

  const cookieKey = 'my4x4-temporary-user-id'
  const temporaryUserId = getCookie(cookieKey, { req, res }) ?? cuid()

  setCookie(cookieKey, temporaryUserId, { req, res, maxAge: 86400 * 31 }) // Expires in 31 days

  return temporaryUserId
}

export default setTemporaryUserIdCookie
