import { useForm } from 'react-hook-form'

import { trpc } from '@utils/trpc'

import type { Image } from '@prisma/client'

type UpdateImageParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
  image?: Image,
}

const updateImage = (params: UpdateImageParams) => {
  const { data, mutation, image } = params

  const updatedData = {
    ...data,
    id: image?.id,
  }

  return mutation.mutate(updatedData)
}

const defaultState = {
  id: undefined,
  description: '',
  title: '',
}

const setupInitialState = (image: Image) => {
  const initialState = Object.keys(defaultState).reduce((acc, key) => {
    acc[key] = image[key] || defaultState[key]
    return acc
  }, { ...defaultState })

  return initialState
}

type UseImageFormOptions = {
  callbacks: {
    onUpdateSuccess: (data: object) => void,
  },
  image: Image,
}

function useImageForm(options: UseImageFormOptions) {
  const { callbacks: { onUpdateSuccess }, image } = options

  const formPayload = useForm({
    defaultValues: image?.id ? setupInitialState(image) : defaultState,
    mode: 'onChange',
  })

  // Update Mutation
  const updateImageMutation = trpc.images.updateImageById.useMutation({
    onSuccess: onUpdateSuccess,
  })

  return {
    callbacks: {
      updateImage: (data: typeof defaultState) => updateImage({ data, image, mutation: updateImageMutation }),
    },
    formPayload,
    mutations: {
      updateImageMutation,
    },
  }
}

export default useImageForm
