import {
  Alert,
  AlertDescription,
  Button,
  Flex,
} from '@chakra-ui/react'
import useSession from '@hooks/useSession'

const CreateAccountNotice = () => {
  const { isAuthenticated } = useSession()

  if (isAuthenticated) {
    return null
  }

  return (
    <Alert
      borderRadius="xl"
      marginBottom={4}
      padding={8}
      status="success"
      variant="subtle"
    >
      <Flex alignItems="flex-start" direction="column">
        <AlertDescription>
          Create an account to show off your build and secure your custom
          url e.g. www.my4x4.info/<strong>black-beauty</strong>
        </AlertDescription>

        <Button
          as="a"
          colorScheme="green"
          href="/users/login"
          marginTop={4}
          size="md"
        >
          Create an Account
        </Button>
      </Flex>
    </Alert>
  )
}

export default CreateAccountNotice
