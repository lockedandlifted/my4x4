import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import type { Prisma } from '@prisma/client'

import { trpc } from '@utils/trpc'

import setupInitialEntityState from '@utils/setupInitialEntityState'

type BusinessWithIncludes = Prisma.BusinessGetPayload<{
  include: {
    businessLocations: {
      include: {
        businessLocationsAddresses: true,
        businessLocationsServices: true,
      },
    },
    businessesServices: {
      include: {
        service: true,
      },
    },
  },
}>

const setupBusinessInitialState = (currentState: object, business: BusinessWithIncludes) => {
  const initialState = {
    ...currentState,
  }

  if (business.businessesServices) {
    initialState.serviceKeys = business.businessesServices.map(businessesService => businessesService.service?.key)
  }

  return initialState
}

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
    location: {
      ...data.location,
      title: data.title,
    },
  }

  return mutation.mutate(updatedData)
}

type DeleteBusinessParams = {
  business?: BusinessWithIncludes,
  mutation: {
    mutate: ({ id }: { id: string }) => void,
  },
}

const deleteBusiness = (params: DeleteBusinessParams) => {
  const { business, mutation } = params

  return mutation.mutate({ id: business?.id })
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
  businessServices: { service: { key: string } }[],
  createdByOwner: boolean,
  location: {
    email: string,
    phone: string,
    title: string,
  },
  serviceKeys: string[],
  title: string,
  website: string,
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
    title: '',
  },
  serviceKeys: [],
  title: '',
  website: '',
}

type UseBusinessFormOptions = {
  business?: BusinessWithIncludes,
  temporaryUserId?: string,
}

function useBusinessForm(options: UseBusinessFormOptions) {
  const { business } = options || {}

  const router = useRouter()

  const formPayload = useForm({
    defaultValues: business?.id
      ? setupInitialEntityState(defaultState, business, {
        additionalSetupFn: setupBusinessInitialState,
      })
      : defaultState,
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

  // Delete Mutation
  const deleteBusinessMutation = trpc.businesses.deleteBusinessById.useMutation({
    onSuccess: () => {
      router.push('/users/account')
    },
  })

  return {
    callbacks: {
      createBusiness: (data: typeof defaultState) => createBusiness({ data, mutation: createBusinessMutation }),
      deleteBusiness: () => deleteBusiness({ business, mutation: deleteBusinessMutation }),
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
