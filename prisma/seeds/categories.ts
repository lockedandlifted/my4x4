import type { CategoryType, Prisma, PrismaClient } from '@prisma/client'

// Categories
const seedFn = (prisma: PrismaClient, categoryTypes: CategoryType[]) => {
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

  const mergedCategories = [
    ...partCategories,
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
