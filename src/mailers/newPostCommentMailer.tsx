import { render } from '@react-email/render'

import type { Prisma, Project } from '@prisma/client'

import { imageKit } from '@contexts/imageKit'

import NewPostCommentEmail from './templates/NewPostCommentEmail'

const currentDate = new Date()

type CommentWithIncludes = Prisma.CommentGetPayload<{
  include: {
    user: {
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
      },
    },
  },
}>

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {
    postType: true,
    user: {
      include: {
        usersImages: {
          include: {
            image: true,
          },
          orderBy: {
            sort: 'asc',
          },
          take: 1,
        },
      },
    },
  },
}>

type NewProjectQuestionMailerParams = {
  comment: CommentWithIncludes,
  post: PostWithIncludes,
  project: Project,
}

export const generateEmailHtml = async (params: NewProjectQuestionMailerParams) => {
  const { comment, post, project } = params

  const commentUser = comment?.user
  const commentUserImageFileKey = commentUser?.usersImages?.[0]?.image?.fileKey
  const commentUserImageUrl = commentUserImageFileKey
    ? imageKit.url({
      path: commentUserImageFileKey,
      transformation: [{
        focus: 'auto',
        height: '200',
        width: '200',
      }],
    })
    : undefined

  const postPath = project && post?.postType?.key === 'question'
    ? `/${project?.slug}/questions/${post?.id}`
    : ''

  const postUser = post?.user
  const userEmail = postUser?.email

  const generationDate = currentDate.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const html = render(
    <NewPostCommentEmail
      commentBody={comment.body || ''}
      commentUserName={commentUser?.name || ''}
      commentUserImageUrl={commentUserImageUrl || ''}
      post={post}
      postPath={postPath}
      generationDate={generationDate}
      userEmail={userEmail || ''}
    />,
    {
      pretty: true,
    },
  )

  return {
    data: {
      postUser,
    },
    html,
  }
}

export default generateEmailHtml
