import prisma from '../src/server/db/client.js'

import attributeSeedFn from './seeds/attributes.js'
import categorySeedFn from './seeds/categories.js'
import categoryTypeSeedFn from './seeds/categoryTypes.js'
import countrySeedFn from './seeds/countries.js'
import externalLinkTypeSeedFn from './seeds/externalLinkTypes.js'
import logBookEntryTypeSeedFn from './seeds/logBookEntryTypes.js'
import manufacturerModelSeedFn from './seeds/manufacturerModels.js'
import manufacturerSeedFn from './seeds/manufacturers.js'
import manufacturerTypeSeedFn from './seeds/manufacturerTypes.js'

const seedDatabase = async () => {
  try {
    // Attributes
    const attributes = await Promise.all(attributeSeedFn(prisma))
    console.log('--- Seeded Attributes ---', attributes)

    // Category Types
    const categoryTypes = await Promise.all(categoryTypeSeedFn(prisma))
    console.log('--- Seeded Category Types ---', categoryTypes)

    // Categories
    const categories = await Promise.all(categorySeedFn(prisma, categoryTypes))
    console.log('--- Seeded Categories ---', categories)

    // Countries
    const countries = await Promise.all(countrySeedFn(prisma))
    console.log('--- Seeded Countries ---', countries)

    // External Link Types
    const externalLinkTypes = await Promise.all(externalLinkTypeSeedFn(prisma))
    console.log('--- Seeded External Link Types ---', externalLinkTypes)

    // Log Book Entry Types
    const logBookEntryTypes = await Promise.all(logBookEntryTypeSeedFn(prisma))
    console.log('--- Seeded Log Book Entry Types ---', logBookEntryTypes)

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
