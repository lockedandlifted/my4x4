import { Button, Flex, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import Part from './Part'

type PartsProps = {
  callbacks?: {
    CreateOrEditProjectPartModal: {
      showModal: VoidFunction,
    },
  },
  editMode?: boolean,
  project: Project,
}

const Parts = (props: PartsProps) => {
  const {
    callbacks,
    editMode = false,
    project,
  } = props

  const { CreateOrEditProjectPartModal } = callbacks || {}

  const projectsPartsQuery = trpc.projectsParts.getProjectsParts.useQuery(
    {
      projectId: project?.id,
      include: {
        manufacturerPart: {
          include: {
            category: true,
            manufacturer: true,
          },
        },
      },
    },
    { enabled: !!project?.id },
  )
  const { data: projectsParts = [] } = projectsPartsQuery

  if (!editMode && !projectsParts.length) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading size="md">Parts</Heading>

      {projectsParts.map((projectsPart) => {
        const { id, manufacturerPart } = projectsPart

        return (
          <Part
            href={editMode ? `/projects/${project?.id}/edit/parts/${id}` : `/${project?.slug}/parts/${id}`}
            key={id}
            manufacturerPart={manufacturerPart}
          />
        )
      })}

      {editMode && (
        <Button
          colorScheme="gray"
          marginTop="4"
          onClick={CreateOrEditProjectPartModal ? () => CreateOrEditProjectPartModal.showModal() : undefined}
          size="lg"
          width="auto"
        >
          Add Part
        </Button>
      )}
    </Flex>
  )
}

export default Parts
