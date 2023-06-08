import { Flex, Text } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import UserImage from '@components/UserImage'

import type { Post } from '@prisma/client'

type QuestionProps = {
  href: string,
  post: Post,
}

const Question = (props: QuestionProps) => {
  const { href, post } = props

  const commentCount = post?._count?.postsComments

  return (
    <Flex
      as="a"
      borderBottomStyle="dashed"
      borderBottomWidth="1px"
      href={href}
      marginTop="4"
      paddingBottom="4"
    >
      <UserImage height={30} width={30} user={post?.user} />

      <Flex direction="column" marginLeft="2">
        <Text fontWeight="medium" noOfLines={1}>
          {post?.body}
        </Text>

        <Text fontSize="sm" noOfLines={1}>
          {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
        </Text>
      </Flex>

      <Text color="gray.300" fontSize="xl" marginLeft="auto">
        <FaAngleRight />
      </Text>
    </Flex>
  )
}

export default Question
