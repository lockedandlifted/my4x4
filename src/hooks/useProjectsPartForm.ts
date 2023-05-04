import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ProjectsPart } from '@prisma/client'

import { trpc } from '@utils/trpc'

import { createProjectsPartValidationSchema } from '@validationSchemas/projectsPart'

const defaultState = {
  categoryId: undefined,
  description: undefined,
  installedAt: undefined,
  installedByBusinessId: undefined,
  installedByBusinessTitle: undefined,
  manufacturerId: '',
  manufacturerPartId: '',
  manufacturerTitle: '',
  partNumber: '',
  projectId: '',
  title: '',
}

type DeleteProjectsPartParams = {
  mutation: {
    mutate: (data: { id: string }) => void,
  },
  projectsPart: ProjectsPart,
}

const deleteProjectsPart = (params: DeleteProjectsPartParams) => {
  const { mutation, projectsPart } = params
  return mutation.mutate({ id: projectsPart.id })
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

  const router = useRouter()

  const formPayload = useForm({
    mode: 'onChange',
    resolver: zodResolver(createProjectsPartValidationSchema, undefined),
    values: projectsPart ? setupProjectPartInitialState(projectsPart) : defaultState,
  })

  const { watch } = formPayload
  const installedByBusinessTitle = watch('installedByBusinessTitle')
  const manufacturerId = watch('manufacturerId')
  const manufacturerTitle = watch('manufacturerTitle')
  const title = watch('title')

  // Load Categories
  const categoriesQuery = trpc.categories.getCategories.useQuery({ categoryType: 'part' })
  const { data: categories = [] } = categoriesQuery

  // Create Mutation
  const { projectsParts: { getProjectsParts: { invalidate } } } = trpc.useContext()

  const createProjectsPartMutation = trpc.projectsParts.createProjectsPart.useMutation({
    onSuccess: () => invalidate({ projectId: projectsPart?.projectId }),
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

  // Delete Mutation
  const deleteProjectsPartMutation = trpc.projectsParts.deleteProjectsPartById.useMutation({
    onSuccess: () => {
      router.replace(`/projects/${projectsPart.projectId}/edit`)
    },
  })

  return {
    callbacks: {
      createProjectsPart: (data: typeof defaultState) => (
        createProjectsPart({ data, mutation: createProjectsPartMutation })
      ),
      deleteProjectsPart: () => (
        deleteProjectsPart({ projectsPart, mutation: deleteProjectsPartMutation })
      ),
    },
    categories,
    formPayload,
    installedByBusinessTitle,
    manufacturerId,
    manufacturerTitle,
    mutations: {
      createProjectsPart: createProjectsPartMutation,
    },
    projectsPart,
    title,
  }
}

export default useProjectsPartForm
