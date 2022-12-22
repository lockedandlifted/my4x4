import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

type SimilarProjectsProps = {
  project: Project,
}

const SimilarProjects = (props: SimilarProjectsProps) => {
  const { project } = props

  const similarProjectsQuery = trpc.projects.getSimilarProjects.useQuery({
    projectId: project?.id,
  }, { enabled: !!project?.id })

  const { data: similarProjects = [] } = similarProjectsQuery

  if (!similarProjects.length) {
    return null
  }

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="md" marginBottom="4">
        Similar Builds
      </Heading>

      <SimpleGrid
        columns={2}
        gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
        spacing="4"
      >
        {similarProjects.map(similarProject => (
          <ProjectTile compact key={similarProject.id} project={similarProject} />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default SimilarProjects
