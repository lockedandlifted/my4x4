import { useRouter } from 'next/router'
import {
  Button, Flex, Heading, VStack,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { SiAuth0, SiFacebook } from 'react-icons/si'

import MobileLayout from '@layouts/MobileLayout'

const CALLBACK_URL = '/users/account'

const UserLoginPage = () => {
  const routerPayload = useRouter()
  const { query } = routerPayload

  const callbackUrl = query?.redirect || CALLBACK_URL

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8}>
        <Heading fontWeight="medium" size="lg">
          Login or Sign Up
        </Heading>

        <VStack alignItems="flex-start" marginTop={8}>
          <Button
            leftIcon={<SiFacebook />}
            onClick={() => signIn('facebook', { callbackUrl })}
            width="100%"
          >
            Login with Facebook
          </Button>

          <Button
            leftIcon={<SiAuth0 />}
            onClick={() => signIn('auth0', { callbackUrl })}
            width="100%"
          >
            Login with Auth0
          </Button>
        </VStack>
      </Flex>
    </MobileLayout>
  )
}

export default UserLoginPage
