import { Button, Flex, Input } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import { trpc } from '@utils/trpc'

import UserImage from '@components/UserImage'

type AddCommentBoxProps = {
  callbacks: {
    addComment: (comment: string) => void,
    setValue: (value: string) => void,
  },
  value: string,
}

const AddCommentBox = (props: AddCommentBoxProps) => {
  const {
    callbacks: {
      addComment,
      setValue,
    },
    value,
  } = props

  const { data: sessionData } = useSession()

  const userQuery = trpc.users.getUserById.useQuery({
    id: sessionData?.user?.id,
  }, { enabled: !!sessionData?.user?.id })

  const { data: user } = userQuery

  if (!user) {
    return null
  }

  return (
    <Flex width="100%">
      <UserImage user={user} />

      <Flex
        backgroundColor="gray.50"
        borderRadius="xl"
        marginLeft="2"
        padding="4"
        width="calc(100% - 40px - 0.5rem)"
      >
        <Input
          placeholder="Enter your reply"
          onChange={e => setValue(e.target.value)}
          value={value}
          variant="unstyled"
        />

        <Button
          colorScheme="blue"
          isDisabled={!value}
          onClick={() => addComment(value)}
          size="sm"
          width="auto"
        >
          Send
        </Button>
      </Flex>
    </Flex>
  )
}

export default AddCommentBox
