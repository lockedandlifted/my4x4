import { useState } from 'react'
import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

function useProjectQuestions() {
  const { query: { projectSlug } } = useRouter()

  const [inputValue, setInputValue] = useState('')

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  const projectPostsQuery = trpc.posts.getPosts.useQuery(
    {
      postTypeKey: 'question',
      projectSlug: projectSlug as string,
    },
    { enabled: !!projectSlug },
  )

  const { data: posts } = projectPostsQuery

  const { posts: { getPosts: { invalidate } } } = trpc.useContext()

  const createPostMutation = trpc.posts.createPost.useMutation({
    onSuccess: () => {
      invalidate()
      setInputValue('')
    },
  })
  const { mutate: createPostFn, isLoading } = createPostMutation

  const postsWithComments = posts ? posts.filter(post => post._count.postsComments > 0) : []
  const postsWithoutComments = posts ? posts.filter(post => post._count.postsComments === 0) : []

  return {
    callbacks: {
      createPost: (params: { body: string }) => createPostFn({
        title: `Question about ${project?.title}`,
        postTypeKey: 'question',
        relatedEntities: [
          { key: 'projectId', value: project?.id },
          { key: 'manufacturerModelId', value: project?.manufacturerModelId },
        ],
        ...params,
      }),
      setInputValue,
    },
    inputValue,
    isLoading,
    project,
    postsWithComments,
    postsWithoutComments,
  }
}

export default useProjectQuestions
