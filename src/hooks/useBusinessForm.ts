import { useForm } from 'react-hook-form'

import type { Business } from '@prisma/client'

import setupInitialEntityState from '@utils/setupInitialEntityState'

type DefaultState = {
  createdByOwner: boolean,
  title: string,
}

const defaultState: DefaultState = {
  createdByOwner: false,
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

  const { setValue, watch } = formPayload
  const createdByOwner = watch('createdByOwner')

  return {
    createdByOwner,
    formPayload,
  }
}

export default useBusinessForm
