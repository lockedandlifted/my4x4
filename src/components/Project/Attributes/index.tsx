import { useState } from 'react'
import { Flex, Heading, Link } from '@chakra-ui/react'

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
  project: ProjectWithAttributes,
}

const Attributes = (props: AttributesProps) => {
  const { project } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const projectsAttributes = project?.projectsAttributes || []

  const filteredProjectsAttributes = !isExpanded ? projectsAttributes.slice(0, ATTRIBUTE_LIMIT) : projectsAttributes

  return (
    <>
      <Heading size="sm" marginTop={8}>Attributes</Heading>
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
    </>

  )
}

export default Attributes
