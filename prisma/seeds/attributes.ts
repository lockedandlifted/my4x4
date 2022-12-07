import type { Prisma, PrismaClient } from '@prisma/client'

// Attributes
const attributes: Prisma.AttributeCreateArgs['data'][] = [
  {
    key: 'colour',
    title: 'Colour',
  },
  {
    key: 'year_manufactured',
    title: 'Year',
  },
]

const seedFn = (prisma: PrismaClient) => {
  return attributes.map(async (data: Prisma.AttributeCreateArgs['data']) => {
    const record = await prisma.attribute.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })
}

export default seedFn
