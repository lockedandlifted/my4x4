import type { Prisma } from '@prisma/client'
import { prisma } from '../server/db/client'

const runSeeds = async () => {
  try {
    // Add Seed Data
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

export default runSeeds

