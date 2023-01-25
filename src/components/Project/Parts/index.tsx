import { Button, Flex, Heading } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import useProjectParts from '@hooks/useProjectParts'

import CategoryGroup from './CategoryGroup'

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

  const projectPartsPayload = useProjectParts(project)
  const { groupedParts, projectsParts } = projectPartsPayload

  if (!editMode && !projectsParts.length) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading size="md">Parts</Heading>

      {groupedParts.map((group) => {
        const { category, key, projectsParts } = group

        return (
          <CategoryGroup
            category={category}
            key={key}
            projectsParts={projectsParts}
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
