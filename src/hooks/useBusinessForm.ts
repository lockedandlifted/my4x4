import { useForm } from 'react-hook-form'

import type { Business } from '@prisma/client'

import { trpc } from '@utils/trpc'

import setupInitialEntityState from '@utils/setupInitialEntityState'

type CreateBusinessParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState & { temporaryUserId: string }) => void,
  },
}

const createBusiness = (params: CreateBusinessParams) => {
  const { data, mutation } = params

  const updatedData = {
    ...data,
  }

  // if (data.attributes) {
  //   updatedData.projectsAttributes = Object.keys(data.attributes).map(attributeKey => ({
  //     key: attributeKey,
  //     value: data.attributes[attributeKey],
  //   }))
  // }

  return mutation.mutate(updatedData)
}

type DefaultState = {
  createdByOwner: boolean,
  serviceKeys: string[],
  title: string,
}

const defaultState: DefaultState = {
  createdByOwner: false,
  serviceKeys: [],
  title: '',
}

type UseBusinessFormOptions = {
  business?: Business,
  temporaryUserId?: string,
}

function useBusinessForm(options: UseBusinessFormOptions) {
  const { business } = options || {}

  const formPayload = useForm({
    defaultValues: business?.id ? setupInitialEntityState(defaultState, business) : defaultState,
    mode: 'onChange',
  })

  const { watch } = formPayload
  const createdByOwner = watch('createdByOwner')
  const serviceKeys = watch('serviceKeys')

  // Load Services
  const servicesQuery = trpc.services.getServices.useQuery()
  const { data: services = [] } = servicesQuery

  // Create Mutation
  const createBusinessMutation = trpc.projects.createProject.useMutation({
    onSuccess: (data) => {
      const { id } = data
      router.push(`/projects/${id}/edit`)
    },
  })

  return {
    callbacks: {
      createBusiness: (data: typeof defaultState) => createBusiness({ data, mutation: createBusinessMutation }),
    },
    createdByOwner,
    formPayload,
    mutations: {
      createBusiness: createBusinessMutation,
    },
    serviceKeys,
    services,
  }
}

export default useBusinessForm
