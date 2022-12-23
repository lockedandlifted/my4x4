import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import type { Prisma } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

type ProjectsPartWithManufacturer = Prisma.ProjectsPartGetPayload<{
  include: {
    manufacturerPart: {
      include: {
        manufacturer: true,
      },
    },
  },
}>

type ProjectsWithPartProps = {
  projectsPart: ProjectsPartWithManufacturer,
}

const ProjectsWithPart = (props: ProjectsWithPartProps) => {
  const { projectsPart } = props

  const projectsWithPartQuery = trpc.projectsParts.getSimilarProjectsWithPartId.useQuery({
    projectsPartId: projectsPart?.id,
  }, { enabled: !!projectsPart?.id })

  const { data: projectsParts = [] } = projectsWithPartQuery

  if (!projectsParts.length) {
    return null
  }

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md" marginBottom="4">
        Builds with this Part
      </Heading>

      <SimpleGrid
        columns={2}
        gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
        spacing="4"
      >
        {projectsParts.map((similarProjectsPart) => {
          const { project } = similarProjectsPart

          return (
            <ProjectTile compact key={similarProjectsPart.id} project={project} />
          )
        })}
      </SimpleGrid>
    </Flex>
  )
}

export default ProjectsWithPart
