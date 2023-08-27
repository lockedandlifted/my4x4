import { useRouter } from 'next/router'
import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

import { defaultEditorValue } from '@hooks/usePostForm'

type UseProjectPostsOptions = {
  project: Project,
}

function useProjectPosts(options: UseProjectPostsOptions) {
  const { project } = options

  const router = useRouter()

  const createPostMutation = trpc.posts.createPost.useMutation({
    onSuccess: ({ id }) => {
      router.replace(`/posts/${id}/edit`)
    },
  })
  const { mutate: createPostFn, isLoading } = createPostMutation

  return {
    callbacks: {
      createPost: (params: { categoryKey: string }) => createPostFn({
        body: '',
        bodyData: defaultEditorValue,
        categoryKeys: [params.categoryKey],
        isRichText: true,
        postTypeKey: 'forum',
        published: false,
        relatedEntities: [
          { key: 'projectId', value: project?.id },
          { key: 'manufacturerModelId', value: project?.manufacturerModelId },
        ],
        title: `Shed Time on ${project?.title}`,
      }),
    },
    isLoading,
    project,
  }
}

export default useProjectPosts
