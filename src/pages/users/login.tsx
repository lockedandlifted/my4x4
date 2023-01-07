import {
  Button, Flex, Heading, VStack,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { SiAuth0, SiInstagram } from 'react-icons/si'

import MobileLayout from '@layouts/MobileLayout'

const CALLBACK_URL = '/users/account'

const UserLoginPage = () => (
  <MobileLayout>
    <Flex direction="column" marginTop={8}>
      <Heading fontWeight="medium" size="lg">
        Login or Sign Up
      </Heading>

      <VStack alignItems="flex-start" marginTop={8}>
        <Button
          leftIcon={<SiInstagram />}
          onClick={() => signIn('instagram', { callbackUrl: CALLBACK_URL })}
          width="100%"
        >
          Login with Instagram
        </Button>

        <Button
          leftIcon={<SiAuth0 />}
          onClick={() => signIn('auth0', { callbackUrl: CALLBACK_URL })}
          width="100%"
        >
          Login with Auth0
        </Button>
      </VStack>
    </Flex>
  </MobileLayout>
)

export default UserLoginPage
