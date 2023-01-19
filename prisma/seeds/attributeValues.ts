import type { Attribute, Prisma, PrismaClient } from '@prisma/client'

// Attribute Values
const seedFn = (prisma: PrismaClient, attributes: Attribute[]) => {
  // Aspiration
  const engineAspiration = attributes.find(attribute => attribute.key === 'engine_aspiration')

  const engineAspirationValues: Prisma.AttributeValueCreateArgs['data'][] = [
    {
      key: 'engine_aspiration_na',
      title: 'Naturally Aspirated',
      attributeId: engineAspiration.id,
    },
    {
      key: 'engine_aspiration_turbo',
      title: 'Turbocharged',
      attributeId: engineAspiration.id,
    },
    {
      key: 'engine_aspiration_twin_turbo',
      title: 'Twin Turbo',
      attributeId: engineAspiration.id,
    },
    {
      key: 'engine_aspiration_compound_turbo',
      title: 'Compound Turbo',
      attributeId: engineAspiration.id,
    },
    {
      key: 'engine_aspiration_supercharged',
      title: 'Supercharged',
      attributeId: engineAspiration.id,
    },
  ]

  // Body Type
  const bodyType = attributes.find(attribute => attribute.key === 'body_type')

  const bodyTypeValues: Prisma.AttributeValueCreateArgs['data'][] = [
    {
      key: 'body_type_single_cab',
      title: 'Single Cab Ute',
      attributeId: bodyType.id,
    },
    {
      key: 'body_type_space_cab',
      title: 'Space/Extra Cab Ute',
      attributeId: bodyType.id,
    },
    {
      key: 'body_type_dual_cab',
      title: 'Dual Cab Ute',
      attributeId: bodyType.id,
    },
    {
      key: 'body_type_wagon',
      title: 'Wagon',
      attributeId: bodyType.id,
    },
    {
      key: 'body_type_wagon_chopped',
      title: 'Wagon (Chopped)',
      attributeId: bodyType.id,
    },
    {
      key: 'body_type_van',
      title: 'Van',
      attributeId: bodyType.id,
    },
    {
      key: 'body_type_truck',
      title: 'Truck',
      attributeId: bodyType.id,
    },
  ]

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
      key: 'build_type_others',
      title: 'Other',
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
      title: 'Twin Locked',
      attributeId: diffLockers.id,
    },
  ]

  // Tyre Terrain
  const tyreTerrain = attributes.find(attribute => attribute.key === 'tyre_terrain')

  const tyreTerrainValues: Prisma.AttributeValueCreateArgs['data'][] = [
    {
      key: 'tyre_terrain_stock',
      title: 'Stock',
      attributeId: tyreTerrain.id,
    },
    {
      key: 'tyre_terrain_road',
      title: 'Road (Highway Terrain)',
      attributeId: tyreTerrain.id,
    },
    {
      key: 'tyre_terrain_all_terrain',
      title: 'All Terrain',
      attributeId: tyreTerrain.id,
    },
    {
      key: 'tyre_terrain_mud_terrain',
      title: 'Mud Terrain',
      attributeId: tyreTerrain.id,
    },
    {
      key: 'tyre_terrain_competition',
      title: 'Comp/Crawler Terrain',
      attributeId: tyreTerrain.id,
    },
  ]

  // Merge Models
  const mergedModels = [
    ...bodyTypeValues,
    ...buildTypeValues,
    ...diffLockersValues,
    ...engineAspirationValues,
    ...tyreTerrainValues,
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
