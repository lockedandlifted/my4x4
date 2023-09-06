import useSession from '@hooks/useSession'

import { Flex, Text } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import UserImage from '@components/UserImage'

type AskQuestionProps = {
  href: string,
}

const AskQuestion = (props: AskQuestionProps) => {
  const { href } = props

  const { user } = useSession({ includeUser: true })

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
          Ask a Question
        </Text>
      </Flex>

      <Text color="gray.300" fontSize="xl" marginLeft="auto">
        <FaAngleRight />
      </Text>
    </Flex>
  )
}

export default AskQuestion
