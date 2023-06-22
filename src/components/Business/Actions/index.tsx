import {
  Button, Flex, Heading, useDisclosure,
} from '@chakra-ui/react'

import useBusinessForm from '@hooks/useBusinessForm'

import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog'

import type { Business } from '@prisma/client'

type ActionsProps = {
  business: Business,
}

const Actions = (props: ActionsProps) => {
  const {
    business,
  } = props

  const businessFormPayload = useBusinessForm({ business })
  const {
    callbacks: {
      deleteBusiness,
    },
  } = businessFormPayload

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading marginBottom="4" size="sm">
        Actions
      </Heading>

      <Button
        as="a"
        colorScheme="red"
        cursor="pointer"
        onClick={onOpen}
        size="lg"
      >
        Delete Business
      </Button>

      <DeleteConfirmationDialog
        callbacks={{
          closeDialog: onClose,
          confirmAction: deleteBusiness,
        }}
        isOpen={isOpen}
        title="Delete Business?"
      />
    </Flex>
  )
}

export default Actions
