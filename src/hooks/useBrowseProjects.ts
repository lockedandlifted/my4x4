import { trpc } from '@utils/trpc'

type UseBrowseProjectsOptions = {
  manufacturerId?: string,
  manufacturerModelId?: string,
  manufacturerModelSeriesId?: string,
}

function useBrowseProjects(options: UseBrowseProjectsOptions) {
  const { manufacturerId, manufacturerModelId, manufacturerModelSeriesId } = options

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery({ manufacturerTypeKey: 'vehicle' })
  const { data: manufacturers = [] } = manufacturersQuery

  // Load Models
  const manufacturerModelsQuery = trpc.manufacturerModels.getManufacturerModels.useQuery(
    { manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturerModels = [] } = manufacturerModelsQuery

  // Load Model Series
  const manufacturerModelSeriesQuery = trpc.manufacturerModelSeries.getManufacturerModelSeries.useQuery(
    { manufacturerModelId },
    { enabled: !!manufacturerModelId },
  )
  const { data: manufacturerModelSeries = [] } = manufacturerModelSeriesQuery

  // Load Projects
  const projectsQuery = trpc.projects.getProjects.useQuery({
    limit: 100,
    manufacturerId,
    manufacturerModelId,
    manufacturerModelSeriesId,
  })
  const { data: projects = [] } = projectsQuery

  return {
    manufacturers,
    manufacturerModels,
    manufacturerModelSeries,
    projects,
  }
}

export default useBrowseProjects
