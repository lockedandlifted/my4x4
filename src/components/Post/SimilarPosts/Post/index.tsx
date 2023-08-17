import {
  Flex, LinkBox, LinkOverlay, Text,
} from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

import UserImage from '@components/UserImage'

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

type PostProps = {
  post: PostWithIncludes,
}

const Post = (props: PostProps) => {
  const { post, post: { createdAt, user } } = props

  return (
    <LinkBox
      as="article"
      alignItems="center"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      flexDirection="row"
      marginTop={4}
      padding={4}
      width="100%"
    >
      <UserImage user={user} />

      <LinkOverlay href={`/posts/${post?.id}`}>
        <Flex direction="column" fontSize="sm" marginLeft="2">
          <Text as="h3" fontWeight="bold" fontSize="lg" lineHeight={1} marginBottom="1">
            {post?.title}
          </Text>

          <Text marginBottom="1">
            {user?.name}
          </Text>

          {!!createdAt && (
            <Text color="gray.500" fontSize="xs">
              {createdAt.toLocaleString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          )}
        </Flex>
      </LinkOverlay>
    </LinkBox>
  )
}

export default Post
