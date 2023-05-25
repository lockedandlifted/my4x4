import { render } from '@react-email/render'
import sendgrid from '@sendgrid/mail'

import { prisma } from '@server/db/client'

import type { Project } from '@prisma/client'

import { imageKit } from '@contexts/imageKit'

import WeeklyDigestEmail from './templates/WeeklyDigestEmail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

// TODO - Check that owner hasn't disabled weekly digest emails

const currentDate = new Date()
const sevenDaysAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000))

type WeeklyDigestMailerParams = {
  project: Project,
}

export const generateEmailHtml = async (params: WeeklyDigestMailerParams) => {
  const { project } = params

  // Queries
  const projectWithIncludes = await prisma.project.findUnique({
    where: {
      id: project.id,
    },
    include: {
      _count: {
        select: {
          projectLikes: true,
          projectPageViews: true,
        },
      },
      manufacturerModel: true,
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
          user: true,
        },
      },
    },
  })

  const {
    _count: {
      projectLikes: totalLikeCount,
      projectPageViews: totalViewCount,
    },
    createdAt,
    manufacturerModel,
  } = projectWithIncludes

  const similarNewProjectsCount = await prisma.project.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
      manufacturerModelId: projectWithIncludes?.manufacturerModelId,
      published: true,
      NOT: {
        id: projectWithIncludes?.id,
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const newLikeCount = await prisma.projectLike.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
      projectId: projectWithIncludes?.id,
    },
  })

  const newViewCount = await prisma.projectPageView.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
      projectId: projectWithIncludes?.id,
    },
  })

  const createdAtDate = new Date(createdAt)
  const daysSinceCreation = Math.floor((currentDate.getTime() - createdAtDate.getTime()) / (1000 * 3600 * 24))
  const generationDate = currentDate.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const projectImageFileKey = projectWithIncludes.projectsImages?.[0]?.image?.fileKey
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

  const projectUser = projectWithIncludes?.projectsUsers?.[0]?.user
  const userEmail = projectUser?.email

  const html = render(
    <WeeklyDigestEmail
      daysSinceCreation={daysSinceCreation}
      generationDate={generationDate}
      manufacturerId={manufacturerModel?.manufacturerId}
      newLikeCount={newLikeCount}
      newViewCount={newViewCount}
      project={projectWithIncludes}
      projectImageUrl={projectImageUrl}
      similarNewProjectsCount={similarNewProjectsCount}
      totalLikeCount={totalLikeCount}
      totalViewCount={totalViewCount}
      userEmail={userEmail}
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

type SendEmailParams = {
  email: string,
  html: string,
  subject: string,
}

const sendEmail = (params: SendEmailParams) => {
  const { email, html, subject } = params

  return sendgrid.send({
    to: email,
    from: {
      name: 'MY4X4',
      email: 'noreply@my4x4.info',
    },
    subject,
    html,
  })
}

export default sendEmail
