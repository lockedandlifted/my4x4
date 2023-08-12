import { Button, Flex, Text } from '@chakra-ui/react'

import type { Post } from '@prisma/client'

type EditPostBannerProps = {
  editMode?: boolean,
  post: Post,
  postViewCount: number,
}

const EditPostBanner = (props: EditPostBannerProps) => {
  const { editMode = false, post, postViewCount = 0 } = props

  return (
    <Flex alignItems="center" borderBottomWidth={1} borderTopWidth={1} paddingY="4">
      <Flex direction="column">
        <Text fontSize="sm" fontWeight="bold" noOfLines={1}>{post?.title}</Text>
        <Text fontSize="sm">
          Viewed {postViewCount} {postViewCount === 1 ? 'Time' : 'Times'}
        </Text>
      </Flex>

      <Button
        as="a"
        flexShrink={0}
        href={editMode ? `/posts/${post?.id}` : `/posts/${post?.id}/edit`}
        marginLeft="auto"
        size="sm"
      >
        {editMode ? 'View Public Page' : 'Edit Post'}
      </Button>
    </Flex>
  )
}

export default EditPostBanner
