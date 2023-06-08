import type {
  Prisma, PrismaClient, ManufacturerModel, ManufacturerModelSeries,
} from '@prisma/client'

// Manufacturer Model Series
const seedFn = (prisma: PrismaClient, manufacturerModels: ManufacturerModel[]) => {
  // Ford Ranger
  const fordRanger = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_ranger')

  const fordRangerSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'ford_ranger_pj',
      title: 'PJ',
      manufacturerModelId: fordRanger.id,
    },
    {
      key: 'ford_ranger_pk',
      title: 'PK',
      manufacturerModelId: fordRanger.id,
    },
    {
      key: 'ford_ranger_px1',
      title: 'PX1',
      manufacturerModelId: fordRanger.id,
    },
    {
      key: 'ford_ranger_px2',
      title: 'PX2',
      manufacturerModelId: fordRanger.id,
    },
    {
      key: 'ford_ranger_px3',
      title: 'PX3',
      manufacturerModelId: fordRanger.id,
    },
    {
      key: 'ford_ranger_py',
      title: 'PY',
      manufacturerModelId: fordRanger.id,
    },
  ]

  // Ford Ranger Raptor
  const fordRangerRaptor = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_ranger_raptor')

  const fordRangerRaptorSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'ford_ranger_raptor_px3',
      title: 'PX3',
      manufacturerModelId: fordRangerRaptor.id,
    },
    {
      key: 'ford_ranger_raptor_py',
      title: 'PY',
      manufacturerModelId: fordRangerRaptor.id,
    }
  ]

  // Ford Everest
  const fordEverest = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_everest')

  const fordEverestSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'ford_everest_ua',
      title: 'UA',
      manufacturerModelId: fordEverest.id,
    },
    {
      key: 'ford_everest_UA2',
      title: 'UA2',
      manufacturerModelId: fordEverest.id,
    }
  ]

  // Ford F-150
  const fordF150 = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_f150')

  const fordF150Series: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'ford_f150_1012',
      title: '1012',
      manufacturerModelId: fordF150.id,
    },
    {
      key: 'ford_f150_1022',
      title: '1022',
      manufacturerModelId: fordF150.id,
    },
  ]

  // Ford Maverick
  const fordMaverick = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'ford_maverick')

  const fordMaverickSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'ford_maverick_y60',
      title: 'Y60',
      manufacturerModelId: fordMaverick.id,
    },
  ]

  // Isuzu D-MAX
  const isuzuDmax = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'isuzu_dmax')

  const isuzuDmaxSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'isuzu_dmax_rt',
      title: 'RT',
      manufacturerModelId: isuzuDmax.id,
    },
    {
      key: 'isuzu_dmax_rg',
      title: 'RG',
      manufacturerModelId: isuzuDmax.id,
    },
  ]

  // Isuzu MU-X
  const isuzuMux = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'isuzu_mux')

  const isuzuMuxSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'isuzu_mux_rj',
      title: 'RJ',
      manufacturerModelId: isuzuMux.id,
    },
  ]

  // Jeep Wrangler
  const jeepWrangler = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'jeep_wrangler')

  const jeepWranglerSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'jeep_wrangler_tj',
      title: 'TJ',
      manufacturerModelId: jeepWrangler.id,
    },
  ]

  // Mazda BT-50
  const mazdaBt50 = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'mazda_bt50')

  const mazdaBt50Series: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'mazda_bt50_ur',
      title: 'UR',
      manufacturerModelId: mazdaBt50.id,
    },
    {
      key: 'mazda_bt50_up',
      title: 'UP',
      manufacturerModelId: mazdaBt50.id,
    },
    {
      key: 'mazda_bt50_tf',
      title: 'TF',
      manufacturerModelId: mazdaBt50.id,
    },
  ]

  // Mitsubishi Triton
  const mitsubishiTriton = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'mitsubishi_triton')

  const mitsubishiTritonSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'mitsubishi_triton_mq',
      title: 'MQ',
      manufacturerModelId: mitsubishiTriton.id,
    },
    {
      key: 'mitsubishi_triton_mr',
      title: 'MR',
      manufacturerModelId: mitsubishiTriton.id,
    },
  ]

  // Mitsubishi Pajero
  const mitsubishiPajero = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'mitsubishi_pajero')

  const mitsubishiPajeroSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'mitsubishi_pajero_np',
      title: 'NP',
      manufacturerModelId: mitsubishiPajero.id,
    },
    {
      key: 'mitsubishi_pajero_ns',
      title: 'NS',
      manufacturerModelId: mitsubishiPajero.id,
    },
  ]

  // Nissan Patrol
  const nissanPatrol = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'nissan_patrol')

  const nissanPatrolSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'nissan_patrol_mq',
      title: 'MQ',
      manufacturerModelId: nissanPatrol.id,
    },
    {
      key: 'nissan_patrol_y60',
      title: 'GQ/Y60',
      manufacturerModelId: nissanPatrol.id,
    },
    {
      key: 'nissan_patrol_y61',
      title: 'GU/Y61',
      manufacturerModelId: nissanPatrol.id,
    },
    {
      key: 'nissan_patrol_y62',
      title: 'Y62',
      manufacturerModelId: nissanPatrol.id,
    },
  ]

  // Nissan Navara
  const nissanNavara = manufacturerModels.find(manufacturerModel => manufacturerModel.key === 'nissan_navara')

  const nissanNavaraSeries: Prisma.ManufacturerModelSeriesCreateArgs['data'][] = [
    {
      key: 'nissan_navara_d22',
      title: 'D22',
      manufacturerModelId: nissanNavara.id,
    },
    {
      key: 'nissan_navara_d40',
      title: 'D40',
      manufacturerModelId: nissanNavara.id,
    },
    {
      key: 'nissan_navara_d23',
      title: 'D23/NP300',
      manufacturerModelId: nissanNavara.id,
    },
  ]


  // Merge Series
  const mergedSeries = [
    ...fordRangerSeries,
    ...fordRangerRaptorSeries,
    ...fordEverestSeries,
    ...fordF150Series,
    ...fordMaverickSeries,
    ...isuzuDmaxSeries,
    ...isuzuMuxSeries,
    ...jeepWranglerSeries,
    ...mazdaBt50Series,
    ...mitsubishiTritonSeries,
    ...mitsubishiPajeroSeries,
    ...nissanPatrolSeries,
    ...nissanNavaraSeries,
  ]

  const queries = mergedSeries.map(async (data: Prisma.ManufacturerModelSeriesCreateArgs['data']) => {
    const record = await prisma.manufacturerModelSeries.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })

  return queries
}

export default seedFn
