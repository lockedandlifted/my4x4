import { Flex, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'

type ProjectFormProps = {
  project?: Project,
}

const ProjectForm = (props: ProjectFormProps) => {
  const { project } = props

  return (
    <Flex width="100%">
      <Form>
        <Heading fontWeight="medium" size="lg">
          {project?.id ? 'Edit' : 'Add'} Your Build
        </Heading>

        <Paragraph marginTop={Form.Field.MARGIN_TOP}>
          My 4x4 was built to give everyone a place to add their builds, parts and car history to show it off, or keep a record for yourself.
        </Paragraph>

        <Form.Field label="Manufacturer" marginTop={Form.Field.MARGIN_TOP}>
          <select>
            <option value="">Please Select...</option>
          </select>
        </Form.Field>

        <Form.Field label="Model" marginTop={Form.Field.MARGIN_TOP}>
          <select>
            <option value="">Please Select...</option>
          </select>
        </Form.Field>

        <Form.Field label="Series" marginTop={Form.Field.MARGIN_TOP}>
          <select>
            <option value="">Please Select...</option>
          </select>
        </Form.Field>

        <Form.Field
          label="Year"
          labelRight={(
            <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
          )}
          marginTop={Form.Field.MARGIN_TOP}
        >
          <select>
            <option value="">Please Select...</option>
          </select>
        </Form.Field>

        <Form.Field
          label="Colour"
          labelRight={(
            <Form.Field.LabelRight>Optional</Form.Field.LabelRight>
          )}
          marginTop={Form.Field.MARGIN_TOP}
        >
          <input />
        </Form.Field>
      </Form>
    </Flex>
  )
}

export default ProjectForm
