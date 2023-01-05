import type { Prisma, PrismaClient } from '@prisma/client'

// External Link Types
const externalLinkTypes: Prisma.ExternalLinkTypeCreateArgs['data'][] = [
  {
    key: 'facebook',
    title: 'Facebook',
  },
  {
    key: 'instagram',
    title: 'Instagram',
  },
  {
    key: 'patreon',
    title: 'Patreon',
  },
  {
    key: 'tiktok',
    title: 'TikTok',
  },
  {
    key: 'website',
    title: 'Website',
  },
  {
    key: 'youtube',
    title: 'YouTube',
  },
]

const seedFn = (prisma: PrismaClient) => (
  externalLinkTypes.map(async (data: Prisma.ExternalLinkTypeCreateArgs['data']) => {
    const record = await prisma.externalLinkType.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })
)

export default seedFn
