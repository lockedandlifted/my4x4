import { useSession } from 'next-auth/react'

import { Flex, Text } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import { trpc } from '@utils/trpc'

import UserImage from '@components/UserImage'

type AddCommentProps = {
  href: string,
}

const AddComment = (props: AddCommentProps) => {
  const { href } = props

  const { data: sessionData } = useSession()

  const userQuery = trpc.users.getUserById.useQuery({
    id: sessionData?.user?.id,
  }, { enabled: !!sessionData?.user?.id })

  const { data: user } = userQuery

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
      <UserImage height={30} width={30} user={user} />

      <Flex direction="column" marginLeft="2">
        <Text fontWeight="medium" noOfLines={1}>
          Add Comment
        </Text>
      </Flex>

      <Text color="gray.300" fontSize="xl" marginLeft="auto">
        <FaAngleRight />
      </Text>
    </Flex>
  )
}

export default AddComment
