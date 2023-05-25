import inngestClient from '@utils/inngestClient'

import sendEmail, { generateEmailHtml } from 'mailers/weeklyDigestMailer'

const sendWeeklyDigestEmail = inngestClient.createFunction(
  { name: 'Send Weekly Digest Email' },
  { event: 'mailers/weekly-digest-email' },
  async ({ event, step }) => {
    const { data: { project } } = event

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
