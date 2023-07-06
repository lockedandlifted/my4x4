import {
  Flex, Heading, Link, Text,
} from '@chakra-ui/react'

import type { Prisma, Project } from '@prisma/client'

import UserImage from '@components/UserImage'

type PostWithComments = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        postsComments: true,
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

type QuestionProps = {
  hasComments: boolean,
  post: PostWithComments,
  project: Project,
}

const Question = (props: QuestionProps) => {
  const { hasComments, post, project } = props

  const user = post?.user

  const commentCount = post._count?.postsComments
  const firstComment = post.postsComments?.[0]?.comment

  return (
    <Flex marginTop="6" width="100%">
      <UserImage height={32} width={32} user={user} />

      <Flex
        borderBottomWidth="1px"
        borderBottomStyle="dashed"
        direction="column"
        marginLeft="4"
        paddingBottom="6"
        width="100%"
      >
        <Heading fontWeight="medium" size="sm">{post.body}</Heading>

        <Text fontSize="sm" marginTop="2">{firstComment?.body}</Text>

        <Flex
          fontSize="sm"
          fontWeight="bold"
          justifyContent="space-between"
          marginTop="2"
        >
          {hasComments && (
            <Text color="gray.500">
              {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
            </Text>
          )}

          {!hasComments && (
            <Text color="gray.300">
              Unanswered
            </Text>
          )}

          <Link
            color="teal"
            href={`/${project?.slug}/questions/${post?.id}`}
          >
            {hasComments ? 'Read More' : 'Reply'}
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Question
