import inngestClient from '@utils/inngestClient'
import { prisma } from '@server/db/client'

const cronMonthlyUnpublishedProjectsEmailsJob = inngestClient.createFunction(
  { name: 'Monthly Unpublished Project Emails' },
  { cron: 'TZ=Australia/Sydney 0 17 1 * *' }, // start of month at 5pm
  async ({ step }) => {
    const usersWithUnpublishedProjects = await step.run('Get Users with Unpublished Projects', async () => prisma.user.findMany({
      where: {
        projectsUsers: {
          some: {
            project: {
              createdByOwner: true,
              notificationsEnabled: true,
              published: false,
            },
          },
        },
      },
    }))

    // For each user with unpublished project, send an event
    const events = usersWithUnpublishedProjects.map(user => ({
      name: 'mailers/unpublished-projects-email',
      data: {
        user,
      },
    }))

    await step.sendEvent(events)

    return { count: usersWithUnpublishedProjects.length }
  },
)

export default cronMonthlyUnpublishedProjectsEmailsJob
