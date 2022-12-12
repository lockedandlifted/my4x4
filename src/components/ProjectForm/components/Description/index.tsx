import { Button, Flex, Heading } from '@chakra-ui/react'

import Form from '@components/Form'

import type { Project } from '@prisma/client'

type DescriptionProps = {
  project: Project,
}

const Description = (props: DescriptionProps) => {
  const { project } = props

  return (
    <Flex flexDirection="column" marginTop="8">
      <Heading size="md" marginBottom="4">About the Build</Heading>

      <Form.Field label="Description" name="description">
        <textarea style={{ height: 200 }} />
      </Form.Field>

      <Form.Actions>
        <Button colorScheme="green" size="sm" type="submit">
          Save
        </Button>
      </Form.Actions>
    </Flex>
  )
}

export default Description
