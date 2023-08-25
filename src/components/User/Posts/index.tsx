import {
  Button, Flex, Heading,
} from '@chakra-ui/react'

import type { User } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Post from './Post'

type PostsProps = {
  editMode: boolean,
  user: User,
}

const Posts = (props: PostsProps) => {
  const { editMode = false, user } = props

  // Query
  const postsQuery = trpc.posts.getPosts.useQuery({
    hidden: false,
    postTypeKey: 'forum',
    userId: user?.id,
  }, { enabled: !!user?.id })

  const { data: posts = [] } = postsQuery

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md">Posts</Heading>
      </Flex>

      {posts.map(post => (
        <Post
          editMode={editMode}
          href={editMode ? `/posts/${post.id}/edit` : ''}
          key={post.id}
          post={post}
        />
      ))}

      {editMode && (
        <Button
          as="a"
          href="/posts/new"
          marginTop={2}
          size="lg"
        >
          New Post
        </Button>
      )}
    </Flex>
  )
}

export default Posts
