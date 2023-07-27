import { render } from '@react-email/render'

import type { User, Project } from '@prisma/client'

import { imageKit } from '@contexts/imageKit'

import UnpublishedProjectsEmail from './templates/UnpublishedProjectsEmail'

const currentDate = new Date()

type UnpublishedProjectsMailerParams = {
  projects: Project[],
  user: User,
}

const getProjectImageUrl = (project: Project) => {
  const projectImageFileKey = project.projectsImages?.[0]?.image?.fileKey
  if (!projectImageFileKey) {
    return null
  }

  const projectImageUrl = imageKit.url({
    path: projectImageFileKey,
    transformation: [
      {
        focus: 'auto',
        height: '200',
        width: '200',
      },
    ],
  })

  return projectImageUrl
}

export const generateEmailHtml = async (params: UnpublishedProjectsMailerParams) => {
  const { projects, user } = params

  const mappedProjects = projects.map(project => ({
    id: project.id,
    imageUrl: getProjectImageUrl(project),
    slug: project.slug,
    title: project.title,
  }))

  const generationDate = currentDate.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const html = render(
    <UnpublishedProjectsEmail
      generationDate={generationDate}
      projects={mappedProjects}
      userEmail={user.email || ''}
    />,
    {
      pretty: true,
    },
  )

  return {
    html,
  }
}

export default generateEmailHtml
