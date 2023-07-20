import type { CategoryType, Prisma, PrismaClient } from '@prisma/client'

// Categories
const seedFn = (prisma: PrismaClient, categoryTypes: CategoryType[]) => {
  // Parts
  const partCategoryType = categoryTypes.find(categoryType => categoryType.key === 'part')

  // Update the icon component if modifying this
  // src/components/Icons/PartIcon/index.tsx
  const partCategories: Prisma.CategoryCreateArgs['data'][] = [
    {
      key: 'accessories',
      title: 'Accessories',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'body',
      title: 'Body',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'protection',
      title: 'Bars & Protection',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'camping_gear',
      title: 'Camping & Shelter',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'communications',
      title: 'Communications',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'driveline',
      title: 'Driveline',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'electronics',
      title: 'Electronics',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'engine',
      title: 'Engine',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'interior',
      title: 'Interior',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'lighting',
      title: 'Lighting',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'recovery',
      title: 'Recovery Gear',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'roof',
      title: 'Roof',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'suspension',
      title: 'Suspension',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'transmission',
      title: 'Transmission',
      categoryTypeId: partCategoryType?.id,
    },
    {
      key: 'wheels_tyres',
      title: 'Wheels & Tyres',
      categoryTypeId: partCategoryType?.id,
    },
  ]

  // Posts
  const postCategoryType = categoryTypes.find(categoryType => categoryType.key === 'post')
  // Update the icon component if modifying this
  // src/components/Icons/PartIcon/index.tsx
  const postCategories: Prisma.CategoryCreateArgs['data'][] = [
    {
      key: 'competitions',
      title: 'Competitions',
      categoryTypeId: postCategoryType?.id,
    },
    {
      key: 'events',
      title: 'Events',
      categoryTypeId: postCategoryType?.id,
    },
    {
      key: 'general',
      title: 'General',
      categoryTypeId: postCategoryType?.id,
    },
    {
      key: 'shed_time',
      title: 'Shed Time',
      categoryTypeId: postCategoryType?.id,
    },
    {
      key: 'technical',
      title: 'Technical',
      categoryTypeId: postCategoryType?.id,
    },
    {
      key: 'trips',
      title: 'Trips',
      categoryTypeId: postCategoryType?.id,
    },
  ]

  const mergedCategories = [
    ...partCategories,
    ...postCategories,
  ]

  return mergedCategories.map(async (data: Prisma.CategoryCreateArgs['data']) => {
    const record = await prisma.category.upsert({
      where: { key: data.key },
      update: data,
      create: data,
    })

    return record
  })
}

export default seedFn
