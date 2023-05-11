import { Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

type LikeButtonProps = {
  project: Project,
}

const LikeButton = (props: LikeButtonProps) => {
  const { project } = props

  const { data: sessionData } = useSession()

  const { projectLikes: { getLikesCountForProjectSlug: { invalidate } } } = trpc.useContext()

  // Create Like
  const { mutate: createProjectLikeFn } = trpc.projectLikes.createProjectLike.useMutation({
    onSuccess() {
      invalidate({ slug: project?.slug })
    },
  })

  // Delete Like
  const { mutate: deleteProjectLikeFn } = trpc.projectLikes.deleteProjectLike.useMutation({
    onSuccess() {
      invalidate({ slug: project?.slug })
    },
  })

  // Total Likes
  const projectLikesQuery = trpc.projectLikes.getLikesCountForProjectSlug.useQuery(
    { slug: project?.slug },
    { enabled: !!project?.slug },
  )
  const { data: projectLikesCount } = projectLikesQuery

  // User Likes
  const userProjectLikesQuery = trpc.projectLikes.getLikesCountForProjectSlug.useQuery(
    { slug: project?.slug, currentUserOnly: true },
    { enabled: !!project?.slug },
  )
  const { data: userProjectLikesCount } = userProjectLikesQuery

  return (
    <Button
      as={sessionData?.user?.id ? 'button' : 'a'}
      colorScheme={userProjectLikesCount ? 'red' : 'gray'}
      leftIcon={userProjectLikesCount ? <HiHeart fontSize={24} /> : <HiOutlineHeart fontSize={24} />}
      href={sessionData?.user?.id ? undefined : `/users/login?redirect=/${project?.slug}`}
      onClick={userProjectLikesCount
        ? () => deleteProjectLikeFn({
          slug: project?.slug,
        })
        : () => createProjectLikeFn({
          slug: project?.slug,
        })}
      size="lg"
      width="100%"
    >
      {projectLikesCount} {projectLikesCount === 1 ? 'Like' : 'Likes'}
    </Button>
  )
}

export default LikeButton
