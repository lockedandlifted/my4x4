import {
  Flex, Heading, Link, Text,
} from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

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
}

const Question = (props: QuestionProps) => {
  const { hasComments, post } = props

  const commentCount = post._count?.postsComments
  const firstComment = post.postsComments?.[0]?.comment
  console.log({ firstComment })
  return (
    <Flex borderBottomWidth="1px" direction="column" marginTop="4" paddingBottom="4">
      <Heading size="sm">{post.title}</Heading>

      <Text fontSize="sm" marginTop="2">{firstComment?.body}</Text>

      <Flex fontSize="sm" justifyContent="space-between" marginTop="2">
        <Text>
          {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
        </Text>
        <Link>Read More</Link>
      </Flex>
    </Flex>
  )
}

export default Question
