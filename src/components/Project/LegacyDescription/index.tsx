import { useEffect, useState } from 'react'
import {
  Button, Flex, Heading, Text,
} from '@chakra-ui/react'
import { FaPen } from 'react-icons/fa'

import AddedByCommunityNotice from '@components/Project/AddedByCommunityNotice'
import Form from '@components/Form'
import Paragraph from '@components/Paragraph'

import type { Project } from '@prisma/client'

type LegacyDescriptionProps = {
  editMode: boolean,
  project: Project,
}

const LegacyDescription = (props: LegacyDescriptionProps) => {
  const { editMode = false, project } = props

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(false)
  }, [project?.updatedAt])

  if (!editMode && !project?.description && project?.createdByOwner) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">About the Build</Heading>
      </Flex>

      <AddedByCommunityNotice project={project} />

      {editing && (
        <Form.Field label="Description" name="description">
          <textarea style={{ height: 200 }} />
        </Form.Field>
      )}

      {!editing && !!project?.description && (
        <>
          <Paragraph>
            {project?.description}
          </Paragraph>

          {editMode && (
            <Text
              alignItems="center"
              as="span"
              color="blue.500"
              cursor="pointer"
              display="flex"
              fontWeight="bold"
              onClick={() => setEditing(!editing)}
              marginTop={4}
            >
              <FaPen style={{ marginRight: 8 }} /> Edit Description
            </Text>
          )}
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

export default LegacyDescription
