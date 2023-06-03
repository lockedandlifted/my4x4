import {
  Flex, Heading, Link, Text,
} from '@chakra-ui/react'

import type { Prisma, Project } from '@prisma/client'

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
  },
}>

type QuestionProps = {
  hasComments: boolean,
  post: PostWithComments,
  project: Project,
}

const Question = (props: QuestionProps) => {
  const { hasComments, post, project } = props

  const commentCount = post._count?.postsComments
  const firstComment = post.postsComments?.[0]?.comment

  return (
    <Flex borderBottomWidth="1px" direction="column" marginTop="4" paddingBottom="4">
      <Heading size="sm">{post.body}</Heading>

      <Text fontSize="sm" marginTop="2">{firstComment?.body}</Text>

      <Flex fontSize="sm" fontWeight="bold" justifyContent="space-between" marginTop="2">
        <Text color={hasComments ? 'gray.500' : 'gray.300'}>
          {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
        </Text>

        <Link href={`/${project?.slug}/questions/${post?.id}`}>
          {hasComments ? 'Read More' : 'Reply'}
        </Link>
      </Flex>
    </Flex>
  )
}

export default Question
