import { useRouter } from 'next/router'
import { Flex, Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import PostForm from '@components/PostForm'

const EditPostPage = () => {
  const { query: { postId } } = useRouter()

  const postQuery = trpc.posts.getPostById.useQuery(
    { id: postId },
    { enabled: !!postId },
  )
  const { data: post } = postQuery

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          Edit Post
        </Heading>

        <PostForm post={post} />
      </Flex>
    </MobileLayout>
  )
}

export default EditPostPage
