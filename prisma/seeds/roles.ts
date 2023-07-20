import type { Prisma, PrismaClient } from '@prisma/client'

// Roles
const roles: Prisma.RoleCreateArgs['data'][] = [
  {
    key: 'admin',
    title: 'Admin',
  },
]

const seedFn = (prisma: PrismaClient) => roles.map(async (data: Prisma.RoleCreateArgs['data']) => {
  const record = await prisma.role.upsert({
    where: { key: data.key },
    update: data,
    create: data,
  })

  return record
})

export default seedFn
