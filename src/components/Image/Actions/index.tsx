import {
  Button, Flex, Heading, useDisclosure,
} from '@chakra-ui/react'

import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog'

type ActionsProps = {
  boxProps?: object,
  callbacks?: {
    deleteImage?: VoidFunction,
    setImageAsDefault?: VoidFunction,
  },
}

const Actions = (props: ActionsProps) => {
  const { boxProps, callbacks } = props
  const { deleteImage, setImageAsDefault } = callbacks || {}

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Flex direction="column" {...boxProps}>
      <Heading size="md">Actions</Heading>

      {!!setImageAsDefault && (
        <Button colorScheme="gray" onClick={setImageAsDefault} marginTop={2}>
          Set Image as Default
        </Button>
      )}

      {!!deleteImage && (
        <Button colorScheme="red" onClick={onOpen} marginTop={2}>
          Delete Image
        </Button>
      )}

      <DeleteConfirmationDialog
        callbacks={{
          closeDialog: onClose,
          confirmAction: deleteImage,
        }}
        isOpen={isOpen}
        title="Delete Image?"
      />
    </Flex>
  )
}

export default Actions
