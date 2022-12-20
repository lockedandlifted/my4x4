import { signIn, signOut, useSession } from 'next-auth/react'

import type { GetServerSideProps } from 'next'
import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'
import setupTrpcCaller from '@utils/setupTrpcCaller'

import MobileLayout from '@layouts/MobileLayout'

import ProjectTile from '@components/ProjectTile'

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

type HomeProps = {
  projects: Project[],
}

const Home = (props: HomeProps) => {
  const { projects } = props

  return (
    <MobileLayout>
      {projects?.map(project => (
        <ProjectTile key={project.id} project={project} />
      ))}

      <AuthShowcase />
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trpcCaller = await setupTrpcCaller(context)
  const projects = await trpcCaller.projects.getRecentProjects({
    limit: 10,
  })

  return { props: { projects } }
}

export default Home
