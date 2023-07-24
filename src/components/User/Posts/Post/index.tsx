import { Flex, Heading, Text } from '@chakra-ui/react'
import { GrTextWrap } from 'react-icons/gr'

import type { Post as PostModel } from '@prisma/client'

type PostProps = {
  editMode?: boolean,
  post: PostModel,
}

const Post = (props: PostProps) => {
  const { editMode = false, post } = props

  return (
    <Flex
      alignItems="center"
      as="a"
      borderWidth={1}
      borderRadius="xl"
      href={editMode ? `/posts/${post?.id}/edit` : undefined}
      marginTop={4}
      padding={2}
    >
      <Flex
        alignItems="center"
        backgroundColor="gray.50"
        borderRadius="xl"
        flexShrink={0}
        height={14}
        justifyContent="center"
        width={14}
      >
        <GrTextWrap />
      </Flex>

      <Flex justifyContent="center" flexDirection="column" marginLeft={4} width="calc(100% - 80px)">
        <Heading size="small">
          {post.title}
        </Heading>

        <Text color="gray.500" fontSize="sm" fontStyle="italic" noOfLines={1}>
          {post.published ? 'Published' : 'Draft'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Post
