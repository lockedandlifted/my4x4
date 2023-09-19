import { useEffect, useState } from 'react'

import {
  Button, Flex, Heading, Tag,
} from '@chakra-ui/react'

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
  const { groupedInstalledParts, groupedRemovedParts, projectsParts } = projectPartsPayload

  const hasParts = projectsParts.length > 0
  const hasInstalledParts = groupedInstalledParts.length > 0
  const hasRemovedParts = groupedRemovedParts.length > 0

  const [statusKey, setStatusKey] = useState('installed')

  const groupedParts = statusKey === 'removed' ? groupedRemovedParts : groupedInstalledParts

  useEffect(() => {
    if (!hasInstalledParts && hasRemovedParts) {
      setStatusKey('removed')
    }
  }, [hasInstalledParts, hasRemovedParts])

  if (!editMode && !hasParts) {
    return null
  }

  return (
    <Flex flexDirection="column" marginTop={8}>
      <Heading marginBottom={2} size="sm">Parts</Heading>

      {hasInstalledParts && hasRemovedParts && (
        <Flex>
          {hasInstalledParts && (
            <Tag
              backgroundColor={statusKey === 'installed' ? 'black' : 'white'}
              borderWidth="1px"
              color={statusKey === 'installed' ? 'white' : 'black'}
              cursor="pointer"
              marginRight="1"
              marginBottom="1"
              onClick={() => setStatusKey('installed')}
              paddingY="2"
              paddingX="3"
            >
              Installed
            </Tag>
          )}

          {hasRemovedParts && (
            <Tag
              backgroundColor={statusKey === 'removed' ? 'black' : 'white'}
              borderWidth="1px"
              color={statusKey === 'removed' ? 'white' : 'black'}
              cursor="pointer"
              marginRight="1"
              marginBottom="1"
              onClick={() => setStatusKey('removed')}
              paddingY="2"
              paddingX="3"
            >
              Removed
            </Tag>
          )}
        </Flex>
      )}

      {hasParts && (
        <Flex borderWidth="1px" borderColor="gray.200" borderRadius="lg" direction="column" marginTop="2" padding="4">
          {groupedParts.map((group) => {
            const { category, key, projectsParts } = group

            return (
              <CategoryGroup
                category={category}
                editMode={editMode}
                key={key}
                project={project}
                projectsParts={projectsParts}
              />
            )
          })}
        </Flex>
      )}

      {editMode && (
        <Button
          colorScheme="gray"
          marginTop="4"
          onClick={CreateOrEditProjectPartModal ? () => CreateOrEditProjectPartModal.showModal() : undefined}
          size="lg"
          width="auto"
        >
          Add a Part
        </Button>
      )}
    </Flex>
  )
}

export default Parts
