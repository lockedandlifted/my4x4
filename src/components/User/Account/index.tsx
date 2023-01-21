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
      onClick={() => signOut({ callbackUrl: '/' })}
      marginTop={2}
      size="lg"
    >
      Sign Out
    </Button>
  </Flex>
)

export default Account
