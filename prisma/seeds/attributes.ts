import type { Prisma, PrismaClient } from '@prisma/client'

// Attributes
const attributes: Prisma.AttributeCreateArgs['data'][] = [
  {
    key: 'model_series',
    title: 'Series',
    type: 'input',
    sort: 0,
  },
  {
    key: 'year_manufactured',
    title: 'Year',
    type: 'input',
    sort: 1,
  },
  {
    key: 'colour',
    title: 'Colour',
    type: 'input',
    sort: 2,
  },
  {
    key: 'build_type',
    title: 'Build Type',
    type: 'select',
    sort: 3,
  },
  {
    key: 'engine',
    title: 'Engine',
    type: 'input',
    sort: 4,
  },
  {
    key: 'diff_lockers',
    title: 'Diff Lockers',
    type: 'select',
    sort: 5,
  },
  {
    key: 'tyres',
    title: 'Tyres',
    type: 'input',
    sort: 6,
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
