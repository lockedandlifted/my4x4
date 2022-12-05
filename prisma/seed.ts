import prisma from '../src/server/db/client.js'

import manufacturerSeedFn from './seeds/manufacturers.js'
import manufacturerModelSeedFn from './seeds/manufacturerModels.js'

const seedDatabase = async () => {
  try {
    // Manufacturers
    const manufacturers = await Promise.all(manufacturerSeedFn(prisma))
    console.log('--- Seeded Manufacturers ---', manufacturers)

    // Manufacturer Models
    const manufacturerModels = await Promise.all(manufacturerModelSeedFn(prisma, manufacturers))
    console.log('--- Seeded Manufacturer Models ---', manufacturerModels)

  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

seedDatabase()
