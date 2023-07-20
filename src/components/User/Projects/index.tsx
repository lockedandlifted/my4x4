import {
  Button, Flex, Heading, SimpleGrid,
} from '@chakra-ui/react'

import type { User } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

type ProjectsProps = {
  editMode: boolean,
  user: User,
}

const Projects = (props: ProjectsProps) => {
  const { editMode = false, user } = props

  // Query
  const projectsQuery = trpc.projects.getProjects.useQuery({
    includeUnpublished: true,
    userId: user?.id,
  }, { enabled: !!user?.id })

  const { data: projects = [] } = projectsQuery

  const unpublishedProjects = projects.filter(p => !p.published)
  const publishedProjects = projects.filter(p => p.published)

  return (
    <Flex flexDirection="column" marginTop={8}>
      {!!unpublishedProjects.length && (
        <>
          <Flex justifyContent="space-between">
            <Heading size="md" marginBottom="4">Unpublished Builds</Heading>
          </Flex>

          <SimpleGrid
            columns={2}
            gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
            marginBottom={8}
            spacing="4"
          >
            {unpublishedProjects.map(project => (
              <ProjectTile compact editMode={editMode} key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </>
      )}

      {!!publishedProjects.length && (
        <>
          <Flex justifyContent="space-between">
            <Heading size="md" marginBottom="4">Published Builds</Heading>
          </Flex>

          <SimpleGrid
            columns={2}
            gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
            spacing="4"
          >
            {publishedProjects.map(project => (
              <ProjectTile compact editMode={editMode} key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </>
      )}

      {editMode && (
        <Button
          as="a"
          href="/projects/new"
          marginTop={2}
          size="lg"
        >
          New Build
        </Button>
      )}
    </Flex>
  )
}

export default Projects
