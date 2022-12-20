import { Button, Flex, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import ProjectsPart from './ProjectsPart'

type PartsProps = {
  callbacks: {
    CreateOrEditProjectPartModal: {
      showModal: VoidFunction,
    },
  },
  project: Project,
}

const Parts = (props: PartsProps) => {
  const {
    callbacks: {
      CreateOrEditProjectPartModal: {
        showModal: showCreateOrEditProjectPartModal,
      },
    },
    project,
  } = props

  const projectsPartsQuery = trpc.projectsParts.getProjectsParts.useQuery(
    { projectId: project?.id, include: { manufacturerPart: { include: { manufacturer: true } } } },
    { enabled: !!project?.id },
  )

  const { data: projectsParts = [] } = projectsPartsQuery

  return (
    <Flex direction="column" marginTop="12">
      <Heading size="md" marginBottom="4">Parts & Upgrades</Heading>

      {projectsParts.map(projectsPart => (
        <ProjectsPart key={projectsPart.id} projectsPart={projectsPart} />
      ))}

      <Button
        colorScheme="blue"
        marginTop="4"
        onClick={() => showCreateOrEditProjectPartModal()}
        size="md"
        width="auto"
      >
        Add Part
      </Button>
    </Flex>
  )
}

export default Parts
