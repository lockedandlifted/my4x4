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

const defaultState = {
  bio: '',
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

  // Update Mutation
  const updateUserMutation = trpc.users.updateUserById.useMutation({
    onSuccess: onUpdateSuccess,
  })

  return {
    callbacks: {
      updateUser: (data: typeof defaultState) => updateUser({ data, mutation: updateUserMutation, user }),
    },
    formPayload,
    mutations: {
      updateUserMutation,
    },
  }
}

export default useUserForm
