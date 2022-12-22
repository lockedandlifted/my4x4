import { useEffect, useState } from 'react'
import {
  Button, Flex, Heading, Text,
} from '@chakra-ui/react'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'

import type { Project } from '@prisma/client'

type DescriptionProps = {
  editMode: boolean,
  project: Project,
}

const Description = (props: DescriptionProps) => {
  const { editMode = false, project } = props

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(false)
  }, [project?.updatedAt])

  if (!editMode && !project?.description) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop="8">
      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">About the Build</Heading>
      </Flex>

      {editing && (
        <Form.Field label="Description" name="description">
          <textarea style={{ height: 200 }} />
        </Form.Field>
      )}

      {editMode && !editing && !!project?.description && (
        <>
          <Paragraph>
            {project?.description}
          </Paragraph>

          <Text cursor="pointer" fontWeight="bold" onClick={() => setEditing(!editing)} marginTop={4}>
            Edit Description
          </Text>
        </>
      )}

      {editMode && !editing && !project?.description && (
        <Flex alignItems="center" borderWidth={1} borderRadius="xl" flexDirection="column" padding={4}>
          <Text>No description added yet.</Text>
          <Text cursor="pointer" fontWeight="bold" onClick={() => setEditing(!editing)}>Add One!</Text>
        </Flex>
      )}

      {editing && (
        <Form.Actions>
          <Button
            onClick={() => setEditing(!editing)}
            marginRight={2}
            size="sm"
          >
            Cancel
          </Button>

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
