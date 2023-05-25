import type { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@server/db/client'

export default async function handler(req: NextRequest, res: NextResponse) {
  const { query: { projectId, token } } = req

  await prisma.project.updateMany({
    where: {
      authToken: token,
      id: projectId,
    },
    data: {
      notificationsEnabled: false,
    },
  })

  res.status(200).send('Notifications for project have been disabled.')
}
