import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'

type CreateOrEditProjectAttributeModalProps = {
  callbacks: {
    closeModal: VoidFunction,
  },
  showModal: boolean,
}

const CreateOrEditProjectAttributeModal = (props: CreateOrEditProjectAttributeModalProps) => {
  const { callbacks: { closeModal }, showModal } = props

  return (
    <Drawer
        isOpen={showModal}
        placement="bottom"
        onClose={closeModal}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create Attribute</DrawerHeader>

          <DrawerBody>
            <input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter borderTopWidth={1}>
            <Button variant="outline" mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="green">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}

export default CreateOrEditProjectAttributeModal
