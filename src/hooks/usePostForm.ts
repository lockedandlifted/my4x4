import { useForm } from 'react-hook-form'

import setupInitialEntityState from '@utils/setupInitialEntityState'

import { trpc } from '@utils/trpc'
import toggleArray from '@utils/toggleArray'

import type { Prisma } from '@prisma/client'

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {},
}>

const setupPostInitialState = (currentState: object, post: PostWithIncludes) => {
  const initialState = {
    ...currentState,
  }

  // if (post.businessesServices) {
  //   initialState.serviceKeys = post.businessesServices.map(businessesService => businessesService.service?.key)
  // }

  return initialState
}

const defaultState = {
  body: '',
  categoryKeys: ['general'],
  postTypeKey: 'forum',
  title: '',
}

type UsePostFormOptions = {
  post?: PostWithIncludes,
}

function usePostForm(options?: UsePostFormOptions) {
  const { post } = options || {}

  const formPayload = useForm({
    mode: 'onChange',
    // resolver: zodResolver(createProjectsPartValidationSchema, undefined),
    values: post ? setupInitialEntityState(defaultState, post, {
      additionalSetupFn: setupPostInitialState,
    }) : defaultState,
  })

  const { setValue, watch } = formPayload
  const categoryKeys = watch('categoryKeys')

  // Load Categories
  const categoriesQuery = trpc.categories.getCategories.useQuery({
    categoryType: 'post',
  })
  const { data: categories = [] } = categoriesQuery

  return {
    callbacks: {
      selectCategoryKey: (categoryKey: string) => {
        setValue('categoryKeys', toggleArray({ array: categoryKeys, value: categoryKey }))
      },
    },
    categories,
    categoryKeys: categoryKeys || [],
    formPayload,
    mutations: {},
  }
}

export default usePostForm
