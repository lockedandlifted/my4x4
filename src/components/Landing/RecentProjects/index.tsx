import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

const RecentProjects = () => {
  const projectsQuery = trpc.projects.getRecentProjects.useQuery({
    limit: 4,
  })
  const { data: projects } = projectsQuery

  return (
    <Flex
      direction="column"
      paddingTop="4"
      width="100%"
    >
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
