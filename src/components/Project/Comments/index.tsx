import { Heading } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

import AddComment from './AddComment'
import Comment from './Comment'

type CommentsProps = {
  project: Project,
}

const Comments = (props: CommentsProps) => {
  const { project } = props

  const commentsQuery = trpc.comments.getComments.useQuery(
    {
      projectId: project?.id,
    },
    { enabled: !!project?.id },
  )

  const { data: comments } = commentsQuery

  const filteredComments = comments?.slice(0, 3)

  return (
    <>
      <Heading size="sm" marginTop={8}>Comments</Heading>

      {filteredComments?.map(comment => (
        <Comment
          href={`/${project?.slug}/comments`}
          key={comment.id}
          comment={comment}
        />
      ))}

      <AddComment href={`/${project?.slug}/comments`} />
    </>
  )
}

export default Comments
