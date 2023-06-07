import type { Prisma, PrismaClient, ManufacturerModel } from '@prisma/client'

// Manufacturer Models
const seedFn = (prisma: PrismaClient, manufacturerModels: ManufacturerModel[]) => {
  // Ford Ranger
  const fordRanger = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_ranger')
}

