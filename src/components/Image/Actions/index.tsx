import { Button, Flex } from '@chakra-ui/react'

type ActionsProps = {
  callbacks?: {
    deleteImage?: VoidFunction,
  },
}

const Actions = (props: ActionsProps) => {
  const { callbacks } = props
  const { deleteImage } = callbacks || {}

  return (
    <Flex borderTopWidth={1} direction="column">
      {!!deleteImage && (
        <Button colorScheme="red" onClick={deleteImage}>
          Delete Image
        </Button>
      )}
    </Flex>
  )
}

export default Actions
