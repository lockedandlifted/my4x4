import {
  Alert, AlertDescription, AlertIcon, Button, Divider, Flex, Heading, Text,
} from '@chakra-ui/react'
import { FaGlobeAsia } from 'react-icons/fa'

import type { Project } from '@prisma/client'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'
import SectionDivider from '@components/SectionDivider'

import useProjectForm from '@hooks/useProjectForm'

import Attributes from './components/Attributes'

type ProjectFormProps = {
  project?: Project,
  temporaryUserId?: string,
}

const ProjectForm = (props: ProjectFormProps) => {
  const { project, temporaryUserId } = props

  const projectFormPayload = useProjectForm({ project, temporaryUserId })
  const {
    attributes,
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
          {project?.id ? 'Edit' : 'Add'} {createdByOwner ? 'your' : 'this'} Build
        </Heading>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          You can upload your own builds, or builds you like.
        </Paragraph>

        {!createdByOwner && (
          <Alert
            borderRadius="xl"
            marginTop={4}
            padding={8}
            status="warning"
            variant="subtle"
          >
            <AlertIcon />

            <AlertDescription>
              If you upload a build on behalf of someone else you <strong>may lose the ability to edit</strong> it if
              the owner claims the build and verifies it.
            </AlertDescription>
          </Alert>
        )}

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

        <SectionDivider>VEHICLE</SectionDivider>

        <Alert
          borderRadius="xl"
          padding={8}
          status="info"
          variant="subtle"
        >
          <AlertIcon />

          <AlertDescription>
            These details will help other users find your build.

            If you change to a new vehicle you don&apos;t need to change these details,
            simply create a new build so that the current build history is retained.
          </AlertDescription>
        </Alert>

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
          <Attributes projectFormPayload={projectFormPayload} />
        )}

        {!!project?.id && (
          <>
            <SectionDivider>SHARING</SectionDivider>

            <Alert
              borderRadius="xl"
              padding={8}
              status="info"
              variant="subtle"
            >
              <AlertIcon />

              <AlertDescription>
                Reserve a unique url so that people can easily find your build.
              </AlertDescription>
            </Alert>

            <Form.Field
              label="Title"
              marginTop={Form.Field.MARGIN_TOP}
              name="title"
              validationRules={{ required: true }}
            >
              <input />
            </Form.Field>

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
