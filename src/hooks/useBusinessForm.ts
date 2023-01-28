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
  address: {
    countryId: string,
    stateName: string,
    streetName: string,
    streetNumber: string,
    suburbName: string,
    unitNumber?: string,
  },
  createdByOwner: boolean,
  location: {
    email: string,
    phone: string,
  },
  serviceKeys: string[],
  title: string,
}

const defaultState: DefaultState = {
  address: {
    countryId: '',
    stateName: '',
    streetName: '',
    streetNumber: '',
    suburbName: '',
    unitNumber: '',
  },
  createdByOwner: false,
  location: {
    email: '',
    phone: '',
  },
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

  // Load Countries
  const countriesQuery = trpc.countries.getCountries.useQuery()
  const { data: countries = [] } = countriesQuery

  // Load Services
  const servicesQuery = trpc.services.getServices.useQuery()
  const { data: services = [] } = servicesQuery

  // Create Mutation
  const createBusinessMutation = trpc.businesses.createBusiness.useMutation({
    onSuccess: (data) => {
      const { id } = data
      router.push(`/businesses/${id}/edit`)
    },
  })

  return {
    callbacks: {
      createBusiness: (data: typeof defaultState) => createBusiness({ data, mutation: createBusinessMutation }),
      updateBusiness: () => console.log('update'),
    },
    countries,
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
