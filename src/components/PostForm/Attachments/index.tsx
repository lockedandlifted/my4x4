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
import CustomEditor from '@utils/customEditor'
import { imageFileExtensions } from '@utils/asset'

import usePostAttachmentUpload from '@hooks/usePostAttachmentUpload'

import type { Post } from '@prisma/client'

type AttachmentsProps = {
  editor: object,
  editMode?: boolean,
  post: Post,
}

const Attachments = (props: AttachmentsProps) => {
  const { editor, editMode = false, post } = props

  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const { postsAttachments: { getPostsAttachments: { invalidate } } } = trpc.useContext()

  const postsAttachmentsQuery = trpc.postsAttachments.getPostsAttachments.useQuery(
    { postId: post?.id, include: { attachment: true } },
    { enabled: !!post?.id },
  )

  const { data: postsAttachments = [] } = postsAttachmentsQuery

  const hasPostsAttachments = postsAttachments?.length > 0

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

      <TableContainer marginBottom={hasPostsAttachments ? 2 : 0}>
        <Table size="sm" variant="simple">
          {hasPostsAttachments && (
            <Thead>
              <Tr>
                <Th width="calc(100% - 100px)">Filename</Th>
                <Th width="100px">Actions</Th>
              </Tr>
            </Thead>
          )}

          <Tbody>
            {postsAttachments.map((postsAttachment) => {
              const { id, attachment } = postsAttachment
              const isImage = imageFileExtensions.includes(attachment?.fileExtension || '')

              return (
                <Tr key={id}>
                  <Td>{attachment?.originalFilename}</Td>
                  <Td>
                    {editMode && isImage && (
                      <>
                        <Button
                          onClick={() => CustomEditor.handleAttachmentInsert(editor, attachment)}
                          size="sm"
                          variant="link"
                        >
                          Insert
                        </Button>
                        <span> | </span>
                      </>
                    )}

                    <Button size="sm" variant="link">
                      Download
                    </Button>
                  </Td>
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
