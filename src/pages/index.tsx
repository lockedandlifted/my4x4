import { signIn, signOut, useSession } from 'next-auth/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import Hero from '@components/Landing/Hero'
import RecentProjects from '@components/Landing/RecentProjects'

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession()

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  )

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        onClick={sessionData ? () => signOut() : () => signIn()}
        type="button"
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}

const Home = () => (
  <MobileLayout>
    <Hero />

    <RecentProjects />

    <AuthShowcase />
  </MobileLayout>
)

export default Home
