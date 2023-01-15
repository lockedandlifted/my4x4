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

import type { Project } from '@prisma/client'

import useProjectsExternalLinkForm from '@hooks/useProjectsExternalLinkForm'

import Form from '@components/Form'

type CreateOrEditProjectExternalLinkModalProps = {
  callbacks: {
    closeModal: VoidFunction,
    createProjectsExternalLink: (data: object) => void,
  },
  project: Project,
  showModal: boolean,
}

const CreateOrEditProjectExternalLinkModal = (props: CreateOrEditProjectExternalLinkModalProps) => {
  const { callbacks: { closeModal, createProjectsExternalLink }, project, showModal } = props

  const projectsExternalLink = { projectId: project?.id }
  const newRecord = !projectsExternalLink.id

  const projectsExternalLinkFormPayload = useProjectsExternalLinkForm({ projectsExternalLink })
  const {
    callbacks: {
      createProjectsExternalLink: createFn,
      updateProjectsExternalLink: updateFn,
    },
    formPayload,
    mutations: {
      createProjectsExternalLink: {
        isLoading,
      },
    },
  } = projectsExternalLinkFormPayload

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
                createProjectsExternalLink({ ...processCallbackPayload, actionPayload: data })
              },
            }}
            formPayload={formPayload}
            id="projects-external-link-form"
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
            form="projects-external-link-form"
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

export default CreateOrEditProjectExternalLinkModal
