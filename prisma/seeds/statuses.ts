import type { Prisma, PrismaClient } from '@prisma/client'

// Statuses
const statuses: Prisma.StatusCreateArgs['data'][] = [
  {
    key: 'installed',
    title: 'Installed',
  },
  {
    key: 'removed',
    title: 'Removed',
  },
]

const seedFn = (prisma: PrismaClient) => statuses.map(async (data: Prisma.StatusCreateArgs['data']) => {
  const record = await prisma.status.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
