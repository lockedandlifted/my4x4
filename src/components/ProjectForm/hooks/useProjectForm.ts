import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import cuid from 'cuid'

import type { Manufacturer, ManufacturerModel, Project } from '@prisma/client'

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
  yearManufactured?: string,
}

const buildProjectTitle = (params: BuildProjectTitleParams) => {
  const { manufacturer, manufacturerModel, yearManufactured } = params

  let title = `${manufacturer.title} ${manufacturerModel.title}`
  if (yearManufactured) title = `${yearManufactured} ${title}`

  return title
}

type CreateProjectParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState & { temporaryUserId: string }) => void,
  },
  temporaryUserId: string,
}

const createProject = (params: CreateProjectParams) => {
  const { data, mutation, temporaryUserId } = params

  const updatedData = {
    ...data,
    temporaryUserId,
  }

  if (data.colour){
    updatedData.projectsAttributes.push({
      key: 'colour',
      value: data.colour,
    })
  }

  if (data.yearManufactured){
    updatedData.projectsAttributes.push({
      key: 'year_manufactured',
      value: data.yearManufactured,
    })
  }

  return mutation.mutate(updatedData)
}

type ProjectAttribute = {
  key: string,
  value: string,
}

type DefaultState = {
  colour: string,
  manufacturerId: string,
  manufacturerModelId: string,
  projectsAttributes: ProjectAttribute[],
  slug: string,
  title: string,
  yearManufactured: string,
}

const defaultState: DefaultState = {
  colour: '',
  manufacturerId: '',
  manufacturerModelId: '',
  projectsAttributes: [],
  slug: '',
  title: '',
  yearManufactured: '',
}

type UseProjectFormOptions = {
  project?: Project,
  temporaryUserId: string,
}

function useProjectForm(options: UseProjectFormOptions){
  const { project, temporaryUserId } = options ?? {}

  const router = useRouter()

  const formPayload = useForm({
    defaultValues: defaultState,
    mode: "onChange",
  })

  const { setValue, watch } = formPayload
  const manufacturerId = watch('manufacturerId')
  const manufacturerModelId = watch('manufacturerModelId')
  const yearManufactured = watch('yearManufactured')

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery()
  const { data: manufacturers = [] } = manufacturersQuery

  // Load Models
  const manufacturerModelsQuery = trpc.manufacturerModels.getManufacturerModels.useQuery(
    { manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturerModels = [] } = manufacturerModelsQuery

  // Selected Entities
  const selectedManufacturer = manufacturers.find((manufacturer) => manufacturer.id === manufacturerId)
  const selectedManufacturerModel = manufacturerModels.find((model) => model.id === manufacturerModelId)

  // Build Project Title
  useEffect(() => {
    if (selectedManufacturer?.id && selectedManufacturerModel?.id){
      const title = buildProjectTitle({
        manufacturer: selectedManufacturer,
        manufacturerModel: selectedManufacturerModel,
        yearManufactured,
      })

      if (title){
        setValue('title', title)
        setValue('slug', buildProjectSlug({ title }))
      }
    }
  }, [selectedManufacturer, selectedManufacturerModel, setValue, yearManufactured])

  // Create Mutation
  const createProjectMutation = trpc.projects.createProject.useMutation({
    onSuccess: (data) => {
      const { slug } = data
      router.push(`/${slug}`)
    },
  })

  return {
    callbacks: {
      submitForm: (data: typeof defaultState) => createProject({ data, mutation: createProjectMutation, temporaryUserId }),
    },
    formPayload,
    manufacturers,
    manufacturerModels,
    mutations: {
      createProject: createProjectMutation,
    },
    project,
  }
}

export default useProjectForm
