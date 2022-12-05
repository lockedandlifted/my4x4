import type { Prisma, PrismaClient, Manufacturer } from '@prisma/client'

// Manufacturer Models
const seedFn = (prisma: PrismaClient, manufacturers: Manufacturer[]) => {

  // Ford
  const ford = manufacturers.find((manufacturer) => manufacturer.key === 'ford')

  const fordModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'ford_everest',
      title: 'Everest',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_f150',
      title: 'F-150',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_ranger',
      title: 'Ranger',
      manufacturerId: ford.id,
    },
  ]

  // Isuzu

  // Jeep

  // Mazda

  // Mitsubishi

  // Nissan

  // Toyota
  const toyota = manufacturers.find((manufacturer) => manufacturer.key === 'toyota')

  const toyotaModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'toyota_hilux',
      title: 'Hilux',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_land_cruiser',
      title: 'LandCruiser',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_land_cruiser_prado',
      title: 'LandCruiser Prado',
      manufacturerId: toyota.id,
    },
  ]

  // Volkswagen
  const volkswagen = manufacturers.find((manufacturer) => manufacturer.key === 'volkswagen')

  const volkswagenModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'volkswagen_amarok',
      title: 'Amarok',
      manufacturerId: volkswagen.id,
    },
  ]

  // Merge Models
  const mergedModels = [
    ...fordModels,
    ...toyotaModels,
    ...volkswagenModels,
  ]

  const queries = mergedModels.map(async (data: Prisma.ManufacturerModelCreateArgs['data']) => {
    const record = await prisma.manufacturerModel.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })

  return queries
}

export default seedFn
