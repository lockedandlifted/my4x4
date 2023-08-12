import {
  Alert,
  AlertDescription,
  Button,
  Flex,
} from '@chakra-ui/react'

import type { Post } from '@prisma/client'

type PublishPostProps = {
  callbacks: {
    publishPost: VoidFunction,
  },
  post: Post,
}

const PublishPost = (props: PublishPostProps) => {
  const { callbacks: { publishPost }, post } = props

  if (post?.published) return null

  return (
    <Alert
      borderRadius="xl"
      marginBottom={4}
      padding={8}
      status="info"
      variant="subtle"
    >
      <Flex alignItems="flex-start" direction="column">
        <AlertDescription>
          Post is not Published and therefore not visible to the public.
        </AlertDescription>

        <Button
          as="a"
          colorScheme="blue"
          onClick={publishPost}
          marginTop={4}
          size="md"
        >
          Publish Post
        </Button>
      </Flex>
    </Alert>
  )
}

export default PublishPost
