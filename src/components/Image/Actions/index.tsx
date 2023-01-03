import { Button, Flex, Heading } from '@chakra-ui/react'

type ActionsProps = {
  boxProps?: object,
  callbacks?: {
    deleteImage?: VoidFunction,
  },
}

const Actions = (props: ActionsProps) => {
  const { boxProps, callbacks } = props
  const { deleteImage } = callbacks || {}

  return (
    <Flex direction="column" {...boxProps}>
      <Heading size="md">Actions</Heading>

      {!!deleteImage && (
        <Button colorScheme="red" onClick={deleteImage} marginTop={2}>
          Delete Image
        </Button>
      )}
    </Flex>
  )
}

export default Actions
