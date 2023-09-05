import {
  Button, Flex, Heading,
} from '@chakra-ui/react'

import { signOut } from 'next-auth/react'

const Account = () => (
  <Flex flexDirection="column" marginTop={8}>
    <Flex justifyContent="space-between">
      <Heading size="md" marginBottom="4">Account</Heading>
    </Flex>

    <Button
      as="a"
      href={process.env.NEXT_PUBLIC_AUTH_PROVIDER === 'kinde' ? '/api/kindeAuth/logout' : undefined}
      marginTop={2}
      onClick={process.env.NEXT_PUBLIC_AUTH_PROVIDER === 'kinde' ? undefined : () => signOut({ callbackUrl: '/' })}
      size="lg"
    >
      Sign Out
    </Button>
  </Flex>
)

export default Account
