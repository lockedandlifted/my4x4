import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'

import { trpc } from '@utils/trpc'

type UseSessionOptions = {
  includeUser?: boolean,
}

function useSession(options?: UseSessionOptions) {
  const { includeUser } = options || {}

  const {
    isAuthenticated,
    isLoading,
    user: kindeUser,
  } = useKindeAuth()

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
    isAuthenticated,
    isLoading,
    kindeUser,
    user,
  }
}

export default useSession
