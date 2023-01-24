import {
  Button, Flex, Heading, useDisclosure,
} from '@chakra-ui/react'

import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog'

type ActionsProps = {
  boxProps?: object,
  callbacks?: {
    deleteProjectsPart?: VoidFunction,
  },
}

const Actions = (props: ActionsProps) => {
  const { boxProps, callbacks } = props
  const { deleteProjectsPart } = callbacks || {}

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Flex direction="column" {...boxProps}>
      <Heading size="md">Actions</Heading>

      {!!deleteProjectsPart && (
        <Button colorScheme="red" onClick={onOpen} marginTop={2}>
          Delete Part
        </Button>
      )}

      <DeleteConfirmationDialog
        callbacks={{
          closeDialog: onClose,
          confirmAction: deleteProjectsPart,
        }}
        isOpen={isOpen}
        title="Delete Part?"
      />
    </Flex>
  )
}

export default Actions
