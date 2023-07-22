import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Node } from 'slate'

import setupInitialEntityState from '@utils/setupInitialEntityState'

import { trpc } from '@utils/trpc'
import toggleArray from '@utils/toggleArray'

import { createWrappedEditor } from '@components/Post/Editor'

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

const serializeEditorValueAsString = value => (
  value
  // Return the string content of each paragraph in the value's children.
    .map(n => Node.string(n))
  // Join them all with line breaks denoting paragraphs.
    .join('\n')
)

type UpdatePostParams = {
  data: typeof defaultState,
  editor: object,
  mutation: {
    mutate: (data: typeof defaultState) => void,
  },
  post: PostWithIncludes,
  shouldUsePostEditor: boolean,
}

const updatePost = (params: UpdatePostParams) => {
  const {
    data, editor, mutation, post, shouldUsePostEditor,
  } = params

  const updatedData = {
    ...data,
    id: post?.id,
    body: shouldUsePostEditor ? serializeEditorValueAsString(editor.children) : data.body,
    bodyData: shouldUsePostEditor ? editor.children : undefined,
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

  const shouldUsePostEditor = post?.postType?.key === 'forum'
  const [editor] = useState(shouldUsePostEditor ? createWrappedEditor() : undefined)

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

  // Update Mutation
  const { posts: { getPostById: { invalidate: invalidateGetPostById } } } = trpc.useContext()

  const updatePostMutation = trpc.posts.updatePostById.useMutation({
    onSuccess: () => {
      invalidateGetPostById({ id: post?.id })
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
      updatePost: (data: typeof defaultState) => (
        updatePost({
          data,
          editor,
          mutation: updatePostMutation,
          post,
          shouldUsePostEditor,
        })
      ),
    },
    categories,
    categoryKeys: categoryKeys || [],
    editor,
    formPayload,
    mutations: {
      createPost: createPostMutation,
      updatePost: updatePostMutation,
    },
    shouldUsePostEditor,
  }
}

export default usePostForm
