import type { Prisma, PrismaClient } from '@prisma/client'

// Countries
const countries: Prisma.CountryCreateArgs['data'][] = [
  {
    key: 'AU',
    title: 'Australia',
  },
  {
    key: 'CN',
    title: 'China',
  },
  {
    key: 'ZA',
    title: 'South Africa',
  },
]

const seedFn = (prisma: PrismaClient) => countries.map(async (data: Prisma.CountryCreateArgs['data']) => {
  const record = await prisma.country.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
