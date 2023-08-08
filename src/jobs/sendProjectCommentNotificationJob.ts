import inngestClient from '@utils/inngestClient'

import { prisma } from '@server/db/client'

import { generateEmailHtml } from 'mailers/newProjectCommentMailer'

import sendEmail from '@utils/sendEmail'

const sendProjectCommentNotificationJob = inngestClient.createFunction(
  { name: 'Send Project Comment Notification' },
  { event: 'mailers/new-project-comment-email' },
  async ({ event, step }) => {
    const { commentId, projectId } = event.data

    // Fetch Comment Data
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

    // Fetch Project Data
    const project = await step.run('Fetch Project Data', async () => prisma.project.findUnique({
      where: {
        id: projectId,
      },
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
    }))

    // Generate Email HTML
    const generateEmailData = await step.run('Generate Email HTML', async () => generateEmailHtml({
      comment,
      project,
    }))

    const { data: { projectUser }, html } = generateEmailData

    // Send Email
    const sendEmailResult = await step.run('Send Email', async () => sendEmail({
      email: projectUser?.email,
      html,
      subject: `New Comment - ${project?.title}`,
    }))

    return {
      event, html, projectUser, comment, project, sendEmailResult,
    }
  },
)

export default sendProjectCommentNotificationJob
