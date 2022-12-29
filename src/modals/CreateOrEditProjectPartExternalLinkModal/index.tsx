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

import type { ProjectsPart } from '@prisma/client'

import useProjectPartExternalLinkForm from '@hooks/useProjectPartsExternalLinkForm'

import Form from '@components/Form'

type CreateOrEditProjectPartExternalLinkModalProps = {
  callbacks: {
    closeModal: VoidFunction,
    createProjectPartsExternalLink: (data: object) => void,
  },
  projectsPart: ProjectsPart,
  showModal: boolean,
}

const CreateOrEditProjectPartExternalLinkModal = (props: CreateOrEditProjectPartExternalLinkModalProps) => {
  const { callbacks: { closeModal, createProjectPartsExternalLink }, projectsPart, showModal } = props

  const projectPartsExternalLink = { projectsPartId: projectsPart?.id }
  const newRecord = !projectPartsExternalLink.id

  const projectPartsExternalLinkFormPayload = useProjectPartExternalLinkForm({ projectPartsExternalLink })
  const {
    callbacks: {
      createProjectPartsExternalLink: createFn,
      updateProjectPartsExternalLink: updateFn,
    },
    formPayload: {
      setValue,
    },
    formPayload,
  } = projectPartsExternalLinkFormPayload

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
              submitForm: data => createProjectPartsExternalLink({ ...processCallbackPayload, actionPayload: data }),
            }}
            formPayload={formPayload}
            id="project-part-external-link-form"
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
            form="project-part-external-link-form"
            type="submit"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateOrEditProjectPartExternalLinkModal
