import type { Prisma, PrismaClient } from '@prisma/client'

// Post Types
const postTypes: Prisma.PostTypeCreateArgs['data'][] = [
  {
    key: 'question',
    title: 'Question',
  },
]

const seedFn = (prisma: PrismaClient) => postTypes.map(async (data: Prisma.PostTypeCreateArgs['data']) => {
  const record = await prisma.postType.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
