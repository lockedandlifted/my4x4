import inngestClient from '@utils/inngestClient'
import { prisma } from '@server/db/client'
import { generateEmailHtml } from 'mailers/unpublishedProjectsMailer'
import sendEmail from '@utils/sendEmail'

const sendUnpublishedProjectsEmailJob = inngestClient.createFunction(
  { name: 'Send Unpublished Projects Email' },
  { event: 'mailers/unpublished-projects-email' },
  async ({ event, step }) => {
    const { data: { user } } = event

    // Fetch Projects
    const projects = await step.run('Fetch Unpublished Projects', async () => prisma.project.findMany({
      where: {
        projectsUsers: {
          some: {
            userId: user.id,
          },
        },
        createdByOwner: true,
        notificationsEnabled: true,
        published: false,
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
      },
    }))

    // Generate Email HTML
    const generateEmailData = await step.run('Generate Email HTML', async () => generateEmailHtml({
      user,
      projects,
    }))

    const { html } = generateEmailData

    // Send Email
    const sendEmailResult = await step.run('Send Email', async () => sendEmail({
      email: user.email,
      html,
      subject: `Hey ${user.username}, you have unpublished builds`,
    }))

    return {
      event,
      html,
      user,
      projects,
      sendEmailResult,
    }
  },
)

export default sendUnpublishedProjectsEmailJob
