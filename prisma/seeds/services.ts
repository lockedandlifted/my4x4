import type { Prisma, PrismaClient } from '@prisma/client'

// Services
const services: Prisma.ServiceCreateArgs['data'][] = [
  {
    key: 'accessory_fitting',
    title: 'Accessory Fitting',
  },
  {
    key: 'auto_electrical',
    title: 'Auto Electrical',
  },
  {
    key: 'build_concierge',
    title: 'Build (Full Concierge)',
  },
  {
    key: 'fabrication',
    title: 'Fabrication',
  },
  {
    key: 'mechanic_general',
    title: 'Mechanic (General)',
  },
  {
    key: 'paint_protection',
    title: 'Paint Protection & Wraps',
  },
  {
    key: 'suspension',
    title: 'Suspension',
  },
  {
    key: 'tuning_performance',
    title: 'Performance & Tuning',
  },
  {
    key: 'wheels_tyres',
    title: 'Wheels & Tyres',
  },
  {
    key: 'window_tining',
    title: 'Window Tinting',
  },
]

const seedFn = (prisma: PrismaClient) => services.map(async (data: Prisma.ServiceCreateArgs['data']) => {
  const record = await prisma.service.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
