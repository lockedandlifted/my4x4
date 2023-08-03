import inngestClient from '@utils/inngestClient'

import { prisma } from '@server/db/client'

import { generateEmailHtml } from 'mailers/newProjectImagesCommentMailer'

import sendEmail from '@utils/sendEmail'

const sendProjectImagesCommentNotificationJob = inngestClient.createFunction(
  { name: 'Send Project Images Comment Notification' },
  { event: 'mailers/new-project-images-comment-email' },
  async ({ event, step }) => {
    const { commentId, projectsImageId } = event.data

    // Fetch Post Data
    const comment = await step.run('Fetch Post Data', async () => prisma.comment.findUnique({
      where: {
        id: commentId,
      },
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
    }))

    // Fetch ProjectsImage Data
    const projectsImage = await step.run('Fetch ProjectsImage Data', async () => prisma.projectsImage.findUnique({
      where: {
        id: projectsImageId,
      },
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
    }))

    // Generate Email HTML
    const generateEmailData = await step.run('Generate Email HTML', async () => generateEmailHtml({
      comment,
      projectsImage,
    }))

    const { data: { projectUser }, html } = generateEmailData

    const project = projectsImage.project || {}

    // Send Email
    const sendEmailResult = await step.run('Send Email', async () => sendEmail({
      email: projectUser?.email,
      html,
      subject: `New Comment - ${project?.title}`,
    }))

    return {
      comment, event, html, projectUser, projectsImage, sendEmailResult,
    }
  },
)

export default sendProjectImagesCommentNotificationJob
