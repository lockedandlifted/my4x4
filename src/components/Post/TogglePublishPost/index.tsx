import {
  Alert,
  AlertDescription,
  Button,
  Flex,
} from '@chakra-ui/react'

import type { Post } from '@prisma/client'

type TogglePublishPostProps = {
  callbacks: {
    togglePublishPost: VoidFunction,
  },
  post: Post,
}

const TogglePublishPost = (props: TogglePublishPostProps) => {
  const { callbacks: { togglePublishPost }, post } = props

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
          {post.published
            ? 'Post is Published and visible to the public'
            : 'Post is not Published and therefore not visible to the public.'}
        </AlertDescription>

        <Button
          as="a"
          colorScheme="blue"
          onClick={() => togglePublishPost()}
          marginTop={4}
          size="md"
        >
          {post.published ? 'Unpublish Post' : 'Publish Post'}
        </Button>
      </Flex>
    </Alert>
  )
}

export default TogglePublishPost
