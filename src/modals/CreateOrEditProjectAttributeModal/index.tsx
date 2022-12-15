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

import Form from '@components/Form'

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
      placement="right"
      size="full"
      onClose={closeModal}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create Attribute</DrawerHeader>

        <DrawerBody>
          <Form callbacks={{ submitForm: data => console.log(data) }} formPayload={{}}>
            <Form.Field label="Name" name="name">
              <input placeholder="Type here..." />
            </Form.Field>

            <Form.Field label="Value" name="value">
              <input placeholder="Type here..." />
            </Form.Field>
          </Form>
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
