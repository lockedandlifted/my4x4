import {
  Badge, Flex, Heading, Image, Link, Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import type { ActivityItem } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useImageUrl from '@hooks/useImageUrl'

import ActivityContainer from '../ActivityContainer'

type PostPublishedProps = {
  activityItem: ActivityItem,
}

const PostPublished = (props: PostPublishedProps) => {
  const { activityItem } = props

  const postQuery = trpc.posts.getPostById.useQuery({
    id: activityItem.subjectId,
  })

  const { data: post } = postQuery
  const user = post?.user

  const commentCount = post?._count?.postsComments
  const likeCount = post?._count?.postLikes

  const postUrl = `/posts/${post?.id}`

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
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={post?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        A new post was published.
        <Link fontWeight="bold" href={postUrl} marginLeft="1">View Post</Link>
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        <Flex borderWidth="1px" borderRadius="xl" direction="column" padding="4">
          {hasImage && (
            <Flex
              backgroundColor="gray.100"
              borderTopRadius="lg"
              height="176px"
              marginBottom={4}
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

          <Flex>
            {post?.postsCategories?.map((postCategory) => {
              const { category, id } = postCategory

              return (
                <Badge
                  as="a"
                  key={id}
                  textTransform="uppercase"
                  marginBottom="2"
                  marginRight="2"
                  width="auto"
                >
                  {category?.title}
                </Badge>
              )
            })}
          </Flex>

          <NextLink href={postUrl}>
            <Heading fontWeight="medium" size="lg">
              {post?.title}
            </Heading>
          </NextLink>

          {!!post?.body && (
            <Text marginTop="4" noOfLines={3}>
              {post?.body}
            </Text>
          )}

          <Flex
            borderTopWidth="1px"
            borderTopStyle="dashed"
            justifyContent="space-between"
            paddingTop="4"
            marginTop="4"
          >
            <Text fontWeight="bold">
              {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </Text>

            <Link fontWeight="bold" href={postUrl}>
              {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
            </Link>
          </Flex>
        </Flex>
      </ActivityContainer.Body>
    </ActivityContainer>
  )
}

export default PostPublished
