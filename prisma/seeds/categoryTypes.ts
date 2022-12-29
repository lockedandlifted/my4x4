import type { Prisma, PrismaClient } from '@prisma/client'

// Category Types
const categoryTypes: Prisma.CategoryTypeCreateArgs['data'][] = [
  {
    key: 'part',
    title: 'Part',
  },
]

const seedFn = (prisma: PrismaClient) => categoryTypes.map(async (data: Prisma.CategoryTypeCreateArgs['data']) => {
  const record = await prisma.categoryType.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
