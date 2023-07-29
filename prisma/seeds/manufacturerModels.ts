import type { Prisma, PrismaClient, Manufacturer } from '@prisma/client'

// Manufacturer Models
const seedFn = (prisma: PrismaClient, manufacturers: Manufacturer[]) => {
  // Ford
  const ford = manufacturers.find(manufacturer => manufacturer.key === 'ford')

  const fordModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'ford_ranger',
      title: 'Ranger',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_ranger_raptor',
      title: 'Ranger Raptor',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_everest',
      title: 'Everest',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_f150',
      title: 'F-150',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_f150_raptor',
      title: 'F-150 Raptor',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_f250',
      title: 'F-250',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_f350',
      title: 'F-350',
      manufacturerId: ford.id,
    },
    {
      key: 'ford_maverick',
      title: 'Maverick',
      manufacturerId: ford.id,
    },
  ]

  // Isuzu
  const isuzu = manufacturers.find(manufacturer => manufacturer.key === 'isuzu')

  const isuzuModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'isuzu_dmax',
      title: 'D-MAX',
      manufacturerId: isuzu.id,
    },
    {
      key: 'isuzu_mux',
      title: 'MU-X',
      manufacturerId: isuzu.id,
    },
    {
      key: 'isuzu_fss',
      title: 'FSS (Truck)',
      manufacturerId: isuzu.id,
    },
    {
      key: 'isuzu_fts',
      title: 'FTS (Truck)',
      manufacturerId: isuzu.id,
    },
    {
      key: 'isuzu_nls',
      title: 'NLS (Truck)',
      manufacturerId: isuzu.id,
    },
    {
      key: 'isuzu_nps',
      title: 'NPS (Truck)',
      manufacturerId: isuzu.id,
    },
  ]

  // Jeep
  const jeep = manufacturers.find(manufacturer => manufacturer.key === 'jeep')

  const jeepModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'jeep_wrangler',
      title: 'Wrangler',
      manufacturerId: jeep.id,
    },
    {
      key: 'jeep_gladiator',
      title: 'Gladiator',
      manufacturerId: jeep.id,
    },
    {
      key: 'jeep_grand_cherokee',
      title: 'Grand Cherokee',
      manufacturerId: jeep.id,
    },
  ]

  // Mazda
  const mazda = manufacturers.find(manufacturer => manufacturer.key === 'mazda')

  const mazdaModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'mazda_bt50',
      title: 'BT 50',
      manufacturerId: mazda.id,
    },
  ]

  // Mitsubishi
  const mitsubishi = manufacturers.find(manufacturer => manufacturer.key === 'mitsubishi')

  const mitsubishiModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'mitsubishi_triton',
      title: 'Triton',
      manufacturerId: mitsubishi.id,
    },
    {
      key: 'mitsubishi_pajero',
      title: 'Pajero',
      manufacturerId: mitsubishi.id,
    },
    {
      key: 'mitsubishi_delica',
      title: 'Delica',
      manufacturerId: mitsubishi.id,
    },
    {
      key: 'mitsubishi_challenger',
      title: 'Challenger',
      manufacturerId: mitsubishi.id,
    },

  ]

  // Nissan
  const nissan = manufacturers.find(manufacturer => manufacturer.key === 'nissan')

  const nissanModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'nissan_patrol',
      title: 'Patrol',
      manufacturerId: nissan.id,
    },
    {
      key: 'nissan_navara',
      title: 'Navara',
      manufacturerId: nissan.id,
    },
    {
      key: 'nissan_pathfinder',
      title: 'Pathfinder',
      manufacturerId: nissan.id,
    },

  ]

  // Toyota
  const toyota = manufacturers.find(manufacturer => manufacturer.key === 'toyota')

  const toyotaModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'toyota_4_runner',
      title: '4Runner',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_fj_cruiser',
      title: 'FJ Cruiser',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_fortuner',
      title: 'Fortuner',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_hilux',
      title: 'Hilux',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_hilux_surf',
      title: 'Hilux Surf',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_land_cruiser',
      title: 'LandCruiser',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_prado',
      title: 'Prado',
      manufacturerId: toyota.id,
    },
    {
      key: 'toyota_tundra',
      title: 'Tundra',
      manufacturerId: toyota.id,
    },
  ]

  // Volkswagen
  const volkswagen = manufacturers.find(manufacturer => manufacturer.key === 'volkswagen')

  const volkswagenModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'volkswagen_amarok',
      title: 'Amarok',
      manufacturerId: volkswagen.id,
    },
  ]

  // Suzuki
  const suzuki = manufacturers.find(manufacturer => manufacturer.key === 'suzuki')

  const suzukiModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'suzuki_jimny',
      title: 'Jimny',
      manufacturerId: suzuki.id,
    },
    {
      key: 'suzuki_sierra',
      title: 'Sierra',
      manufacturerId: suzuki.id,
    },
    {
      key: 'suzuki_grand_vitara',
      title: 'Grand Vitara',
      manufacturerId: suzuki.id,
    },
  ]

  // Chevrolet
  const chevrolet = manufacturers.find(manufacturer => manufacturer.key === 'chevrolet')

  const chevroletModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'chevrolet_silverado_1500',
      title: 'Silverado 1500',
      manufacturerId: chevrolet.id,
    },
  ]

  // Land Rover
  const landRover = manufacturers.find(manufacturer => manufacturer.key === 'land_rover')

  const landRoverModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'land_rover_defender',
      title: 'Defender',
      manufacturerId: landRover.id,
    },
    {
      key: 'land_rover_discovery',
      title: 'Discovery',
      manufacturerId: suzuki.id,
    },
  ]

  // GMC
  const gmc = manufacturers.find(manufacturer => manufacturer.key === 'gmc')

  const gmcModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'gmc_sierra_1500',
      title: 'Sierra 1500',
      manufacturerId: gmc.id,
    },
  ]

  // Ram
  const ram = manufacturers.find(manufacturer => manufacturer.key === 'ram')

  const ramModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'ram_1500',
      title: '1500',
      manufacturerId: ram.id,
    },
    {
      key: 'ram_1500_TRX',
      title: '1500 TRX',
      manufacturerId: ram.id,
    },
    {
      key: 'ram_2500',
      title: '2500',
      manufacturerId: ram.id,
    },
    {
      key: 'ram_3500',
      title: '3500',
      manufacturerId: ram.id,
    },
  ]

  // Daihatsu
  const daihatsu = manufacturers.find(manufacturer => manufacturer.key === 'daihatsu')

  const daihatsuModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'daihatsu_terios',
      title: 'Terios',
      manufacturerId: daihatsu.id,
    },
  ]

  // Holden
  const holden = manufacturers.find(manufacturer => manufacturer.key === 'holden')

  const holdenModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'holden_rodeo',
      title: 'Rodeo',
      manufacturerId: holden.id,
    },
    {
      key: 'holden_colorado',
      title: 'Colorado',
      manufacturerId: holden.id,
    },
  ]

  // Subaru
  const subaru = manufacturers.find(manufacturer => manufacturer.key === 'subaru')

  const subaruModels: Prisma.ManufacturerModelCreateArgs['data'][] = [
    {
      key: 'subaru_brumby',
      title: 'Brumby',
      manufacturerId: subaru.id,
    },
  ]

  // Merge Models
  const mergedModels = [
    ...fordModels,
    ...isuzuModels,
    ...jeepModels,
    ...mazdaModels,
    ...nissanModels,
    ...mitsubishiModels,
    ...toyotaModels,
    ...ramModels,
    ...volkswagenModels,
    ...chevroletModels,
    ...suzukiModels,
    ...landRoverModels,
    ...daihatsuModels,
    ...holdenModels,
    ...gmcModels,
    ...subaruModels,
  ]

  const queries = mergedModels.map(async (data: Prisma.ManufacturerModelCreateArgs['data']) => {
    const record = await prisma.manufacturerModel.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })

  return queries
}

export default seedFn
