import { Flex, Heading, Text } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

type ProjectsPartWithManufacturer = Prisma.ProjectsPartGetPayload<{
  include: {
    manufacturerPart: {
      include: {
        category: true,
        manufacturer: true,
      },
    },
  },
}>

type OverviewProps = {
  projectsPart: ProjectsPartWithManufacturer,
}

const Overview = (props: OverviewProps) => {
  const { projectsPart } = props

  return (
    <Flex
      alignItems="center"
      backgroundColor="blackAlpha.900"
      borderRadius="xl"
      paddingX={8}
      paddingY={12}
    >
      <Flex justifyContent="center" flexDirection="column">
        <Heading color="white" size="md">
          {projectsPart?.manufacturerPart?.manufacturer?.title}
        </Heading>

        <Text color="white" fontSize="sm">{projectsPart?.manufacturerPart?.title}</Text>

        {!!projectsPart?.installedAt && (
          <Text color="gray.400" fontSize="sm">
            Installed: {projectsPart.installedAt.toLocaleDateString('en-AU')}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default Overview
