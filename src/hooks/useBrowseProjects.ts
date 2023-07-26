import { trpc } from '@utils/trpc'

type UseBrowseProjectsOptions = {
  manufacturerId?: string,
  manufacturerModelId?: string,
}

function useBrowseProjects(options: UseBrowseProjectsOptions) {
  const { manufacturerId, manufacturerModelId } = options

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery({ manufacturerTypeKey: 'vehicle' })
  const { data: manufacturers = [] } = manufacturersQuery

  // Load Models
  const manufacturerModelsQuery = trpc.manufacturerModels.getManufacturerModels.useQuery(
    { manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturerModels = [] } = manufacturerModelsQuery

  // Load Projects
  const projectsQuery = trpc.projects.getProjects.useQuery({
    limit: 100,
    manufacturerId,
    manufacturerModelId,
  })
  const { data: projects = [] } = projectsQuery

  return {
    manufacturers,
    manufacturerModels,
    projects,
  }
}

export default useBrowseProjects
