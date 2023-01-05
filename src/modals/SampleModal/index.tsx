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

import useProjectsPartForm from '@hooks/useProjectsPartForm'

import Form from '@components/Form'

type SampleModalProps = {
  callbacks: {
    closeModal: VoidFunction,
  },
  project: Project,
  showModal: boolean,
}

const SampleModal = (props: SampleModalProps) => {
  const { callbacks: { closeModal, createEntity }, project, showModal } = props

  const projectsPart = { projectId: project?.id }
  const newRecord = !projectsPart.id

  const projectsPartFormPayload = useProjectsPartForm({ projectsPart })
  const {
    callbacks: {
      createProjectsPart: createFn,
      updateProjectsPart: updateFn,
    },
    formPayload: {
      setValue,
    },
    formPayload,
    manufacturers,
  } = projectsPartFormPayload

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
        <DrawerHeader>{newRecord ? 'Add' : 'Update'} a Part</DrawerHeader>

        <DrawerBody>
          <Form
            callbacks={{ submitForm: data => createEntity({ ...processCallbackPayload, actionPayload: data }) }}
            formPayload={formPayload}
            id="entity-form"
          >
            <Form.Field label="Manufacturer" name="manufacturerId" validationRules={{ required: true }}>
              <select>
                <option value="">Please Select...</option>
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.title}
                  </option>
                ))}
              </select>
            </Form.Field>
          </Form>
        </DrawerBody>

        <DrawerFooter borderTopWidth={1}>
          <Button variant="outline" mr={3} onClick={closeModal}>
            Cancel
          </Button>

          <Button
            colorScheme="green"
            form="project-part-form"
            type="submit"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SampleModal
