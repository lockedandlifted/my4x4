import type { Prisma, PrismaClient } from '@prisma/client'

// Manufacturers
const manufacturers: Prisma.ManufacturerCreateArgs['data'][] = [
  {
    key: 'ford',
    title: 'Ford',
  },
  {
    key: 'toyota',
    title: 'Toyota',
  },
  {
    key: 'mazda',
    title: 'Mazda',
  },
  {
    key: 'mitsubishi',
    title: 'Mitsubishi',
  },
  {
    key: 'nissan',
    title: 'Nissan',
  },
  {
    key: 'isuzu',
    title: 'Isuzu',
  },
  {
    key: 'jeep',
    title: 'Jeep',
  },
  {
    key: 'volkswagen',
    title: 'Volkswagen',
  },
]

const seedFn = (prisma: PrismaClient) => {
  return manufacturers.map(async (data: Prisma.ManufacturerCreateArgs['data']) => {
    const record = await prisma.manufacturer.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })
}

export default seedFn
