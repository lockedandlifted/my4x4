import { Flex, Heading } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

import Attribute from './Attribute'

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

  const projectsAttributes = project?.projectsAttributes || []

  return (
    <>
      <Heading size="md" marginTop={8}>Attributes</Heading>
      <Flex
        alignItems="center"
        backgroundColor="blackAlpha.900"
        borderWidth={1}
        borderRadius="xl"
        flexDirection="column"
        marginTop={4}
        padding={4}
      >
        {projectsAttributes.map((projectsAttribute, index) => {
          const {
            attribute, attributeValue, id, value,
          } = projectsAttribute

          const last = projectsAttributes.length === (index + 1)

          return (
            <Attribute
              key={id}
              attribute={attribute}
              last={last}
              value={attributeValue?.title || value}
            />
          )
        })}
      </Flex>
    </>

  )
}

export default Attributes
