import { useEffect, useState } from 'react'
import {
  Button, Flex, Heading, Text,
} from '@chakra-ui/react'
import { FaPen } from 'react-icons/fa'

import type { Image } from '@prisma/client'

import useImageForm from '@hooks/useImageForm'

import Form from '@components/Form'
import Paragraph from '@components/Paragraph'

type DetailsProps = {
  callbacks: {
    onUpdateSuccess: (data: object) => void,
  },
  editMode: boolean,
  image: Image,
}

const Details = (props: DetailsProps) => {
  const { callbacks: { onUpdateSuccess }, editMode = false, image } = props

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(false)
  }, [image?.updatedAt])

  const imageFormPayload = useImageForm({
    callbacks: {
      onUpdateSuccess,
    },
    image,
  })
  const { callbacks: { updateImage }, formPayload } = imageFormPayload

  if (!editMode && !image?.description) {
    return null
  }

  return (
    <Form callbacks={{ submitForm: data => updateImage(data) }} formPayload={formPayload}>
      <Flex flexDirection="column" marginTop={8}>
        <Heading size="md" marginBottom={4}>{image?.title || image?.originalFilename}</Heading>

        {editing && (
          <>
            <Form.Field label="Title" name="title">
              <input />
            </Form.Field>

            <Form.Field label="Description" name="description" marginTop={4}>
              <textarea style={{ height: 200 }} />
            </Form.Field>
          </>
        )}

        {!editing && !!image?.description && (
          <>
            <Paragraph>
              {image?.description}
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
                <FaPen style={{ marginRight: 8 }} /> Edit Image Details
              </Text>
            )}
          </>
        )}

        {editMode && !editing && !image?.description && (
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
    </Form>
  )
}

export default Details
