import useSession from '@hooks/useSession'
import { H } from 'highlight.run'

const IdentifySessionUser = () => {
  const { isAuthenticated, user } = useSession({ includeUser: true })

  if (!isAuthenticated || !user?.id) return null

  H.identify(user?.email || 'unauthenticated', {
    id: user?.id,
  })

  return null
}

export default IdentifySessionUser
