import { Button, Flex } from '@chakra-ui/react'

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
    <Flex borderTopWidth={1} direction="column" {...boxProps}>
      {!!deleteImage && (
        <Button colorScheme="red" onClick={deleteImage}>
          Delete Image
        </Button>
      )}
    </Flex>
  )
}

export default Actions
