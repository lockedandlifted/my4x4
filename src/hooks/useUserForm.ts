import { useForm } from 'react-hook-form'

import { trpc } from '@utils/trpc'
import setupInitialEntityState from '@utils/setupInitialEntityState'

import type { User } from '@prisma/client'

type UpdateUserParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
  user?: User,
}

const updateUser = (params: UpdateUserParams) => {
  const { data, mutation, user } = params

  const updatedData = {
    ...data,
    id: user?.id,
  }

  return mutation.mutate(updatedData)
}

type DefaultState = {
  bio: string,
  countryId: string,
  email: string,
  name: string,
  username: string,
}

const defaultState: DefaultState = {
  bio: '',
  countryId: '',
  email: '',
  name: '',
  username: '',
}

type UseUserFormOptions = {
  callbacks: {
    onUpdateSuccess: (data: object) => void,
  },
  user: User,
}

function useUserForm(options: UseUserFormOptions) {
  const { callbacks: { onUpdateSuccess }, user } = options

  const formPayload = useForm({
    defaultValues: user?.id ? setupInitialEntityState(defaultState, user) : defaultState,
    mode: 'onChange',
  })

  // Load Countries
  const countriesQuery = trpc.countries.getCountries.useQuery()
  const { data: countries = [] } = countriesQuery

  // Update Mutation
  const updateUserMutation = trpc.users.updateUserById.useMutation({
    onSuccess: onUpdateSuccess,
  })

  return {
    callbacks: {
      updateUser: (data: typeof defaultState) => updateUser({ data, mutation: updateUserMutation, user }),
    },
    countries,
    formPayload,
    mutations: {
      updateUserMutation,
    },
  }
}

export default useUserForm
