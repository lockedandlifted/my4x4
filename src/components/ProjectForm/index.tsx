import {
  Button, Flex, Heading, Text,
} from '@chakra-ui/react'
import { FaGlobeAsia } from 'react-icons/fa'

import type { Project } from '@prisma/client'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'

import useProjectForm from '@hooks/useProjectForm'

type ProjectFormProps = {
  project?: Project,
  temporaryUserId?: string,
}

const ProjectForm = (props: ProjectFormProps) => {
  const { project, temporaryUserId } = props

  const projectFormPayload = useProjectForm({ project, temporaryUserId })
  const {
    callbacks: {
      createProject: createFn,
      updateProject: updateFn,
    },
    createdByOwner,
    formPayload,
    formPayload: {
      setValue,
    },
    manufacturers,
    manufacturerModels,
    manufacturerModelId,
    manufacturerId,
    mutations: {
      createProject: {
        isLoading,
      },
    },
    projectSlug,
  } = projectFormPayload

  return (
    <Flex marginTop={8} width="100%">
      <Form
        callbacks={{
          submitForm: project?.id ? updateFn : createFn,
        }}
        formPayload={formPayload}
      >
        <Heading fontWeight="medium" size="lg">
          {project?.id ? 'Edit' : 'Add'} a Build
        </Heading>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          My 4x4 was built to give everyone a place to add their builds,
          parts and car history to show it off, or keep a record for yourself.
        </Paragraph>

        <Form.Field
          label="Are you the Owner?"
          marginTop={Form.Field.MARGIN_TOP}
          name="createdByOwner"
          validationRules={{ required: false }}
        >
          <select onChange={e => setValue('createdByOwner', e.target.value === 'true')}>
            <option value="">Please Select...</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </Form.Field>

        {typeof createdByOwner === 'boolean' && (
          <Form.Field
            label="Manufacturer"
            marginTop={Form.Field.MARGIN_TOP}
            name="manufacturerId"
            validationRules={{ required: true }}
          >
            <select>
              <option value="">Please Select...</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.title}
                </option>
              ))}
            </select>
          </Form.Field>
        )}

        {!!manufacturerId && (
          <Form.Field
            label="Model"
            marginTop={Form.Field.MARGIN_TOP}
            name="manufacturerModelId"
            validationRules={{ required: true }}
          >
            <select>
              <option value="">Please Select...</option>
              {manufacturerModels.map(manufacturerModel => (
                <option key={manufacturerModel.id} value={manufacturerModel.id}>
                  {manufacturerModel.title}
                </option>
              ))}
            </select>
          </Form.Field>
        )}

        {!!manufacturerModelId && (
          <>
            <Form.Field
              label="Series"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              marginTop={Form.Field.MARGIN_TOP}
              name="attributes.model_series"
              validationRules={{ required: false }}
            >
              <input />
            </Form.Field>

            <Form.Field
              label="Year"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              marginTop={Form.Field.MARGIN_TOP}
              name="attributes.year_manufactured"
              validationRules={{ required: false }}
            >
              <input type="number" min="1950" max="2099" step="1" />
            </Form.Field>

            <Form.Field
              label="Colour"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              marginTop={Form.Field.MARGIN_TOP}
              name="attributes.colour"
              validationRules={{ required: false }}
            >
              <input />
            </Form.Field>

            <Form.Field
              label="Title"
              marginTop={Form.Field.MARGIN_TOP}
              name="title"
              validationRules={{ required: true }}
            >
              <input />
            </Form.Field>
          </>
        )}

        {!!project?.id && (
          <>
            <Form.Field
              label="Build Url"
              marginTop={Form.Field.MARGIN_TOP}
              name="slug"
              validationRules={{ required: true }}
            >
              <input />
            </Form.Field>

            <Flex
              alignItems="center"
              // backgroundColor="gray.100"
              borderWidth="1px"
              borderRadius="md"
              marginTop="2"
              padding="2"
            >
              <FaGlobeAsia />

              <Text color="gray.400" fontSize={14} fontWeight="bold" marginLeft="2">
                www.my4x4.info/{projectSlug}
              </Text>
            </Flex>
          </>
        )}

        <Button
          colorScheme="green"
          isDisabled={isLoading}
          isLoading={isLoading}
          marginTop="4"
          size="lg"
          type="submit"
        >
          {project?.id ? 'Save Details' : 'Create Build'}
        </Button>
      </Form>
    </Flex>
  )
}

export default ProjectForm
