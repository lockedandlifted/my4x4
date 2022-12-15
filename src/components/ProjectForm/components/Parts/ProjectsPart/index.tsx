import { Flex, Text } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

type ProjectsPartWithIncludes = Prisma.ProjectsPartGetPayload<{
  include: {
    manufacturerPart: {
      include: {
        manufacturer: true,
      },
    },
  },
}>

type ProjectsPartProps = {
  projectsPart: ProjectsPartWithIncludes,
}

const ProjectsPart = (props: ProjectsPartProps) => {
  const { projectsPart: { manufacturerPart } } = props

  return (
    <Flex>
      <Text fontWeight="bold" marginRight="2">{manufacturerPart?.manufacturer?.title}</Text>
      <Text>{manufacturerPart?.title}</Text>
    </Flex>
  )
}

export default ProjectsPart
