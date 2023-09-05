import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'
import { useSession as useNextAuthReactSession } from 'next-auth/react'

import { trpc } from '@utils/trpc'

type UseSessionOptions = {
  includeUser?: boolean,
}

function useKindeSession(options?: UseSessionOptions) {
  const { includeUser } = options || {}

  const kindeAuthPayload = useKindeAuth()
  const {
    getToken,
    isAuthenticated,
    isLoading,
    user: kindeUser,
  } = kindeAuthPayload

  const userQuery = trpc.users.findOrCreateUserForProviderById.useQuery(
    {
      provider: 'kinde',
      providerAccountId: kindeUser?.id,
    },
    { enabled: !!kindeUser?.id && includeUser },
  )
  const { data: user } = userQuery

  return {
    data: includeUser && user ? { user } : undefined,
    getToken,
    isAuthenticated,
    isLoading,
    kindeUser,
    user,
  }
}

function useNextAuthSession(options?: UseSessionOptions) {
  const { includeUser } = options || {}

  const nextAuthPayload = useNextAuthReactSession()
  const {
    data: sessionData,
  } = nextAuthPayload

  const userQuery = trpc.users.getUserById.useQuery(
    {
      id: sessionData?.user?.id,
    },
    { enabled: !!sessionData?.user?.id && includeUser },
  )
  const { data: user } = userQuery

  return {
    data: includeUser && user ? { user } : undefined,
    isAuthenticated: !!sessionData?.user?.id,
    isLoading: false,
    user,
  }
}

export default process.env.AUTH_PROVIDER === 'kinde' ? useKindeSession : useNextAuthSession
