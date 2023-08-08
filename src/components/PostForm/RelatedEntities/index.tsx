import {
  Button,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

import type { RelatedEntity } from '@hooks/usePostForm'

type RelatedEntitiesProps = {
  callbacks?: {
    AddPostRelatedEntitiesModal: {
      closeModal: VoidFunction,
      showModal: VoidFunction,
    },
    insertRelatedEntity: (relatedEntity: RelatedEntity) => void,
  },
  editMode?: boolean,
  relatedEntities: RelatedEntity[],
}

const RelatedEntities = (props: RelatedEntitiesProps) => {
  const {
    callbacks, editMode, relatedEntities,
  } = props

  const {
    AddPostRelatedEntitiesModal,
    insertRelatedEntity,
  } = callbacks || {}

  if (!relatedEntities) {
    return null
  }

  return (
    <Flex direction="column">
      <TableContainer marginBottom="2">
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th width="calc(100% - 100px)">Title</Th>
              <Th width="100px">Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {relatedEntities.map((relatedEntity) => {
              const { key, title, value } = relatedEntity

              return (
                <Tr key={`${key}_${value}`}>
                  <Td>
                    {title}
                  </Td>

                  <Td>
                    {editMode && insertRelatedEntity && (
                      <Button
                        onClick={() => insertRelatedEntity(relatedEntity)}
                        size="sm"
                        variant="link"
                      >
                        Insert
                      </Button>
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {editMode && (
        <Button
          borderRadius="md"
          colorScheme="gray"
          onClick={AddPostRelatedEntitiesModal ? () => AddPostRelatedEntitiesModal.showModal() : undefined}
          size="md"
          zIndex="1"
          variant="outline"
          width="100%"
        >
          Add Reference
        </Button>
      )}
    </Flex>
  )
}

export default RelatedEntities
