import { Button } from '@chakra-ui/react'
import useSession from '@hooks/useSession'
import { trpc } from '@utils/trpc'

import type { Comment } from '@prisma/client'

type LikeButtonProps = {
  callbacks: {
    invalidate: VoidFunction,
  },
  comment: Comment,
}

const LikeButton = (props: LikeButtonProps) => {
  const {
    callbacks: {
      invalidate,
    },
    comment,
  } = props

  const { isAuthenticated } = useSession()

  const {
    commentLikes: {
      getLikesCountForCommentId: {
        invalidate: invalidateUserLikesCount,
      },
    },
  } = trpc.useContext()

  // Create Like
  const { mutate: createCommentLikeFn } = trpc.commentLikes.createCommentLike.useMutation({
    onSuccess() {
      invalidate()
      invalidateUserLikesCount({ id: comment?.id })
    },
  })

  // Delete Like
  const { mutate: deleteCommentLikeFn } = trpc.commentLikes.deleteCommentLike.useMutation({
    onSuccess() {
      invalidate()
      invalidateUserLikesCount({ id: comment?.id })
    },
  })

  // User Likes
  const userCommentLikesQuery = trpc.commentLikes.getLikesCountForCommentId.useQuery(
    { id: comment?.id, currentUserOnly: true },
    { enabled: !!comment?.id },
  )
  const { data: userCommentLikesCount } = userCommentLikesQuery

  return (
    <Button
      as={isAuthenticated ? 'button' : 'a'}
      colorScheme={userCommentLikesCount ? 'red' : 'gray'}
      onClick={userCommentLikesCount
        ? () => deleteCommentLikeFn({
          id: comment?.id,
        })
        : () => createCommentLikeFn({
          id: comment?.id,
        })}
      variant="link"
    >
      {userCommentLikesCount ? 'Unlike' : 'Like'}
    </Button>
  )
}

export default LikeButton
