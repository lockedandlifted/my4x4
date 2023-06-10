import { render } from '@react-email/render'

import type { Prisma } from '@prisma/client'

import { imageKit } from '@contexts/imageKit'

import NewProjectQuestionEmail from './templates/NewProjectQuestionEmail'

const currentDate = new Date()

type PostWithIncludes = Prisma.PostGetPayload<{
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

type ProjectWithIncludes = Prisma.ProjectGetPayload<{
  include: {
    projectsImages: {
      include: {
        image: true,
      },
      orderBy: {
        sort: 'asc',
      },
      take: 1,
    },
    projectsUsers: {
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
      take: 1,
    },
  },
}>

type NewProjectQuestionMailerParams = {
  post: PostWithIncludes,
  project: ProjectWithIncludes,
}

export const generateEmailHtml = async (params: NewProjectQuestionMailerParams) => {
  const { post, project } = params

  const postUserImageFileKey = post?.user?.usersImages?.[0]?.image?.fileKey
  const postUserImageUrl = postUserImageFileKey
    ? imageKit.url({
      path: postUserImageFileKey,
      transformation: [{
        focus: 'auto',
        height: '200',
        width: '200',
      }],
    })
    : undefined

  const projectImageFileKey = project.projectsImages?.[0]?.image?.fileKey
  const projectImageUrl = projectImageFileKey
    ? imageKit.url({
      path: projectImageFileKey,
      transformation: [{
        focus: 'auto',
        height: '200',
        width: '200',
      }],
    })
    : undefined

  const projectUser = project?.projectsUsers?.[0]?.user
  const userEmail = projectUser?.email

  const generationDate = currentDate.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const html = render(
    <NewProjectQuestionEmail
      postBody={post?.body}
      postId={post?.id}
      postUserImageUrl={postUserImageUrl || ''}
      postUserName={post?.user?.name || ''}
      generationDate={generationDate}
      project={project}
      projectImageUrl={projectImageUrl || ''}
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
