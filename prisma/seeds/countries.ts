import type { Prisma, PrismaClient } from '@prisma/client'

// Countries
const countries: Prisma.CountryCreateArgs['data'][] = [
  {
    key: 'AU',
    title: 'Australia',
  },
  {
    key: 'CA',
    title: 'Canada',
  },
  {
    key: 'CN',
    title: 'China',
  },
  {
    key: 'DE',
    title: 'Germany',
  },
  {
    key: 'ID',
    title: 'Indonesia',
  },
  {
    key: 'NL',
    title: 'Netherlands',
  },
  {
    key: 'NZ',
    title: 'New Zealand',
  },
  {
    key: 'PT',
    title: 'Portugal',
  },
  {
    key: 'CH',
    title: 'Switzerland',
  },
  {
    key: 'GB',
    title: 'United Kingdom',
  },
  {
    key: 'US',
    title: 'United States',
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
