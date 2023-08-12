import { getServerSession } from 'next-auth/next'
import { useRouter } from 'next/router'

import type { GetServerSideProps } from 'next'

import { authOptions } from '@pages/api/auth/[...nextauth]'

import { Flex, Heading } from '@chakra-ui/react'

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
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions(context.req, context.res),
  )

  if (!session) {
    return {
      redirect: {
        destination: '/users/login?redirect=/posts/new',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default NewPostPage
