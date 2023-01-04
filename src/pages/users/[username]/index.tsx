import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button, Flex } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

const ProfilePage = () => {
  const { query: { username } } = useRouter()
  const { data: sessionData } = useSession()

  const userQuery = trpc.users.getUserByUsername.useQuery(
    { username },
    { enabled: !!username },
  )
  const { data: user } = userQuery

  const userProjectsQuery = trpc.projects.getProjects.useQuery(
    { userId: user?.id },
    { enabled: !!user?.id },
  )
  const { data: projects = [] } = userProjectsQuery

  return (
    <MobileLayout>
      <Flex flexDirection="column">
        Viewing {username}

        <Flex flexDirection="column">
          {projects?.map(project => (
            <Flex key={project.id}>
              {project.title}
            </Flex>
          ))}
        </Flex>

        <Button
          onClick={sessionData ? () => signOut() : () => signIn('auth0')}
        >
          {sessionData ? 'Sign out' : 'Sign in'}
        </Button>
      </Flex>
    </MobileLayout>
  )
}

export default ProfilePage
