import {
  Button, Flex, Input, Textarea,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

import { trpc } from '@utils/trpc'

import UserImage from '@components/UserImage'

type AddCommentBoxProps = {
  callbacks: {
    addComment: (comment: string) => void,
    setInputValue: (inputValue: string) => void,
  },
  compact?: boolean,
  inputValue: string,
  isLoading?: boolean,
  placeholder?: string,
}

const AddCommentBox = (props: AddCommentBoxProps) => {
  const {
    callbacks: {
      addComment,
      setInputValue,
    },
    compact = false,
    inputValue,
    isLoading = false,
    placeholder = 'Enter your reply',
  } = props

  const { data: sessionData } = useSession()

  const userQuery = trpc.users.getUserById.useQuery({
    id: sessionData?.user?.id,
  }, { enabled: !!sessionData?.user?.id })

  const { data: user } = userQuery

  if (!user) {
    return null
  }

  const InputComponent = compact ? Input : Textarea

  return (
    <Flex width="100%">
      <UserImage user={user} />

      <Flex
        backgroundColor="gray.50"
        borderRadius="xl"
        direction={compact ? 'row' : 'column'}
        marginLeft="2"
        padding="4"
        width="calc(100% - 40px - 0.5rem)"
      >
        {compact && (
          <>
            <InputComponent
              placeholder={placeholder}
              onChange={e => setInputValue(e.target.value)}
              value={inputValue}
              variant="unstyled"
            />

            <Button
              colorScheme="blue"
              isDisabled={!inputValue}
              onClick={() => addComment(inputValue)}
              size="sm"
              width="auto"
            >
              Send
            </Button>
          </>
        )}

        {!compact && (
          <>
            <Textarea
              height="130px"
              placeholder={placeholder}
              onChange={e => setInputValue(e.target.value)}
              value={inputValue}
              variant="unstyled"
            />

            <Flex borderTopWidth="1px" justifyContent="flex-end" marginTop="2" paddingTop="4">
              <Button
                colorScheme="blue"
                isDisabled={!inputValue}
                isLoading={isLoading}
                onClick={() => addComment(inputValue)}
                size="sm"
                width="auto"
              >
                Send
              </Button>
            </Flex>
          </>
        )}

      </Flex>
    </Flex>
  )
}

export default AddCommentBox
