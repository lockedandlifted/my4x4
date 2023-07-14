import type { Prisma, PrismaClient } from '@prisma/client'

// Attributes
const attributes: Prisma.AttributeCreateArgs['data'][] = [
  {
    key: 'year_manufactured',
    title: 'Year',
    type: 'input',
    sort: 0,
  },
  {
    key: 'colour',
    title: 'Colour',
    type: 'input',
    sort: 1,
  },
  {
    key: 'build_type',
    title: 'Build Type',
    type: 'select',
    sort: 2,
  },
  {
    key: 'engine',
    title: 'Engine',
    type: 'input',
    sort: 3,
  },
  {
    key: 'engine_aspiration',
    title: 'Aspiration',
    type: 'select',
    sort: 4,
  },
  {
    key: 'kilometers',
    title: 'KM',
    type: 'input',
    sort: 5,
  },
  {
    key: 'diff_lockers',
    title: 'Diff Locks',
    type: 'select',
    sort: 6,
  },
  {
    key: 'tyre_terrain',
    title: 'Tyre Type',
    type: 'select',
    sort: 7,
  },
  {
    key: 'tyre_size',
    title: 'Tyre Size',
    type: 'input',
    sort: 8,
  },
  {
    key: 'model_badge',
    title: 'Badge',
    type: 'input',
    sort: 9,
  },
  {
    key: 'body_type',
    title: 'Body',
    type: 'select',
    sort: 10,
  },
  {
    key: 'lift_front',
    title: 'Lift (Front)',
    type: 'input',
    sort: 11,
  },
  {
    key: 'lift_rear',
    title: 'Lift (Rear)',
    type: 'input',
    sort: 12,
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
