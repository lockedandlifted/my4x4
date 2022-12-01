import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from "next-auth/react"
import { Button, Flex } from '@chakra-ui/react'

import DefaultLayout from '@layouts/MobileLayout'

const ProfilePage = () => {
  const { query: { username } } = useRouter()
  const { data: sessionData } = useSession();

  console.log(sessionData)
  return (
    <DefaultLayout>
      <Flex flexDirection="column">
        Viewing {username}

        <Button
          onClick={sessionData ? () => signOut() : () => signIn('auth0')}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
      </Flex>
    </DefaultLayout>
  )
}

export default ProfilePage
