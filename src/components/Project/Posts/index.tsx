import { Flex, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaAngleRight } from 'react-icons/fa'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Post from '@components/Post/SimilarPosts/Post'

type PostsProps = {
  project: Project,
}

const Posts = (props: PostsProps) => {
  const { project } = props

  const postsQuery = trpc.posts.getPosts.useQuery({
    limit: 3,
    postTypeKey: 'forum',
    projectId: project?.id,
    published: true,
  }, { enabled: !!project?.id })

  const { data: posts = [] } = postsQuery

  if (!posts.length) {
    return null
  }

  return (
    <Flex direction="column" marginTop="8" width="100%">
      <Heading size="sm">
        Posts
      </Heading>

      <Flex direction="column">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </Flex>

      <NextLink href={`/${project.slug}/posts`}>
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          paddingY={4}
          width="100%"
        >
          <Text fontWeight="bold" marginRight={1}>View All</Text>

          <Text fontSize="xl">
            <FaAngleRight />
          </Text>
        </Flex>
      </NextLink>

    </Flex>
  )
}

export default Posts
