import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ProjectsPart } from '@prisma/client'

import { trpc } from '@utils/trpc'

import { createProjectsPartValidationSchema } from '@validationSchemas/projectsPart'

const defaultState = {
  categoryId: undefined,
  description: undefined,
  installedAt: undefined,
  manufacturerId: '',
  manufacturerPartId: '',
  partNumber: '',
  projectId: '',
  title: '',
}

type CreateProjectsPartParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
  temporaryUserId?: string,
}

const createProjectsPart = (params: CreateProjectsPartParams) => {
  const { data, mutation } = params
  return mutation.mutate(data)
}

const setupProjectPartInitialState = (projectsPart: ProjectsPart) => {
  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = projectsPart[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  if (projectsPart.manufacturerModel?.manufacturer) {
    initialState.manufacturerId = projectsPart.manufacturerModel?.manufacturer.id
  }

  return initialState
}

type UseProjectPartFormOptions = {
  projectsPart?: ProjectsPart,
}

function useProjectsPartForm(options: UseProjectPartFormOptions) {
  const { projectsPart } = options

  const formPayload = useForm({
    defaultValues: projectsPart ? setupProjectPartInitialState(projectsPart) : defaultState,
    mode: 'onChange',
    resolver: zodResolver(createProjectsPartValidationSchema, undefined),
  })

  const { watch } = formPayload
  const manufacturerId = watch('manufacturerId')
  const title = watch('title')

  // Load Categories
  const categoriesQuery = trpc.categories.getCategories.useQuery({ categoryType: 'part' })
  const { data: categories = [] } = categoriesQuery

  // Load Manufacturers
  const manufacturersQuery = trpc.manufacturers.getManufacturers.useQuery({ manufacturerType: 'part' })
  const { data: manufacturers = [] } = manufacturersQuery

  // Create Mutation
  const { projectsParts: { getProjectsParts: { setData: setGetProjectsPartsData } } } = trpc.useContext()

  const createProjectsPartMutation = trpc.projectsParts.createProjectsPart.useMutation({
    onSuccess: (data) => {
      setGetProjectsPartsData({
        projectId: data.projectId,
        include: {
          manufacturerPart: {
            include: {
              category: true,
              manufacturer: true,
            },
          },
        },
      }, prevData => (prevData ? [...prevData, data] : [data]))
    },
  })

  // Update Mutation
  // const updateProjectsPartMutation = trpc.projectsParts.updateProjectById.useMutation({
  //   onSuccess: (data) => {
  //     const [_, project] = data

  //     if (router.pathname !== '/projects/[projectId]/edit'){
  //       router.push(`/projects/${project.id}/edit`)
  //     }
  //   }
  // })

  return {
    callbacks: {
      createProjectsPart: (data: typeof defaultState) => (
        createProjectsPart({ data, mutation: createProjectsPartMutation })
      ),
    },
    categories,
    formPayload,
    manufacturerId,
    manufacturers,
    mutations: {
      createProjectsPart: createProjectsPartMutation,
    },
    projectsPart,
    title,
  }
}

export default useProjectsPartForm
