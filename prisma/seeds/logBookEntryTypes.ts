import type { Prisma, PrismaClient } from '@prisma/client'

// Log Book Entry Types
const logBookEntryTypes: Prisma.LogBookEntryTypeCreateArgs['data'][] = [
  {
    key: 'modification',
    title: 'Modification',
  },
  {
    key: 'service',
    title: 'Service',
  },
]

const seedFn = (prisma: PrismaClient) => logBookEntryTypes.map(async (data: Prisma.LogBookEntryTypeCreateArgs['data']) => {
  const record = await prisma.logBookEntryType.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
