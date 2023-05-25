import { v4 as uuidv4 } from 'uuid'

import inngestClient from '@utils/inngestClient'

import { prisma } from '@server/db/client'

import sendEmail, { generateEmailHtml } from 'mailers/weeklyDigestMailer'

const sendWeeklyDigestEmail = inngestClient.createFunction(
  { name: 'Send Weekly Digest Email' },
  { event: 'mailers/weekly-digest-email' },
  async ({ event, step }) => {
    const { data: { project } } = event

    // Generate Auth Token
    const authToken = uuidv4()
    await step.run('Generate Auth Token', async () => prisma.project.update({
      where: {
        id: project?.id,
      },
      data: {
        authToken,
      },
    }))

    // Generate Email HTML
    const generateEmailData = await step.run('Generate Email HTML', async () => generateEmailHtml({
      project,
    }))

    const { data: { projectUser }, html } = generateEmailData

    // Send Email
    const sendEmailResult = await step.run('Send Email', async () => sendEmail({
      email: projectUser?.email,
      html,
      subject: `Weekly Update - ${project?.title}`,
    }))

    return {
      event, html, projectUser, project, sendEmailResult,
    }
  },
)

export default sendWeeklyDigestEmail
