import { useRouter } from 'next/router'

import type { GetServerSideProps } from 'next'

import { Flex, Heading } from '@chakra-ui/react'

import { getServerAuthSession } from '@utils/getServerSession'

import MobileLayout from '@layouts/MobileLayout'

import PostForm from '@components/PostForm'

const NewPostPage = () => {
  const { query: { categoryKey } } = useRouter()

  return (
    <MobileLayout>
      <Flex direction="column" marginTop={8} width="100%">
        <Heading as="h1" fontWeight="medium" marginBottom="4" size="lg">
          New Post
        </Heading>

        <PostForm categoryKey={categoryKey} />
      </Flex>
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/users/login?callback_url=/posts/new',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default NewPostPage
