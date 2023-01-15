import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ProjectsExternalLink } from '@prisma/client'

import { trpc } from '@utils/trpc'

import { createProjectsExternalLinkValidationSchema } from '@validationSchemas/projectsExternalLink'

type CreateProjectsExternalLinkParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
}

const createProjectsExternalLink = (params: CreateProjectsExternalLinkParams) => {
  const { data, mutation } = params
  return mutation.mutate(data)
}

const defaultState = {
  projectId: undefined,
  title: '',
  url: '',
}

const setupProjectsExternalLinkInitialState = (projectsExternalLink: ProjectsExternalLink) => {
  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = projectsExternalLink[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  return initialState
}

type UseProjectsExternalLinkFormOptions = {
  projectsExternalLink?: ProjectsExternalLink,
}

function useProjectsExternalLinkForm(options: UseProjectsExternalLinkFormOptions) {
  const { projectsExternalLink } = options

  const formPayload = useForm({
    defaultValues: projectsExternalLink
      ? setupProjectsExternalLinkInitialState(projectsExternalLink)
      : defaultState,
    mode: 'onChange',
    resolver: zodResolver(createProjectsExternalLinkValidationSchema, undefined),
  })

  // Create Mutation
  const {
    projectsExternalLinks: {
      getProjectsExternalLinks: {
        setData: setGetProjectsExternalLinksData,
      },
    },
  } = trpc.useContext()

  const createProjectsExternalLinkMutation = trpc.projectsExternalLinks.createProjectsExternalLink.useMutation({
    onSuccess: (data) => {
      setGetProjectsExternalLinksData({
        projectId: data.projectId,
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
      createProjectsExternalLink: (data: typeof defaultState) => (
        createProjectsExternalLink({ data, mutation: createProjectsExternalLinkMutation })
      ),
    },
    formPayload,
    mutations: {
      createProjectsExternalLink: createProjectsExternalLinkMutation,
    },
  }
}

export default useProjectsExternalLinkForm
