import { useRouter } from 'next/router'

import type { GetServerSideProps } from 'next'

import { Flex, Heading } from '@chakra-ui/react'

import { getServerSession } from '@utils/kindeAuth'

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
  const session = await getServerSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/kindeAuth/login?post_login_redirect_url=/posts/new',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default NewPostPage
