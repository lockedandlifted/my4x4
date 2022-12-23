import { useRouter } from 'next/router'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'
import Description from '@components/ProjectsPart/Description'
import Links from '@components/ProjectsPart/Links'
import ProjectsWithPart from '@components/ProjectsPart/ProjectsWithPart'

const ProjectPartsPage = () => {
  const { query: { projectSlug, projectPartId } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  const projectsPartQuery = trpc.projectsParts.getProjectsPartById.useQuery({
    id: projectPartId || '',
    include: {
      manufacturerPart: {
        include: {
          manufacturer: true,
        },
      },
    },
  }, { enabled: !!projectPartId })

  const { data: projectsPart } = projectsPartQuery

  return (
    <MobileLayout>
      <BackToProjectButton project={project} />

      <Flex direction="column">
        <Flex
          alignItems="center"
          borderWidth={1}
          borderRadius="xl"
          padding={2}
        >
          <Flex backgroundColor="gray.200" borderRadius="xl" height={16} width={16} />

          <Flex justifyContent="center" flexDirection="column" marginLeft={4}>
            <Heading size="small">
              {projectsPart?.manufacturerPart.manufacturer?.title}
            </Heading>

            <Text>{projectsPart?.manufacturerPart.title}</Text>
          </Flex>
        </Flex>

        <Description projectsPart={projectsPart} />
        <Links projectsPart={projectsPart} />
        <ProjectsWithPart projectsPart={projectsPart} />
      </Flex>
    </MobileLayout>
  )
}

export default ProjectPartsPage
