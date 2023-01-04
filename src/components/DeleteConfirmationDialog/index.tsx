import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

type DeleteConfirmationDialogProps = {
  callbacks: {
    closeDialog: VoidFunction,
    confirmAction?: VoidFunction,
  },
  isOpen: boolean,
  title: string,
}

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {
  const {
    callbacks: { closeDialog, confirmAction }, isOpen, title,
  } = props

  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeDialog}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title || 'Confirm Action'}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeDialog}>
              Cancel
            </Button>

            <Button colorScheme="red" onClick={confirmAction} marginLeft={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteConfirmationDialog
