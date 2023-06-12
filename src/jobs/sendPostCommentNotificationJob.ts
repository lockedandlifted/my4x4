import inngestClient from '@utils/inngestClient'

import { prisma } from '@server/db/client'

import { generateEmailHtml } from 'mailers/newPostCommentMailer'

import sendEmail from '@utils/sendEmail'

const sendPostCommentNotificationJob = inngestClient.createFunction(
  { name: 'Send Post Comment Notification' },
  { event: 'mailers/new-post-comment-email' },
  async ({ event, step }) => {
    const { commentId, postId } = event.data

    // Fetch Comment Data
    const comment = await step.run('Fetch Comment Data', async () => prisma.comment.findUnique({
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

    // Fetch Post Data
    const post = await step.run('Fetch Post Data', async () => prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        postsProjects: {
          include: {
            project: true,
          },
        },
        postType: true,
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

    // Generate Email HTML
    const generateEmailData = await step.run('Generate Email HTML', async () => generateEmailHtml({
      comment,
      project: post?.postsProjects?.[0]?.project,
      post,
    }))

    const { data: { postUser }, html } = generateEmailData

    // Send Email
    const sendEmailResult = await step.run('Send Email', async () => sendEmail({
      email: postUser?.email,
      html,
      subject: `New Reply - ${post?.title}`,
    }))

    return {
      comment,
      event,
      html,
      post,
      postUser,
      sendEmailResult,
    }
  },
)

export default sendPostCommentNotificationJob
