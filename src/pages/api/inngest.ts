import { serve } from 'inngest/next'

import inngestClient from '@utils/inngestClient'

// CRON
import cronWeeklyDigestEmailsJob from 'jobs/cronWeeklyDigestEmailsJob'
import cronMonthlyUnpublishedProjectsEmailsJob from 'jobs/cronMonthlyUnpublishedProjectsEmailsJob'

// Events
import sendPostCommentNotificationJob from 'jobs/sendPostCommentNotificationJob'
import sendProjectImagesCommentNotificationJob from 'jobs/sendProjectImagesCommentNotificationJob'
import sendProjectQuestionNotificationJob from 'jobs/sendProjectQuestionNotificationJob'
import sendWeeklyDigestEmailJob from 'jobs/sendWeeklyDigestEmailJob'
import sendUnpublishedProjectsEmailJob from 'jobs/sendUnpublishedProjectsEmailJob'

// Create an API that hosts the functions
export default serve(inngestClient, [
  cronWeeklyDigestEmailsJob,
  cronMonthlyUnpublishedProjectsEmailsJob,
  sendPostCommentNotificationJob,
  sendProjectImagesCommentNotificationJob,
  sendProjectQuestionNotificationJob,
  sendUnpublishedProjectsEmailJob,
  sendWeeklyDigestEmailJob,
])
