import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

type SendEmailParams = {
  email: string,
  html: string,
  subject: string,
}

const sendEmail = (params: SendEmailParams) => {
  const { email, html, subject } = params

  if (!email) {
    return Promise.resolve({
      success: false,
      message: 'No email address provided',
    })
  }

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
