import { Flex, Heading } from '@chakra-ui/react'

import MobileLayout from '@layouts/MobileLayout'

import PostForm from '@components/PostForm'

const NewPostPage = () => {
  console.log('New Page')
  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          New Post
        </Heading>

        <PostForm />
      </Flex>
    </MobileLayout>
  )
}

export default NewPostPage
