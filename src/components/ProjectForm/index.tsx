import {
  Alert, AlertDescription, Button, Divider, Flex, Heading, Text,
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
    attributes,
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

  console.log('attributes')

  return (
    <Flex marginTop={8} width="100%">
      <Form
        callbacks={{
          submitForm: project?.id ? updateFn : createFn,
        }}
        formPayload={formPayload}
      >
        <Heading fontWeight="medium" size="lg">
          {project?.id ? 'Edit' : 'Add'} {createdByOwner ? 'your' : 'this'} Build
        </Heading>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          You can upload your own builds, or builds you like.
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

        {/* Want to only show alert if createByOwner is not Yes. Help my please */}

        {typeof createdByOwner === 'boolean' && (
        <Alert
          borderRadius="xl"
          marginTop={4}
          marginBottom={4}
          padding={8}
          status="warning"
          variant="subtle"
        >
          <Flex alignItems="flex-start" direction="column">
            <AlertDescription>
              If you upload a build on behalf of someone else you
              <strong>may lose the ability to edit </strong>
              it if the owner claims the build and verifies with us they are the owner.
            </AlertDescription>
          </Flex>
        </Alert>
        )}

        <Flex align="center" marginTop="2">
          <Divider />
          <Text padding="4" fontSize="xs" color="gray.500">VEHICLE</Text>
          <Divider />
        </Flex>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          The build details will help other users search for similar cars.
          {project?.id ? ' Edit' : ' Add'} {createdByOwner ? 'your ' : 'this '}
          builds details to accurately reflect the current details.
        </Paragraph>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          If you're changing to a new car you don't need to change these details,
          just create a new build so the history of the old build remains available for others to view.
        </Paragraph>

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

        {/* Additional Attributes: Should we do click to reveal 'add more details' button for these? */}
        {!!project?.id && (
          <>
            <Flex align="center" marginTop="2">
              <Divider />
              <Text padding="4" fontSize="xs" color="gray.500">DETAILS</Text>
              <Divider />
            </Flex>

            <Form.Field
              label="Tyre Size"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              marginTop={Form.Field.MARGIN_TOP}
              name="attributes.tyre_size"
              validationRules={{ required: false }}
            >
              <input />
            </Form.Field>

            <Form.Field
              label="Odometer"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              marginTop={Form.Field.MARGIN_TOP}
              name="attributes.kilometers"
              validationRules={{ required: false }}
            >
              <input />
            </Form.Field>

            <Form.Field
              label="Badge"
              labelRight={(
                <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
              )}
              marginTop={Form.Field.MARGIN_TOP}
              name="attributes.model_badge"
              validationRules={{ required: false }}
            >
              <input />
            </Form.Field>

            <Form.Field
              label="Body Type"
              marginTop={Form.Field.MARGIN_TOP}
              name="bodyType"
              validationRules={{ required: false }}
            >
              <select>
                <option value="">Please Select...</option>
                {attributes.bodyType.map(attributes => (
                  <option key={attributes.bodyType.id} value={attributes.bodyType.id}>
                    {attributes.bodyType.title}
                  </option>
                ))}
              </select>
            </Form.Field>
          </>
        )}

        {!!project?.id && (
          <>
            <Flex align="center" marginTop="2">
              <Divider />
              <Text padding="4" fontSize="xs" color="gray.500">SHARING</Text>
              <Divider />
            </Flex>

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
