import { useState } from 'react'
import {
  Button, Flex, Heading, Link,
} from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

import Attribute from './Attribute'

const ATTRIBUTE_LIMIT = 4

type ProjectWithAttributes = Prisma.ProjectGetPayload<{
  include: {
    projectsAttributes: {
      include: {
        attribute: true,
        attributeValue: true,
      },
    },
  },
}>

type AttributesProps = {
  editMode?: boolean,
  project: ProjectWithAttributes,
}

const Attributes = (props: AttributesProps) => {
  const { editMode = false, project } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const projectsAttributes = project?.projectsAttributes || []
  const hasAttributes = projectsAttributes.length > 0

  const filteredProjectsAttributes = !isExpanded ? projectsAttributes.slice(0, ATTRIBUTE_LIMIT) : projectsAttributes

  return (
    <>
      <Heading size="sm" marginTop={8}>Attributes</Heading>

      {hasAttributes && (
        <Flex
          backgroundColor="gray.50"
          borderColor="gray.200"
          borderWidth={1}
          borderRadius="xl"
          flexDirection="column"
          marginTop={4}
          padding={4}
        >
          {filteredProjectsAttributes.map((projectsAttribute, index) => {
            const {
              attribute, attributeValue, id, value,
            } = projectsAttribute

            const last = filteredProjectsAttributes.length === (index + 1)

            return (
              <Attribute
                key={id}
                attribute={attribute}
                last={last}
                value={attributeValue?.title || value}
              />
            )
          })}

          {projectsAttributes.length > ATTRIBUTE_LIMIT && (
            <Link fontWeight="bold" onClick={() => setIsExpanded(!isExpanded)} marginTop="2">
              {isExpanded ? 'Show Less' : 'Show More'}
            </Link>
          )}
        </Flex>
      )}

      {editMode && (
        <Button
          as="a"
          colorScheme="gray"
          href={`/projects/${project?.id}/edit/details`}
          marginTop="4"
          size="lg"
          width="auto"
        >
          Edit Attributes
        </Button>
      )}
    </>

  )
}

export default Attributes
