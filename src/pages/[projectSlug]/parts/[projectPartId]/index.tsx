import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'

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
        <Text>{projectsPart?.manufacturerPart?.manufacturer?.title}</Text>
        <Text>{projectsPart?.manufacturerPart?.title}</Text>

        <Text>Description</Text>
        <Text>Links</Text>

        <Text>Builds with this Part:</Text>
      </Flex>
    </MobileLayout>
  )
}

export default ProjectPartsPage
