import { useState } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'

import type { Comment as CommentType, Prisma } from '@prisma/client'

import AddCommentBox from '@components/AddCommentBox'
import UserImage from '@components/UserImage'

type UserWithImage = Prisma.UserGetPayload<{
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
}>

type CommentProps = {
  comment: CommentType,
  user: UserWithImage,
}

const Comment = (props: CommentProps) => {
  const { comment, user } = props

  const [showAddComment, setShowAddComment] = useState(false)

  return (
    <Flex marginBottom="4" width="100%">
      <UserImage user={user} />

      <Flex direction="column" marginLeft="2" width="100%">
        <Flex
          backgroundColor="gray.50"
          borderRadius="xl"
          direction="column"
          padding="4"
          position="relative"
        >
          <Text fontWeight="bold">
            {user?.name}
          </Text>

          <Text>
            {comment?.body}
          </Text>

          <Flex
            backgroundColor="blue.400"
            borderRadius="lg"
            color="white"
            fontSize="xs"
            paddingY="1"
            paddingX="2"
            position="absolute"
            right="10px"
            bottom="-12px"
          >
            <Text>2 Likes</Text>
          </Flex>
        </Flex>

        <Flex marginTop="1">
          <Button as="a" variant="link">Like</Button>
          <Button
            as="a"
            marginLeft="2"
            onClick={() => setShowAddComment(!showAddComment)}
            variant="link"
          >
            Reply
          </Button>
        </Flex>

        {showAddComment && (
          <Flex marginTop="4" width="100%">
            <AddCommentBox
              callbacks={{
                addComment: value => console.log('Add Comment', value),
                setValue: value => console.log(value),
              }}
              value=""
            />
          </Flex>
        )}

      </Flex>
    </Flex>
  )
}

export default Comment
