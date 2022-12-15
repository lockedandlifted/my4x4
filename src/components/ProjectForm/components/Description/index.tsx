import { useState } from 'react'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'

import Form from '@components/Form'

import type { Project } from '@prisma/client'

type DescriptionProps = {
  project: Project,
}

const Description = (props: DescriptionProps) => {
  const { project } = props

  const [editing, setEditing] = useState(false)

  return (
    <Flex flexDirection="column" marginTop="8">
      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">About the Build</Heading>
        <Button onClick={() => setEditing(!editing)} size="sm">
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </Flex>

      {editing && (
        <Form.Field label="Description" name="description">
          <textarea style={{ height: 200 }} />
        </Form.Field>
      )}

      {!editing && (
        <Text>
          {project?.description}
        </Text>
      )}

      {editing && (
        <Form.Actions>
          <Button
            colorScheme="green"
            size="sm"
            type="submit"
          >
            Save
          </Button>
        </Form.Actions>
      )}
    </Flex>
  )
}

export default Description
