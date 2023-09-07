import { Button, Flex, Textarea } from '@chakra-ui/react'
import useSession from '@hooks/useSession'

import { trpc } from '@utils/trpc'

import UserImage from '@components/UserImage'

type AddQuestionBoxProps = {
  callbacks: {
    createPost: (post: string) => void,
    setInputValue: (inputValue: string) => void,
  },
  isLoading: boolean,
  inputValue: string,
}

const AddQuestionBox = (props: AddQuestionBoxProps) => {
  const {
    callbacks: {
      createPost,
      setInputValue,
    },
    inputValue,
    isLoading,
  } = props

  const { user } = useSession({ includeUser: true })

  if (!user) {
    return null
  }

  return (
    <Flex marginTop="8" width="100%">
      <UserImage user={user} />

      <Flex
        backgroundColor="gray.50"
        borderRadius="xl"
        direction="column"
        marginLeft="2"
        padding="4"
        width="calc(100% - 40px - 0.5rem)"
      >
        <Textarea
          height="130px"
          placeholder="Ask a Question"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
          variant="unstyled"
        />

        <Flex borderTopWidth="1px" justifyContent="flex-end" marginTop="2" paddingTop="4">
          <Button
            colorScheme="blue"
            isDisabled={!inputValue}
            isLoading={isLoading}
            onClick={() => createPost(inputValue)}
            size="sm"
            width="auto"
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AddQuestionBox
