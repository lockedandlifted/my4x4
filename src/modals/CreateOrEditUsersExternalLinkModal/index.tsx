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

import type { User } from '@prisma/client'

import useUsersExternalLinkForm from '@hooks/useUsersExternalLinkForm'

import Form from '@components/Form'

type CreateOrEditUsersExternalLinkModalProps = {
  callbacks: {
    closeModal: VoidFunction,
    createUsersExternalLink: (data: object) => void,
  },
  showModal: boolean,
  user: User,
}

const CreateOrEditUsersExternalLinkModal = (props: CreateOrEditUsersExternalLinkModalProps) => {
  const { callbacks: { closeModal, createUsersExternalLink }, showModal, user } = props

  const usersExternalLink = { userId: user?.id }
  const newRecord = !usersExternalLink.id

  const usersExternalLinkFormPayload = useUsersExternalLinkForm({ usersExternalLink })
  const {
    callbacks: {
      createUsersExternalLink: createFn,
      updateUsersExternalLink: updateFn,
    },
    formPayload,
    mutations: {
      createUsersExternalLink: {
        isLoading,
      },
    },
  } = usersExternalLinkFormPayload

  const saveFn = newRecord ? createFn : updateFn

  const processCallbackPayload = {
    action: saveFn,
    afterAction: closeModal,
  }

  return (
    <Drawer
      isOpen={showModal}
      placement="right"
      size="xl"
      onClose={closeModal}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{newRecord ? 'Add' : 'Update'} a Link</DrawerHeader>

        <DrawerBody>
          <Form
            callbacks={{
              submitForm: (data) => {
                createUsersExternalLink({ ...processCallbackPayload, actionPayload: data })
              },
            }}
            formPayload={formPayload}
            id="user-external-link-form"
          >
            <Form.Field label="Title" name="title" validationRules={{ required: true }}>
              <input />
            </Form.Field>

            <Form.Field label="URL" marginTop={4} name="url" validationRules={{ required: true }}>
              <input />
            </Form.Field>
          </Form>
        </DrawerBody>

        <DrawerFooter borderTopWidth={1}>
          <Button variant="outline" mr={3} onClick={closeModal}>
            Cancel
          </Button>

          <Button
            colorScheme="green"
            form="user-external-link-form"
            isDisabled={isLoading}
            isLoading={isLoading}
            type="submit"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateOrEditUsersExternalLinkModal
