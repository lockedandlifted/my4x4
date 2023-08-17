import { Flex, Heading } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Post from './Post'

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {
    user: {
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
      },
    },
  },
}>

type SimilarPostsProps = {
  post: PostWithIncludes,
}

const SimilarPosts = (props: SimilarPostsProps) => {
  const { post } = props

  const similarPostsQuery = trpc.posts.getSimilarPosts.useQuery({
    limit: 3,
    postId: post?.id,
  }, { enabled: !!post?.id })

  const { data: similarPosts = [] } = similarPostsQuery

  if (!similarPosts.length) {
    return null
  }

  return (
    <Flex direction="column" marginTop="8" width="100%">
      <Heading size="sm">
        Read Next
      </Heading>

      <Flex direction="column">
        {similarPosts.map(similarPost => (
          <Post key={similarPost.id} post={similarPost} />
        ))}
      </Flex>
    </Flex>
  )
}

export default SimilarPosts
