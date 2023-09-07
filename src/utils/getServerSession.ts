import type { GetServerSidePropsContext } from 'next'
import { getServerAuthSession as getKindeAuthSession } from './kindeAuth'
import { getServerAuthSession as getNextAuthSession } from './nextAuth'

export const getServerAuthSession = async (context: GetServerSidePropsContext) => {
  if (process.env.AUTH_PROVIDER === 'kinde') {
    return getKindeAuthSession(context)
  }

  return getNextAuthSession(context)
}

export default getServerAuthSession
