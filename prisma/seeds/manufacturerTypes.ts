import type { Prisma, PrismaClient } from '@prisma/client'

// Manufacturer Types
const manufacturerTypes: Prisma.ManufacturerTypeCreateArgs['data'][] = [
  {
    key: 'part',
    title: 'Part',
  },
  {
    key: 'vehicle',
    title: 'Vehicle',
  },
]

const seedFn = (prisma: PrismaClient) => {
  return manufacturerTypes.map(async (data: Prisma.ManufacturerTypeCreateArgs['data']) => {
    const record = await prisma.manufacturerType.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })
}

export default seedFn
