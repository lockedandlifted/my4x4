import type { Attribute, Prisma, PrismaClient } from '@prisma/client'

// Attribute Values
const seedFn = (prisma: PrismaClient, attributes: Attribute[]) => {
  // Build Type
  const buildType = attributes.find(attribute => attribute.key === 'build_type')

  const buildTypeValues: Prisma.AttributeValueCreateArgs['data'][] = [
    {
      key: 'build_type_competition',
      title: 'Competition',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_crawler',
      title: 'Crawler / Tough Trucks',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_daily',
      title: 'Daily Driver',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_heavy_towing',
      title: 'Heavy Towing',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_tourer_casual',
      title: 'Tourer (Casual)',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_tourer_full_time',
      title: 'Tourer (Full-Time)',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_towing',
      title: 'Towing',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_weekender',
      title: 'Weekender',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_winch_truck',
      title: 'Winch Truck',
      attributeId: buildType.id,
    },
    {
      key: 'build_type_work_trails',
      title: 'Work and Trails',
      attributeId: buildType.id,
    },
  ]

  // Diff Lockers
  const diffLockers = attributes.find(attribute => attribute.key === 'diff_lockers')

  const diffLockersValues: Prisma.AttributeValueCreateArgs['data'][] = [
    {
      key: 'diff_lockers_rear',
      title: 'Rear Locker',
      attributeId: diffLockers.id,
    },
    {
      key: 'diff_lockers_front',
      title: 'Front Locker',
      attributeId: diffLockers.id,
    },
    {
      key: 'diff_lockers_twin',
      title: 'Twin Lockers',
      attributeId: diffLockers.id,
    },
  ]

  // Merge Models
  const mergedModels = [
    ...buildTypeValues,
    ...diffLockersValues,
  ]

  const queries = mergedModels.map(async (data: Prisma.AttributeValueCreateArgs['data']) => {
    const record = await prisma.attributeValue.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })

  return queries
}

export default seedFn
