import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

const RecentProjects = () => {
  const projectsQuery = trpc.projects.getRecentProjects.useQuery({
    limit: 10,
  })
  const { data: projects } = projectsQuery

  return (
    <Flex direction="column" marginTop={16}>
      <Heading size="md" marginBottom={4}>
        Recently Updated
      </Heading>

      <SimpleGrid
        columns={2}
        gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
        spacing="4"
      >
        {projects?.map(project => (
          <ProjectTile compact key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default RecentProjects
