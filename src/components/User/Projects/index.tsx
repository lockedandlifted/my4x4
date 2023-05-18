import {
  Button, Flex, Heading, SimpleGrid,
} from '@chakra-ui/react'

import type { User } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

type ProjectsProps = {
  editMode: boolean,
  temporaryUserId: string,
  user: User,
}

const Projects = (props: ProjectsProps) => {
  const { editMode = false, temporaryUserId, user } = props

  // Query
  const projectsQuery = trpc.projects.getProjects.useQuery({
    includeUnpublished: true,
    userId: user?.id,
  }, { enabled: !!user?.id })

  const { data: projects = [] } = projectsQuery

  const claimProjectsMutation = trpc.projects.claimProjectsByTemporaryUserId.useMutation()
  const { mutate: claimProjects } = claimProjectsMutation

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">Unpublished Builds</Heading>
      </Flex>

      <SimpleGrid
        columns={2}
        gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
        marginBottom={8}
        spacing="4"
      >
        {projects.filter(p => !p.published).map(project => (
          <ProjectTile compact editMode={editMode} key={project.id} project={project} />
        ))}
      </SimpleGrid>

      <Flex justifyContent="space-between">
        <Heading size="md" marginBottom="4">Published Builds</Heading>
      </Flex>

      <SimpleGrid
        columns={2}
        gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
        spacing="4"
      >
        {projects.filter(p => p.published).map(project => (
          <ProjectTile compact editMode={editMode} key={project.id} project={project} />
        ))}
      </SimpleGrid>

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
