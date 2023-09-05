import { setCookie } from 'cookies-next'
import type { GetServerSideProps } from 'next'

const LoginWithRedirectPage = () => null

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { redirect } = query
  if (redirect) {
    setCookie('my4x4-login-redirect', redirect, { req, res, maxAge: 3600 })
  }

  return {
    props: {},
    redirect: {
      destination: '/api/kindeAuth/login?post_login_redirect_url=/custom/path',
      permanent: false,
    },
  }
}

export default LoginWithRedirectPage
