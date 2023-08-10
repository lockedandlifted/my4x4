import { trpc } from '@utils/trpc'

type UseBrowseProjectsByPartOptions = {
  categoryId?: string,
  manufacturerId?: string,
  manufacturerPartId?: string,
}

function useBrowseProjectsByPart(options: UseBrowseProjectsByPartOptions) {
  const { categoryId, manufacturerId, manufacturerPartId } = options

  // Load Categories
  const categoriesQuery = trpc.categories.getCategories.useQuery({ categoryTypeKey: 'part' })
  const { data: categories = [] } = categoriesQuery

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery(
    { manufacturerPartCategoryId: categoryId, include: { manufacturerParts: { include: { category: true } } } },
    { enabled: !!categoryId },
  )
  const { data: manufacturers = [] } = manufacturersQuery

  // Load Manufacturer Parts
  const manufacturerPartsQuery = trpc.manufacturerParts.getManufacturerParts.useQuery(
    { categoryId, manufacturerId },
    { enabled: !!categoryId && !!manufacturerId },
  )
  const { data: manufacturerParts = [] } = manufacturerPartsQuery

  // Load Projects
  const projectsQuery = trpc.projects.getProjects.useQuery({
    limit: 100,
    manufacturerPartCategoryId: categoryId,
    manufacturerPartId,
    partManufacturerId: manufacturerId,
  })
  const { data: projects = [] } = projectsQuery

  return {
    categories,
    manufacturers,
    manufacturerParts,
    projects,
  }
}

export default useBrowseProjectsByPart
