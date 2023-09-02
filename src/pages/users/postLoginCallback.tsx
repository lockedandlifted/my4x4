import { deleteCookie, getCookie } from 'cookies-next'
import type { GetServerSideProps } from 'next'

const PostLoginCallback = () => null

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const redirect = getCookie('my4x4-login-redirect', { req, res })
  if (redirect) {
    deleteCookie('my4x4-login-redirect', { req, res })

    return {
      props: {},
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }

  return {
    props: {},
    redirect: {
      destination: '/users/account',
      permanent: false,
    },
  }
}

export default PostLoginCallback
