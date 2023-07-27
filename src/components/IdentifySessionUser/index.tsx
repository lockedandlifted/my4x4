import { useSession } from 'next-auth/react'
import { H } from 'highlight.run'

const IdentifySessionUser = () => {
  const { data: sessionData } = useSession()

  if (!sessionData?.user?.id) return null

  H.identify(sessionData.user.email || 'unauthenticated', {
    id: sessionData?.user?.id,
  })

  return null
}

export default IdentifySessionUser
