import { prisma } from '../src/server/db/client.js'

import manufacturerSeedFn from './seeds/manufacturers.js'

const seedDatabase = async () => {
  try {
    // Manufacturers
    await Promise.all(manufacturerSeedFn(prisma))
    console.log('--- Seeded Manufacturers ---')

  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

seedDatabase()
