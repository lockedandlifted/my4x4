import {
  Alert,
  AlertDescription,
  Flex,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectTile from '@components/ProjectTile'

import Tags from '../Tags'

type SimilarProjectsProps = {
  project: Project,
}

const SimilarProjects = (props: SimilarProjectsProps) => {
  const { project } = props

  const similarProjectsQuery = trpc.projects.getSimilarProjects.useQuery({
    projectId: project?.id,
  }, { enabled: !!project?.id })

  const { data: similarProjects = [] } = similarProjectsQuery

  return (
    <Flex direction="column" marginTop="8">
      <Heading size="sm">
        Similar Builds
      </Heading>

      <Tags marginTop="4" project={project} />

      {!similarProjects.length && (
        <Alert
          borderRadius="xl"
          marginTop={4}
          padding={8}
          status="success"
          variant="subtle"
        >
          <Flex alignItems="flex-start" direction="column">
            <AlertDescription>
              We don&apos;t have any similar builds to show. Have you got a {project?.manufacturerModel?.manufacturer?.title} {project?.manufacturerModel?.title} or know someone with one you want the details of? If so, Add a New Build below.
            </AlertDescription>
          </Flex>
        </Alert>
      )}

      <SimpleGrid
        columns={2}
        gridTemplateColumns="repeat(auto-fill, minmax(40%, 1fr))"
        marginTop="4"
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
