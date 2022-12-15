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

import type { ManufacturerPart } from '@prisma/client'

import useProjectsPartForm from '@hooks/useProjectsPartForm'

import AutocompleteField from '@components/AutocompleteField'
import Form from '@components/Form'

type CreateOrEditProjectPartModalProps = {
  callbacks: {
    closeModal: VoidFunction,
  },
  showModal: boolean,
}

const CreateOrEditProjectPartModal = (props: CreateOrEditProjectPartModalProps) => {
  const { callbacks: { closeModal }, showModal } = props

  const projectsPartFormPayload = useProjectsPartForm({})
  const {
    formPayload: {
      setValue,
    },
    formPayload,
    manufacturerId,
    manufacturers,
    title,
  } = projectsPartFormPayload

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
        <DrawerHeader>Add a Part</DrawerHeader>

        <DrawerBody>
          <Form callbacks={{ submitForm: data => console.log(data) }} formPayload={formPayload}>
            <Form.Field label="Manufacturer" name="manufacturerId" validationRules={{ required: true }}>
              <select>
                <option value="">Please Select...</option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.title}
                  </option>
                ))}
              </select>
            </Form.Field>

            <Form.Field label="Title" name="title" marginTop={4} validationRules={{ required: true }}>
              <AutocompleteField
                callbacks={{
                  selectItem: (result: ManufacturerPart) => {
                    setValue('partNumber', result.partNumber)
                    setValue('manufacturerPartId', result.id)
                    setValue('title', result.title)
                    console.log(result)
                  }
                }}
                inputValue={title}
                routerKey="manufacturerParts"
                queryKey="getManufacturerParts"
                queryParams={{ manufacturerId }}
              />
            </Form.Field>

            <Form.Field label="Model/Part Number" name="partNumber" marginTop={4} validationRules={{ required: false }}>
              <input type="text" />
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

export default CreateOrEditProjectPartModal
