import {
  Button, Flex, Heading, useDisclosure,
} from '@chakra-ui/react'

import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog'

type ActionsProps = {
  boxProps?: object,
  callbacks?: {
    deleteProjectsPart?: VoidFunction,
    updateProjectsPart?: VoidFunction,
  },
}

const Actions = (props: ActionsProps) => {
  const { boxProps, callbacks } = props
  const { deleteProjectsPart, updateProjectsPart } = callbacks || {}

  const { isOpen: isDeleteOpen, onClose: onDeleteClose, onOpen: onDeleteOpen } = useDisclosure()
  const { isOpen: isUpdateOpen, onClose: onUpdateClose, onOpen: onUpdateOpen } = useDisclosure()

  return (
    <Flex direction="column" {...boxProps}>
      <Heading size="md">Actions</Heading>

      {!!updateProjectsPart && (
        <Button onClick={onUpdateOpen} marginTop={2} variant="outline">
          Remove Part
        </Button>
      )}

      {!!deleteProjectsPart && (
        <Button onClick={onDeleteOpen} marginTop={2} variant="outline">
          Delete Part
        </Button>
      )}

      <DeleteConfirmationDialog
        callbacks={{
          closeDialog: onDeleteClose,
          confirmAction: deleteProjectsPart,
        }}
        isOpen={isDeleteOpen}
        title="Delete Part?"
      />

      <DeleteConfirmationDialog
        callbacks={{
          closeDialog: onUpdateClose,
          confirmAction: updateProjectsPart,
        }}
        isOpen={isUpdateOpen}
        title="Remove Part?"
      />
    </Flex>
  )
}

export default Actions
