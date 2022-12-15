import prisma from '../src/server/db/client.js'

import attributeSeedFn from './seeds/attributes.js'
import manufacturerModelSeedFn from './seeds/manufacturerModels.js'
import manufacturerSeedFn from './seeds/manufacturers.js'
import manufacturerTypeSeedFn from './seeds/manufacturerTypes.js'
import countrySeedFn from './seeds/countries.js'

const seedDatabase = async () => {
  try {
    // Attributes
    const attributes = await Promise.all(attributeSeedFn(prisma))
    console.log('--- Seeded Attributes ---', attributes)

    // Countries
    const countries = await Promise.all(countrySeedFn(prisma))
    console.log('--- Seeded Countries ---', countries)

    // Manufacturer Types
    const manufacturerTypes = await Promise.all(manufacturerTypeSeedFn(prisma))
    console.log('--- Seeded Manufacturer Types ---', manufacturerTypes)

    // Manufacturers
    const manufacturers = await Promise.all(manufacturerSeedFn(prisma, manufacturerTypes))
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
