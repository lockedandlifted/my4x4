import { trpc } from '@utils/trpc'

import { isImage } from '@utils/asset'

import type { PostsAttachment } from '@prisma/client'

const groupAttachmentsByType = (postsAttachments: PostsAttachment[]) => {
  const grouped = postsAttachments.reduce((acc, postsAttachment) => {
    const { attachment } = postsAttachment

    const isImageAttachment = isImage(attachment?.fileExtension)
    const key = isImageAttachment ? 'images' : 'files'

    return {
      ...acc,
      [key]: [...(acc[key] || []), postsAttachment],
    }
  }, {})

  return grouped
}

function usePostAttachments(options: { postId: string }) {
  const { postId } = options

  const postsAttachmentsQuery = trpc.postsAttachments.getPostsAttachments.useQuery(
    { postId, include: { attachment: true } },
    { enabled: !!postId },
  )

  const { data: postsAttachments = [] } = postsAttachmentsQuery

  return {
    groupedAttachments: groupAttachmentsByType(postsAttachments),
    postsAttachments,
  }
}

export default usePostAttachments
