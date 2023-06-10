import { serve } from 'inngest/next'

import inngestClient from '@utils/inngestClient'

// CRON
import cronWeeklyDigestEmailsJob from 'jobs/cronWeeklyDigestEmailsJob'

// Events
import sendProjectQuestionNotificationJob from 'jobs/sendProjectQuestionNotificationJob'
import sendWeeklyDigestEmailJob from 'jobs/sendWeeklyDigestEmailJob'

// Create an API that hosts the functions
export default serve(inngestClient, [
  cronWeeklyDigestEmailsJob,
  sendProjectQuestionNotificationJob,
  sendWeeklyDigestEmailJob,
])
