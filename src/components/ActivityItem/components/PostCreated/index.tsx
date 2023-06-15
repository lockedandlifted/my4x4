import {
  Flex, Heading, Link, Text,
} from '@chakra-ui/react'

import type { ActivityItem } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ActivityContainer from '../ActivityContainer'

type PostCreatedProps = {
  activityItem: ActivityItem,
}

const PostCreated = (props: PostCreatedProps) => {
  const { activityItem } = props

  const postQuery = trpc.posts.getPostById.useQuery({
    id: activityItem.subjectId,
  })

  const { data: post } = postQuery
  const user = post?.user
  const project = post?.postsProjects?.[0]?.project

  const isQuestion = post?.postType?.key === 'question'
  const firstComment = post?.postsComments?.[0]?.comment

  const commentCount = post?._count?.postsComments
  const likeCount = post?._count?.postLikes

  const activityText = isQuestion
    ? `A new ${post?.title}`
    : ''

  const activityBodyText = isQuestion
    ? post?.body
    : post?.title

  const postUrl = `/${project?.slug}/questions/${post?.id}`

  return (
    <ActivityContainer>
      <ActivityContainer.Owner
        createdDate={post?.createdAt}
        user={user}
      />

      <ActivityContainer.Text>
        {activityText}
        <Link fontWeight="bold" href={postUrl} marginLeft="1">Read More</Link>
      </ActivityContainer.Text>

      <ActivityContainer.Body>
        <Flex borderWidth="1px" borderRadius="xl" direction="column" padding="8">
          <Heading fontWeight="medium" size="lg">
            {activityBodyText}
          </Heading>

          {!!firstComment && (
            <Text marginTop="4">
              {firstComment?.body}
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

export default PostCreated
