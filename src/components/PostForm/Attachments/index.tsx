import {
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

import { trpc } from '@utils/trpc'

import usePostAttachmentUpload from '@hooks/usePostAttachmentUpload'

import FileUploadButton from '@components/FileUploadButton'

import type { Post } from '@prisma/client'

type AttachmentsProps = {
  editMode?: boolean,
  post: Post,
}

const Attachments = (props: AttachmentsProps) => {
  const { editMode = false, post } = props

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

  console.log(postsAttachments)

  return (
    <Flex direction="column">
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
        <FileUploadButton
          buttonProps={{
            borderRadius: 'md',
            colorScheme: 'gray',
            leftIcon: <FiUploadCloud size={18} />,
            size: 'md',
            zIndex: '1',
            // height: '30px',
            variant: 'outline',
            width: '100%',
          }}
          buttonText="Upload Files"
          inputProps={{
            accept: '.jpg,.jpeg,.pdf,.png',
          }}
          uppy={uppy}
        />
      )}
    </Flex>
  )
}

export default Attachments
