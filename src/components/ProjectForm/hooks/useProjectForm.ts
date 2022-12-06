import { useForm } from 'react-hook-form'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

type CreateProjectParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
}

const createProject = (params: CreateProjectParams) => {
  const { data, mutation } = params
  mutation.mutate(data)
}

const defaultState = {
  colour: '',
  manufacturerId: '',
  manufacturerModelId: '',
  year: '',
}

function useProjectForm(project?: Project){
  const formPayload = useForm({
    defaultValues: defaultState,
    mode: "onChange",
  })

  const { watch } = formPayload
  const manufacturerId = watch('manufacturerId')

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery()
  const { data: manufacturers = [] } = manufacturersQuery

  // Load Models
  const manufacturerModelsQuery = trpc.manufacturerModels.getManufacturerModels.useQuery(
    { manufacturerId },
    { enabled: !!manufacturerId },
  )
  const { data: manufacturerModels = [] } = manufacturerModelsQuery

  // Create Mutation
  const createProjectMutation = trpc.projects.createProject.useMutation()

  return {
    callbacks: {
      submitForm: (data: typeof defaultState) => createProject({ data, mutation: createProjectMutation }),
    },
    formPayload,
    manufacturers,
    manufacturerModels,
    project,
  }
}

export default useProjectForm
