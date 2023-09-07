import { useRouter } from 'next/router'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { SiAuth0, SiFacebook } from 'react-icons/si'
import { FiMail } from 'react-icons/fi'

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

        <Alert
          borderRadius="xl"
          marginTop="2"
          padding={8}
          status="info"
          variant="subtle"
        >
          <AlertIcon />

          <AlertDescription>
            We are in the process of changing our authentication platform. We are doing this so that we can support a native mobile app. If you have any issues logging in please <strong><a href="support@lockedandlifted4x4.com">contact us</a></strong> for assistance.
          </AlertDescription>
        </Alert>

        <VStack alignItems="flex-start" marginTop={2}>
          <Button
            leftIcon={<SiFacebook />}
            onClick={() => signIn('facebook', { callbackUrl })}
            size="lg"
            width="100%"
          >
            Login with Facebook
          </Button>

          <Button
            leftIcon={<FiMail />}
            onClick={() => signIn('kinde', { callbackUrl })}
            size="lg"
            width="100%"
          >
            Login with Email
          </Button>
        </VStack>
      </Flex>
    </MobileLayout>
  )
}

export default UserLoginPage
