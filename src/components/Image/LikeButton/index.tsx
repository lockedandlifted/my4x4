import { Button } from '@chakra-ui/react'
import useSession from '@hooks/useSession'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { trpc } from '@utils/trpc'

import type { Image } from '@prisma/client'

type LikeButtonProps = {
  image: Image,
  redirect: string,
}

const LikeButton = (props: LikeButtonProps) => {
  const { image, redirect } = props

  const { isAuthenticated } = useSession()

  const { imageLikes: { getLikesCountForImageId: { invalidate } } } = trpc.useContext()

  // Create Like
  const { mutate: createImageLikeFn } = trpc.imageLikes.createImageLike.useMutation({
    onSuccess() {
      invalidate({ id: image?.id })
    },
  })

  // Delete Like
  const { mutate: deleteImageLikeFn } = trpc.imageLikes.deleteImageLike.useMutation({
    onSuccess() {
      invalidate({ id: image?.id })
    },
  })

  // Total Likes
  const imageLikesQuery = trpc.imageLikes.getLikesCountForImageId.useQuery(
    { id: image?.id },
    { enabled: !!image?.id },
  )
  const { data: imageLikesCount } = imageLikesQuery

  // User Likes
  const userImageLikesQuery = trpc.imageLikes.getLikesCountForImageId.useQuery(
    { id: image?.id, currentUserOnly: true },
    { enabled: !!image?.id },
  )
  const { data: userImageLikesCount } = userImageLikesQuery

  return (
    <Button
      as={isAuthenticated ? 'button' : 'a'}
      colorScheme={userImageLikesCount ? 'red' : 'gray'}
      leftIcon={userImageLikesCount ? <HiHeart fontSize={24} /> : <HiOutlineHeart fontSize={24} />}
      href={isAuthenticated ? undefined : `/users/login?redirect=/${redirect}`}
      onClick={userImageLikesCount
        ? () => deleteImageLikeFn({
          id: image?.id,
        })
        : () => createImageLikeFn({
          id: image?.id,
        })}
      size="md"
    >
      {imageLikesCount} {imageLikesCount === 1 ? 'Like' : 'Likes'}
    </Button>
  )
}

export default LikeButton
