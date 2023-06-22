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
      borderTopWidth="1px"
      borderStyle="dashed"
      direction="column"
      marginTop="8"
      paddingTop="8"
      width="100%"
    >
      <Heading as="h1" fontWeight="medium" marginBottom="8" size="lg">
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
