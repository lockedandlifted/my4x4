import { render } from '@react-email/render'

import type { Prisma } from '@prisma/client'

import { imageKit } from '@contexts/imageKit'

import NewProjectImagesCommentEmail from './templates/NewProjectImagesCommentEmail'

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

type ProjectsImageWithIncludes = Prisma.ProjectsImageGetPayload<{
  include: {
    image: true,
    project: {
      include: {
        projectsUsers: {
          include: {
            user: true,
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

type NewProjectImagesCommentMailerParams = {
  comment: CommentWithIncludes,
  projectsImage: ProjectsImageWithIncludes,
}

export const generateEmailHtml = async (params: NewProjectImagesCommentMailerParams) => {
  const { comment, projectsImage } = params

  const imageFileKey = projectsImage?.image?.fileKey
  const imageUrl = imageFileKey
    ? imageKit.url({
      path: imageFileKey,
      transformation: [{
        focus: 'auto',
        height: '200',
        width: '200',
      }],
    })
    : undefined

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

  const project = projectsImage?.project || {}
  const imagePath = `/${project?.slug}/images/${projectsImage?.id}`

  const projectUser = project?.projectsUsers?.[0]?.user
  const userEmail = projectUser?.email

  const generationDate = currentDate.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const html = render(
    <NewProjectImagesCommentEmail
      commentBody={comment.body || ''}
      commentUserName={commentUser?.name || ''}
      commentUserImageUrl={commentUserImageUrl || ''}
      imageUrl={imageUrl || ''}
      imagePath={imagePath}
      generationDate={generationDate}
      userEmail={userEmail || ''}
    />,
    {
      pretty: true,
    },
  )

  return {
    data: {
      projectUser,
    },
    html,
  }
}

export default generateEmailHtml
