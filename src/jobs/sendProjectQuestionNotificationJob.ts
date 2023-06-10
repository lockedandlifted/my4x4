import inngestClient from '@utils/inngestClient'

import { prisma } from '@server/db/client'

import { generateEmailHtml } from 'mailers/newProjectQuestionMailer'

import sendEmail from '@utils/sendEmail'

const sendProjectQuestionNotificationJob = inngestClient.createFunction(
  { name: 'Send Project Question Notification' },
  { event: 'mailers/new-project-question-email' },
  async ({ event, step }) => {
    const { postId, projectId } = event.data

    // Fetch Post Data
    const post = await step.run('Fetch Post Data', async () => prisma.post.findUnique({
      where: {
        id: postId,
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
      post,
      project,
    }))

    const { data: { projectUser }, html } = generateEmailData

    // Send Email
    const sendEmailResult = await step.run('Send Email', async () => sendEmail({
      email: projectUser?.email,
      html,
      subject: `New Question - ${project?.title}`,
    }))

    return {
      event, html, projectUser, post, project, sendEmailResult,
    }
  },
)

export default sendProjectQuestionNotificationJob
