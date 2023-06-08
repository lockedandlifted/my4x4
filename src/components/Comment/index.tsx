import { useState } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'

import type { Comment as CommentType, Prisma } from '@prisma/client'

import useSubComments from '@hooks/useSubComments'

import AddCommentBox from '@components/AddCommentBox'
import UserImage from '@components/UserImage'

import LikeButton from './LikeButton'

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
  allowSubComments?: boolean,
  callbacks: {
    invalidate: VoidFunction,
  },
  comment: CommentType,
  user: UserWithImage,
}

const Comment = (props: CommentProps) => {
  const {
    allowSubComments = true,
    callbacks: {
      invalidate,
    },
    comment,
    user,
  } = props

  const subCommentsPayload = useSubComments({
    callbacks: {
      invalidate,
    },
    parentComment: comment,
  })

  const {
    callbacks: {
      createComment,
      setInputValue,
      setShowAddComment,
    },
    hasSubComments,
    inputValue,
    isLoading,
    showAddComment,
    subComments,
  } = subCommentsPayload

  const commentCount = comment?._count?.commentLikes || 0

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

          {commentCount > 0 && (
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
              <Text>
                {commentCount} {commentCount === 1 ? 'Like' : 'Likes'}
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex marginTop="1">
          <LikeButton callbacks={{ invalidate }} comment={comment} />

          {allowSubComments && (
            <Button
              as="a"
              marginLeft="2"
              onClick={() => setShowAddComment(!showAddComment)}
              variant="link"
            >
              Reply
            </Button>
          )}
        </Flex>

        {showAddComment && (
          <Flex marginTop="4" width="100%">
            <AddCommentBox
              callbacks={{
                addComment: (commentBody: string) => createComment({ body: commentBody }),
                setInputValue,
              }}
              compact
              inputValue={inputValue}
              isLoading={isLoading}
            />
          </Flex>
        )}

        {hasSubComments && (
          <Flex direction="column" marginTop="4" width="100%">
            {subComments?.map((subComment) => {
              const subCommentUser = subComment?.user

              return (
                <Comment
                  allowSubComments={false}
                  callbacks={{ invalidate }}
                  key={subComment.id}
                  comment={subComment}
                  user={subCommentUser}
                />
              )
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default Comment
