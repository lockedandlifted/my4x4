import type { ManufacturerType, Prisma, PrismaClient } from '@prisma/client'

// Manufacturers
const seedFn = (prisma: PrismaClient, manufacturerTypes: ManufacturerType[]) => {
  // Parts
  const partManufacturerType = manufacturerTypes.find(manufacturerType => manufacturerType.key === 'part')

  const partManufacturers: Prisma.ManufacturerCreateArgs['data'][] = [
    {
      key: 'afn',
      title: 'AFN',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'airbag_man',
      title: 'Airbag Man',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'arb',
      title: 'ARB',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'bendix',
      title: 'Bendix',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'bfgoodrich',
      title: 'BFGoodrich',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'black_bear',
      title: 'Black Bear',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'black_duck',
      title: 'Black Duck',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'brown_davis',
      title: 'Brown Davis',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'bush_company',
      title: 'The Bush Company',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'bushranger',
      title: 'Bushranger',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'bushwakka',
      title: 'Bushwakka',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'camp_boss',
      title: 'Camp Boss',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'carbon_offroad',
      title: 'Carbon Offroad',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'clearview',
      title: 'Clearview',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'custom_owner',
      title: 'Custom Made (By Owner)',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'custom_fabrication',
      title: 'Fabrication (Custom)',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'custom_lithium',
      title: 'Custom Lithium',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'dirty_life',
      title: 'Dirty Life',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'dobinsons',
      title: 'Dobinsons',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'dometic',
      title: 'Dometic',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'drifta',
      title: 'Drifta',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'drivetech_4x4',
      title: 'Drivetech 4x4',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'ec_offroad',
      title: 'EC Offroad',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'efs',
      title: 'EFS',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'egr',
      title: 'EGR',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'enerdrive',
      title: 'Enerdrive',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'evc',
      title: 'EVC',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'fatz_fabrication',
      title: 'Fatz Fab',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'front_runner',
      title: 'Front Runner',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'fuel_offroad',
      title: 'Fuel Offroad',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'geiser_offroad',
      title: 'Geiser Offroad',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'gme',
      title: 'GME',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'gmf_4x4',
      title: 'GMF 4x4',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'hamer',
      title: 'Hamer',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'hardkorr',
      title: 'Hardkorr',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'harrop',
      title: 'Harrop',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'hema',
      title: 'Hema',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'high_performance_diesel',
      title: 'High Performance Diesel',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'ironman',
      title: 'Ironman',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'jmacx',
      title: 'JMACX',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'kaymar',
      title: 'Kaymar',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'lightforce',
      title: 'Lightforce',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'manta',
      title: 'Manta',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'marks_4wd',
      title: 'Marks4WD',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'maxtrax',
      title: 'Maxtrax',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'maxxis',
      title: 'Maxxis',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'mean_mother',
      title: 'Mean Mother',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'mccormacks_4wd',
      title: 'McCormacks 4WD',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'msa',
      title: 'MSA',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'mycoolman',
      title: 'myCoolman',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'nitto_tire',
      title: 'Nitto Tire',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'norweld',
      title: 'Norweld',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'old_man_emu',
      title: 'Old Man Emu',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'other',
      title: 'Other',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'outback_armour',
      title: 'Outback Armour',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'offroad_animal',
      title: 'Offroad Animal',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'patriot',
      title: 'Patriot',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'phat_bars',
      title: 'Phat Bars',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'piak',
      title: 'Piak',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'pvs_automotive',
      title: 'PVS Automotive',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'redarc',
      title: 'Redarc',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'rhino_rack',
      title: 'Rhino-Rack',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'rigid_industries',
      title: 'Rigid Industries',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'roh_wheels',
      title: 'ROH Wheels',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'runva',
      title: 'Runva',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'safari',
      title: 'Safari 4x4 Engineering',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'saber_offroad',
      title: 'Saber',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'smittybilt',
      title: 'Smittybilt',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'stedi',
      title: 'Stedi',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'supafit',
      title: 'Supafit',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'terrain_tamer',
      title: 'Terrain Tamer',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'tjm',
      title: 'TJM',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'torqit',
      title: 'Torqit',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'tough_dog',
      title: 'Tough Dog',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'toyota_genuine_accessories',
      title: 'Toyota Genuine Accessories',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'uniden',
      title: 'Uniden',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'ultimate_9',
      title: 'Ultimate 9',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'warn',
      title: 'WARN',
      manufacturerTypeId: partManufacturerType?.id,
    },
    {
      key: 'xtm',
      title: 'XTM',
      manufacturerTypeId: partManufacturerType?.id,
    },

  ]

  // Vehicles
  const vehicleManufacturerType = manufacturerTypes.find(manufacturerType => manufacturerType.key === 'vehicle')

  const vehicleManufacturers: Prisma.ManufacturerCreateArgs['data'][] = [
    {
      key: 'ford',
      title: 'Ford',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'toyota',
      title: 'Toyota',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'mazda',
      title: 'Mazda',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'mitsubishi',
      title: 'Mitsubishi',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'nissan',
      title: 'Nissan',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'isuzu',
      title: 'Isuzu',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'jeep',
      title: 'Jeep',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'volkswagen',
      title: 'Volkswagen',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'suzuki',
      title: 'Suzuki',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'ram',
      title: 'Ram',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'land_rover',
      title: 'Land Rover',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'gmc',
      title: 'GMC',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'chevrolet',
      title: 'Chevrolet',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'daihatsu',
      title: 'Daihatsu',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'holden',
      title: 'Holden',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
    {
      key: 'not_listed',
      title: 'Other',
      manufacturerTypeId: vehicleManufacturerType?.id,
    },
  ]

  // Merge Manufacturers
  const mergedManufacturers = [
    ...partManufacturers,
    ...vehicleManufacturers,
  ]

  return mergedManufacturers.map(async (data: Prisma.ManufacturerCreateArgs['data']) => {
    const record = await prisma.manufacturer.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })
}

export default seedFn
