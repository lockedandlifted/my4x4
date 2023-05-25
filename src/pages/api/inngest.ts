import { serve } from 'inngest/next'

import inngestClient from '@utils/inngestClient'

// CRON
import cronWeeklyDigestEmailsJob from 'jobs/cronWeeklyDigestEmailsJob'

// Events
import sendWeeklyDigestEmailJob from 'jobs/sendWeeklyDigestEmailJob'

// Create an API that hosts zero functions
export default serve(inngestClient, [
  cronWeeklyDigestEmailsJob,
  sendWeeklyDigestEmailJob,
])
