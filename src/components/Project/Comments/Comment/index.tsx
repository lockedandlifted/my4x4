import { Flex, Text } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import UserImage from '@components/UserImage'

import type { Comment as CommentModel } from '@prisma/client'

type CommentProps = {
  href: string,
  comment: CommentModel,
}

const Comment = (props: CommentProps) => {
  const { href, comment } = props

  return (
    <Flex
      alignItems="center"
      as="a"
      borderBottomStyle="dashed"
      borderBottomWidth="1px"
      href={href}
      marginTop="4"
      paddingBottom="4"
    >
      <UserImage height={30} width={30} user={comment?.user} />

      <Flex alignItems="center" direction="column" marginLeft="2">
        <Text fontWeight="medium">
          {comment?.body}
        </Text>
      </Flex>

      <Text color="gray.300" fontSize="xl" marginLeft="auto">
        <FaAngleRight />
      </Text>
    </Flex>
  )
}

export default Comment
