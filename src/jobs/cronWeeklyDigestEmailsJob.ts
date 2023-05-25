import inngestClient from '@utils/inngestClient'

import { prisma } from '@server/db/client'

const cronWeeklyDigestEmailsJob = inngestClient.createFunction(
  { name: 'Weekly Digest Emails' },
  { cron: '0 17 * * 5' }, // every Friday at 5pm
  async ({ step }) => {
    // Fetch all projects that were interacted with in the last week
    const date = new Date()
    date.setDate(date.getDate() - 7) // seven days ago

    const projects = await step.run('Get Projects', async () => prisma.project.findMany({
      where: {
        AND: {
          createdByOwner: true,
          published: true,
        },
        OR: [
          {
            projectPageViews: {
              some: {
                createdAt: {
                  gt: date,
                },
              },
            },
          },
          {
            projectLikes: {
              some: {
                createdAt: {
                  gt: date,
                },
              },
            },
          },
        ],
      },
    }))

    // For each project, send an event
    const events = projects.map(project => ({
      name: 'mailers/weekly-digest-email',
      data: {
        project,
      },
    }))

    await step.sendEvent(events)

    return { count: projects.length }
  },
)

export default cronWeeklyDigestEmailsJob
