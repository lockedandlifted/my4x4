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

import type { ManufacturerPart, Project } from '@prisma/client'

import useProjectsPartForm from '@hooks/useProjectsPartForm'

import AutocompleteField from '@components/AutocompleteField'
import Form from '@components/Form'

type CreateOrEditProjectPartModalProps = {
  callbacks: {
    closeModal: VoidFunction,
  },
  project: Project,
  showModal: boolean,
}

const CreateOrEditProjectPartModal = (props: CreateOrEditProjectPartModalProps) => {
  const { callbacks: { closeModal, createProjectsPart }, project, showModal } = props

  const projectsPart = { projectId: project?.id }
  const newRecord = !projectsPart.id

  const projectsPartFormPayload = useProjectsPartForm({ projectsPart })
  const {
    callbacks: {
      createProjectsPart: createFn,
      updateProjectsPart: updateFn,
    },
    categories,
    formPayload: {
      reset,
      setValue,
    },
    formPayload,
    installedByBusinessName,
    manufacturerId,
    manufacturers,
    title,
  } = projectsPartFormPayload

  const saveFn = newRecord ? createFn : updateFn

  const processCallbackPayload = {
    action: saveFn,
    afterAction: () => {
      closeModal()
      reset()
    },
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
            callbacks={{ submitForm: data => createProjectsPart({ ...processCallbackPayload, actionPayload: data }) }}
            formPayload={formPayload}
            id="project-part-form"
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

            <Form.Field label="Title" name="title" marginTop={4} validationRules={{ required: true }}>
              <AutocompleteField
                callbacks={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue('title', e.target?.value),
                  selectItem: (result: ManufacturerPart) => {
                    setValue('categoryId', result.categoryId || '')
                    setValue('partNumber', result.partNumber || '')
                    setValue('manufacturerPartId', result.id)
                    setValue('title', result.title || '')
                  },
                }}
                inputProps={{
                  value: title,
                }}
                routerKey="manufacturerParts"
                queryKey="getManufacturerParts"
                queryParams={{ manufacturerId }}
              />
            </Form.Field>

            <Form.Field label="Category" name="categoryId" marginTop={4} validationRules={{ required: true }}>
              <select>
                <option value="">Please Select...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </Form.Field>

            <Form.Field
              label="Model/Part Number"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              name="partNumber"
              marginTop={4}
              validationRules={{ required: false }}
            >
              <input type="text" />
            </Form.Field>

            <Form.Field
              label="Description"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              name="description"
              marginTop={4}
              validationRules={{ required: false }}
            >
              <textarea />
            </Form.Field>

            <Form.Field
              label="Installed By"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              name="installedByBusinessId"
              marginTop={4}
              validationRules={{ required: false }}
            >
              <AutocompleteField
                callbacks={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('installedByBusinessName', e.target?.value)
                  },
                  selectItem: (result: ManufacturerPart) => {
                    setValue('installedByBusinessId', result.id)
                    setValue('installedByBusinessName', result.title || '')
                  },
                }}
                inputProps={{
                  value: installedByBusinessName || '',
                }}
                routerKey="businesses"
                queryKey="getBusinesses"
              />
            </Form.Field>

            <Form.Field
              label="Installation Date"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              name="installedAt"
              marginTop={4}
              validationRules={{ required: false }}
            >
              <input type="date" />
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

export default CreateOrEditProjectPartModal
