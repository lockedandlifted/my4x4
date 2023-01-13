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
  {
    key: 'model_series',
    title: 'Series',
  },
  {
    key: 'engine',
    title: 'Engine',
  },
  {
    key: 'differentials',
    title: 'Diff',
  },
  {
    key: 'tyre_size',
    title: 'Tyres',
  },
  {
    key: 'build_goal',
    title: 'Purpose',
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
