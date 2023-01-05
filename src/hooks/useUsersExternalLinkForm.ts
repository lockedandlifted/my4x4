import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UsersExternalLink } from '@prisma/client'

import { trpc } from '@utils/trpc'
import setupInitialEntityState from '@utils/setupInitialEntityState'

import { createUsersExternalLinkValidationSchema } from '@validationSchemas/usersExternalLink'

type CreateUsersExternalLinkParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
}

const createUsersExternalLink = (params: CreateUsersExternalLinkParams) => {
  const { data, mutation } = params
  return mutation.mutate(data)
}

const defaultState = {
  title: '',
  url: '',
  userId: undefined,
}

type UseUsersExternalLinkFormOptions = {
  usersExternalLink?: UsersExternalLink,
}

function useUsersExternalLinkForm(options: UseUsersExternalLinkFormOptions) {
  const { usersExternalLink } = options

  const formPayload = useForm({
    defaultValues: usersExternalLink
      ? setupInitialEntityState(defaultState, usersExternalLink)
      : defaultState,
    mode: 'onChange',
    resolver: zodResolver(createUsersExternalLinkValidationSchema, undefined),
  })

  // Create Mutation
  const {
    usersExternalLinks: {
      getUsersExternalLinks: {
        setData: setGetUsersExternalLinksData,
      },
    },
  } = trpc.useContext()

  const createUsersExternalLinkMutation = trpc.usersExternalLinks.createUsersExternalLink.useMutation({
    onSuccess: (data) => {
      setGetUsersExternalLinksData({
        userId: data.userId,
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
      createUsersExternalLink: (data: typeof defaultState) => (
        createUsersExternalLink({ data, mutation: createUsersExternalLinkMutation })
      ),
    },
    formPayload,
    mutations: {
      createUsersExternalLink: createUsersExternalLinkMutation,
    },
  }
}

export default useUsersExternalLinkForm
