import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import setupInitialEntityState from '@utils/setupInitialEntityState'

import { trpc } from '@utils/trpc'
import toggleArray from '@utils/toggleArray'

import type { Prisma } from '@prisma/client'

type PostWithIncludes = Prisma.PostGetPayload<{
  include: {},
}>

type CreatePostParams = {
  data: typeof defaultState,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
}

const createPost = (params: CreatePostParams) => {
  const { data, mutation } = params

  const updatedData = {
    ...data,
    published: false,
  }

  return mutation.mutate(updatedData)
}

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

  const router = useRouter()

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

  // Create Mutation
  const createPostMutation = trpc.posts.createPost.useMutation({
    onSuccess: (data) => {
      const { id } = data
      router.push(`/posts/${id}/edit`)
    },
  })

  return {
    callbacks: {
      createPost: (data: typeof defaultState) => (
        createPost({
          data,
          mutation: createPostMutation,
        })
      ),
      selectCategoryKey: (categoryKey: string) => {
        setValue('categoryKeys', toggleArray({ array: categoryKeys, value: categoryKey }))
      },
    },
    categories,
    categoryKeys: categoryKeys || [],
    formPayload,
    mutations: {
      createPost: createPostMutation,
    },
  }
}

export default usePostForm
