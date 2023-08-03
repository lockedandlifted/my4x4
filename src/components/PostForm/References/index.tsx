import { Button, Flex } from '@chakra-ui/react'

import type { Post } from '@prisma/client'

type ReferencesProps = {
  callbacks?: {
    AddPostRelatedEntitiesModal: {
      closeModal: VoidFunction,
      showModal: VoidFunction,
    },
  },
  editMode?: boolean,
  post: Post,
}

const References = (props: ReferencesProps) => {
  const { callbacks, editMode, post } = props

  const { AddPostRelatedEntitiesModal } = callbacks || {}

  return (
    <Flex direction="column">
      {post?.title}

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

export default References
