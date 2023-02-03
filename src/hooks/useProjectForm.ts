import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import cuid from 'cuid'

import type {
  Manufacturer, ManufacturerModel, Project, ProjectsAttribute,
} from '@prisma/client'

import { trpc } from '@utils/trpc'
import { kebabCase } from '@utils/string'

const buildProjectSlug = (
  params: { title: string },
) => {
  const { title } = params
  return `${kebabCase(title)}-${cuid()}`
}

type BuildProjectTitleParams = {
  manufacturer: Manufacturer,
  manufacturerModel: ManufacturerModel,
  modelSeries?: string,
  yearManufactured?: string,
}

const buildProjectTitle = (params: BuildProjectTitleParams) => {
  const {
    manufacturer, manufacturerModel, modelSeries, yearManufactured,
  } = params

  let title = `${manufacturer.title} ${manufacturerModel.title}`
  if (yearManufactured) title = `${yearManufactured} ${title}`
  if (modelSeries) title = `${title} ${modelSeries}`

  return title
}

type CreateProjectParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState & { temporaryUserId: string }) => void,
  },
  temporaryUserId?: string,
}

const createProject = (params: CreateProjectParams) => {
  const { data, mutation, temporaryUserId } = params

  const updatedData = {
    ...data,
    temporaryUserId,
  }

  if (data.attributes) {
    updatedData.projectsAttributes = Object.keys(data.attributes).map(attributeKey => ({
      key: attributeKey,
      value: data.attributes[attributeKey],
    }))
  }

  return mutation.mutate(updatedData)
}

type UpdateProjectParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
  project?: Project,
}

const updateProject = (params: UpdateProjectParams) => {
  const { data, mutation, project } = params

  const updatedData = {
    ...data,
    id: project?.id,
  }

  if (data.attributes) {
    updatedData.projectsAttributes = Object.keys(data.attributes).map(attributeKey => ({
      key: attributeKey,
      value: data.attributes[attributeKey],
    }))
  }

  return mutation.mutate(updatedData)
}

type DefaultState = {
  attributes: {
    colour: string,
    model_series: string,
    year_manufactured: string,
    [key: string]: string,
  },
  createdByOwner: boolean,
  description: string,
  manufacturerId: string,
  manufacturerModelId: string,
  projectsAttributes: { key: string, value: string }[],
  slug: string,
  title: string,
}

const defaultState: DefaultState = {
  attributes: {
    colour: '',
    model_series: '',
    year_manufactured: '',
  },
  createdByOwner: false,
  description: '',
  manufacturerId: '',
  manufacturerModelId: '',
  projectsAttributes: [],
  slug: '',
  title: '',
}

const setupProjectInitialState = (project: Project) => {
  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = project[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  if (project.manufacturerModel?.manufacturer) {
    initialState.manufacturerId = project.manufacturerModel?.manufacturer.id
  }

  if (project.projectsAttributes) {
    initialState.projectsAttributes = []

    project.projectsAttributes.forEach((projectsAttribute: ProjectsAttribute) => {
      const { attribute, value } = projectsAttribute

      if (attribute?.key) {
        initialState.attributes[attribute.key] = value
      }
    })
  }

  return initialState
}

type UseProjectFormOptions = {
  project?: Project,
  temporaryUserId?: string,
}

function useProjectForm(options: UseProjectFormOptions) {
  const { project, temporaryUserId } = options ?? {}

  const router = useRouter()

  const formPayload = useForm({
    defaultValues: project?.id ? setupProjectInitialState(project) : defaultState,
    mode: 'onChange',
  })

  const { setValue, watch } = formPayload
  const createdByOwner = watch('createdByOwner')
  const manufacturerId = watch('manufacturerId')
  const manufacturerModelId = watch('manufacturerModelId')
  const modelSeries = watch('attributes.model_series')
  const projectSlug = watch('slug')
  const yearManufactured = watch('attributes.year_manufactured')

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery({ manufacturerTypeKey: 'vehicle' })
  const { data: manufacturers = [] } = manufacturersQuery

  // Load Models
  const manufacturerModelsQuery = trpc.manufacturerModels.getManufacturerModels.useQuery(
    { manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturerModels = [] } = manufacturerModelsQuery

  // Load Attributes
  const attributesQuery = trpc.attributes.getAttributes.useQuery()
  const { data: attributes = [] } = attributesQuery

  // Selected Entities
  const selectedManufacturer = manufacturers.find(manufacturer => manufacturer.id === manufacturerId)
  const selectedManufacturerModel = manufacturerModels.find(model => model.id === manufacturerModelId)

  // Build Project Title
  useEffect(() => {
    if (selectedManufacturer?.id && selectedManufacturerModel?.id) {
      const title = buildProjectTitle({
        manufacturer: selectedManufacturer,
        manufacturerModel: selectedManufacturerModel,
        modelSeries,
        yearManufactured,
      })

      if (!project?.id && title) {
        setValue('title', title)
        if (!project?.slug) setValue('slug', buildProjectSlug({ title }))
      }
    }
  }, [
    modelSeries,
    project?.id,
    project?.slug,
    selectedManufacturer,
    selectedManufacturerModel,
    setValue,
    yearManufactured,
  ])

  // Create Mutation
  const createProjectMutation = trpc.projects.createProject.useMutation({
    onSuccess: (data) => {
      const { id } = data
      router.push(`/projects/${id}/edit`)
    },
  })

  // Update Mutation
  const { projects: { getProjectById: { invalidate: invalidateGetProjectById } } } = trpc.useContext()

  const updateProjectMutation = trpc.projects.updateProjectById.useMutation({
    onSuccess: (data) => {
      const [_, project] = data

      if (router.pathname !== '/projects/[projectId]/edit') {
        router.push(`/projects/${project.id}/edit`)
      } else {
        invalidateGetProjectById({ id: project?.id })
      }
    },
  })

  return {
    attributes,
    callbacks: {
      createProject: (data: typeof defaultState) => createProject({ data, mutation: createProjectMutation, temporaryUserId }),
      updateProject: (data: typeof defaultState) => updateProject({ data, mutation: updateProjectMutation, project }),
    },
    createdByOwner,
    formPayload,
    manufacturerId,
    manufacturerModelId,
    manufacturers,
    manufacturerModels,
    mutations: {
      createProject: createProjectMutation,
      updateProject: updateProjectMutation,
    },
    project,
    projectSlug,
  }
}

export default useProjectForm
