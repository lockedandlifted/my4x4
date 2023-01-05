import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ProjectPartsExternalLink } from '@prisma/client'

import { trpc } from '@utils/trpc'

import { createProjectPartsExternalLinkValidationSchema } from '@validationSchemas/projectPartsExternalLink'

type CreateProjectPartsExternalLinkParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
}

const createProjectPartsExternalLink = (params: CreateProjectPartsExternalLinkParams) => {
  const { data, mutation } = params
  return mutation.mutate(data)
}

const defaultState = {
  projectsPartId: undefined,
  title: '',
  url: '',
}

const setupProjectPartsExternalLinkInitialState = (projectPartsExternalLink: ProjectPartsExternalLink) => {
  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = projectPartsExternalLink[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  return initialState
}

type UseProjectPartsExternalLinkFormOptions = {
  projectPartsExternalLink?: ProjectPartsExternalLink,
}

function useProjectPartsExternalLinkForm(options: UseProjectPartsExternalLinkFormOptions) {
  const { projectPartsExternalLink } = options

  const formPayload = useForm({
    defaultValues: projectPartsExternalLink
      ? setupProjectPartsExternalLinkInitialState(projectPartsExternalLink)
      : defaultState,
    mode: 'onChange',
    resolver: zodResolver(createProjectPartsExternalLinkValidationSchema, undefined),
  })

  // Create Mutation
  const {
    projectPartsExternalLinks: {
      getProjectPartsExternalLinks: {
        setData: setGetProjectPartsExternalLinksData,
      },
    },
  } = trpc.useContext()

  const createProjectPartsExternalLinkMutation = trpc.projectPartsExternalLinks.createProjectPartsExternalLink.useMutation({
    onSuccess: (data) => {
      setGetProjectPartsExternalLinksData({
        projectsPartId: data.projectPartId,
        include: {
          externalLink: {
            include: {
              externalLinkType: true,
            },
          },
        },
      }, prevData => (prevData ? [...prevData, data] : [data]))
    },
  })

  return {
    callbacks: {
      createProjectPartsExternalLink: (data: typeof defaultState) => (
        createProjectPartsExternalLink({ data, mutation: createProjectPartsExternalLinkMutation })
      ),
    },
    formPayload,
    mutations: {
      createProjectPartsExternalLink: createProjectPartsExternalLinkMutation,
    },
  }
}

export default useProjectPartsExternalLinkForm
