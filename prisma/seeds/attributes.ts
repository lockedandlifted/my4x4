import type { Prisma, PrismaClient } from '@prisma/client'

// Attributes
const attributes: Prisma.AttributeCreateArgs['data'][] = [
  {
    key: 'build_type',
    title: 'Type',
  },
  {
    key: 'colour',
    title: 'Colour',
  },
  {
    key: 'differentials',
    title: 'Diff',
  },
  {
    key: 'engine',
    title: 'Engine',
  },
  {
    key: 'model_series',
    title: 'Series',
  },
  {
    key: 'tyres',
    title: 'Tyres',
  },
  {
    key: 'year_manufactured',
    title: 'Year',
  },
]

const seedFn = (prisma: PrismaClient) => attributes.map(async (data: Prisma.AttributeCreateArgs['data']) => {
  const record = await prisma.attribute.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
