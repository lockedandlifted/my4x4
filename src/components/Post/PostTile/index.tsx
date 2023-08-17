import {
  Badge, Box, Flex, Heading, Image, Link, LinkBox, LinkOverlay, Text,
} from '@chakra-ui/react'
import { HiOutlineHeart } from 'react-icons/hi'
import { FaRegComments } from 'react-icons/fa'

import type { Prisma } from '@prisma/client'

import useImageUrl from '@hooks/useImageUrl'

import UserImage from '@components/UserImage'

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
    postsImages: {
      include: {
        image: true,
      },
      orderBy: {
        updatedAt: 'desc',
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
  const { post, post: { createdAt, user } } = props

  const image = post?.postsImages?.[0]?.image

  const hasImage = !!image

  const { imageUrl } = useImageUrl({
    enabled: hasImage,
    path: image?.fileKey,
    transformation: [{
      focus: 'auto',
      height: '480',
      width: '1000',
    }],
  })

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

      {hasImage && (
        <Flex
          backgroundColor="gray.100"
          borderTopRadius="lg"
          height="176px"
          overflow="hidden"
          position="relative"
          width="100%"
        >
          <Image
            alt="Post Cover Image"
            objectFit="cover"
            src={imageUrl}
            width="100%"
          />
        </Flex>
      )}

      <Flex alignItems="flex-start" direction="column" padding="4">
        <Flex>
          <UserImage user={user} />

          <Flex direction="column" fontSize="sm" marginLeft="2">
            <Link href={`/users/${user.username}`} fontWeight="bold">
              {user?.name}
            </Link>

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
        </Flex>

        <Heading as="h2" fontWeight="medium" marginTop="2" size="lg">
          <LinkOverlay href={`/posts/${post?.id}`}>
            {post?.title}
          </LinkOverlay>
        </Heading>

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

        <Text marginTop="2" noOfLines={3}>
          {post?.body}
        </Text>

        <Flex
          alignItems="center"
          marginTop="2"
          borderTopWidth="1px"
          borderTopStyle="dashed"
          width="100%"
          paddingTop="2"
        >
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
