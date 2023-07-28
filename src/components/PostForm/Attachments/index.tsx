import { useState } from 'react'
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
import { FiUploadCloud } from 'react-icons/fi'
import { DashboardModal } from '@uppy/react'

import { trpc } from '@utils/trpc'

import usePostAttachmentUpload from '@hooks/usePostAttachmentUpload'

import type { Post } from '@prisma/client'

type AttachmentsProps = {
  editMode?: boolean,
  post: Post,
}

const Attachments = (props: AttachmentsProps) => {
  const { editMode = false, post } = props

  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const { postsAttachments: { getPostsAttachments: { invalidate } } } = trpc.useContext()

  const postsAttachmentsQuery = trpc.postsAttachments.getPostsAttachments.useQuery(
    { postId: post?.id, include: { attachment: true } },
    { enabled: !!post?.id },
  )

  const { data: postsAttachments = [] } = postsAttachmentsQuery

  const { uppy } = usePostAttachmentUpload({
    callbacks: {
      onSuccess: () => invalidate({ postId: post?.id }),
    },
    postId: post?.id,
  })

  return (
    <Flex direction="column">
      {uppy && (
        <DashboardModal
          doneButtonHandler={() => setUploadModalOpen(false)}
          onRequestClose={() => setUploadModalOpen(false)}
          open={uploadModalOpen}
          uppy={uppy}
        />
      )}

      <TableContainer marginBottom="2">
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th width="calc(100% - 100px)">Filename</Th>
              <Th width="100px">Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {postsAttachments.map((postAttachment) => {
              const { id, attachment } = postAttachment

              return (
                <Tr key={id}>
                  <Td>{attachment?.originalFilename}</Td>
                  <Td>Download | Insert</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {editMode && !!uppy && (
        <Button
          borderRadius="md"
          colorScheme="gray"
          leftIcon={<FiUploadCloud size={18} />}
          onClick={() => setUploadModalOpen(true)}
          size="md"
          zIndex="1"
          variant="outline"
          width="100%"
        >
          Upload Files
        </Button>
      )}
    </Flex>
  )
}

export default Attachments
