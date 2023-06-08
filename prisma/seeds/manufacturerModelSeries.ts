import type {
  Prisma, PrismaClient, ManufacturerModel, ManufacturerModelSeries,
} from '@prisma/client'

// Manufacturer Model Series
const seedFn = (prisma: PrismaClient, manufacturerModels: ManufacturerModel[]) => {
  // Ford Ranger
  const fordRanger = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_ranger')

  const fordRangerSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'ford_ranger_px3',
      title: 'PX3',
      manufacturerModelId: fordRanger.id,
    },
  ]

  // Merge Series
  const mergedSeries = [
    ...fordRangerSeries,
  ]

  const queries = mergedSeries.map(async (data: Prisma.ManufacturerModelSeriesCreateArgs['data']) => {
    const record = await prisma.manufacturerModelSeries.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })

  return queries
}

export default seedFn
