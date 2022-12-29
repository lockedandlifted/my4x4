import { useEffect, useState } from 'react'
import {
  Button, Flex, Heading, Text,
} from '@chakra-ui/react'

import type { ProjectsPart } from '@prisma/client'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'

type DescriptionProps = {
  editMode: boolean,
  projectsPart: ProjectsPart,
}

const Description = (props: DescriptionProps) => {
  const { editMode = false, projectsPart } = props

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(false)
  }, [projectsPart?.updatedAt])

  if (!editMode && !projectsPart?.description) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">About the Part</Heading>
      </Flex>

      {editing && (
        <Form.Field label="Description" name="description">
          <textarea style={{ height: 200 }} />
        </Form.Field>
      )}

      {!editing && !!projectsPart?.description && (
        <>
          <Paragraph>
            {projectsPart?.description}
          </Paragraph>

          {editMode && (
            <Text cursor="pointer" fontWeight="bold" onClick={() => setEditing(!editing)} marginTop={4}>
              Edit Description
            </Text>
          )}
        </>
      )}

      {editMode && !editing && !projectsPart?.description && (
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
