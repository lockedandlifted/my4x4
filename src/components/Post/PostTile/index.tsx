import {
  Badge, Box, Flex, Heading, LinkBox, LinkOverlay,
} from '@chakra-ui/react'
import { HiOutlineHeart } from 'react-icons/hi'
import { FaRegComments } from 'react-icons/fa'

import type { Prisma } from '@prisma/client'

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        postsComments: true,
      },
    },
    postsCategories: {
      include: {
        category: true,
      },
    },
    postsComments: {
      include: {
        comment: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 1,
    },
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

type PostTileProps = {
  post: PostWithIncludes,
}

const PostTile = (props: PostTileProps) => {
  const { post } = props

  return (
    <LinkBox
      alignItems="flex-start"
      as="article"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      marginTop="4"
      width="100%"
    >
      {/* <Flex backgroundColor="gray.100" borderTopRadius="lg" height="176px" width="100%">
        Image
      </Flex> */}

      <Flex alignItems="flex-start" direction="column" padding="2">
        <Flex>
          {post?.postsCategories?.map((postCategory) => {
            const { category, id } = postCategory

            return (
              <Badge
                as="a"
                key={id}
                textTransform="uppercase"
                marginTop="2"
                marginRight="2"
                width="auto"
              >
                {category?.title}
              </Badge>
            )
          })}
        </Flex>

        <Heading as="h2" fontWeight="medium" marginTop="2" size="sm">
          <LinkOverlay href={`/posts/${post?.id}`}>
            {post?.title}
          </LinkOverlay>
        </Heading>

        <Flex alignItems="center" marginTop="2">
          <Flex alignItems="center">
            <HiOutlineHeart fontSize={18} />
            <Box marginLeft="1">{post?._count?.postsComments}</Box>
          </Flex>

          <Flex alignItems="center" marginLeft="4">
            <FaRegComments fontSize={18} />
            <Box marginLeft="1">{post?._count?.postsComments}</Box>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export default PostTile
