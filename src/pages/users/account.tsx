import { Flex } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import type { GetServerSideProps } from 'next'

import { trpc } from '@utils/trpc'
import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

import MobileLayout from '@layouts/MobileLayout'

import Links from '@components/User/Links'
import Projects from '@components/User/Projects'
import UserForm from '@components/UserForm'

const UserAccountPage = (props: { temporaryUserId: string }) => {
  const { temporaryUserId } = props

  const { data: sessionData } = useSession()

  const userQuery = trpc.users.getUserById.useQuery({
    id: sessionData?.user?.id,
  }, { enabled: !!sessionData?.user?.id })

  const { data: user } = userQuery

  return (
    <MobileLayout>
      <Flex direction="column">
        {!!user?.id && (<UserForm user={user} />)}

        <Links editMode user={user} />

        <Projects editMode temporaryUserId={temporaryUserId} user={user} />
      </Flex>
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const temporaryUserId = setTemporaryUserIdCookie(context)
  return { props: { temporaryUserId } }
}

export default UserAccountPage
