import { useRouter } from 'next/router'
import { trpc } from '@utils/trpc'

import type { Project } from '@prisma/client'

import { defaultEditorValue } from '@hooks/usePostForm'

type UseProjectPostsParams = {
  project: Project,
}

function useProjectPosts(params: UseProjectPostsParams) {
  const { project } = params

  const router = useRouter()

  const createPostMutation = trpc.posts.createPost.useMutation({
    onSuccess: ({ id }) => {
      router.replace(`/posts/${id}/edit`)
    },
  })
  const { mutate: createPostFn, isLoading } = createPostMutation

  return {
    callbacks: {
      createPost: (createParams: { categoryKey: string }) => createPostFn({
        body: '',
        bodyData: defaultEditorValue,
        title: `Shed Time on ${project?.title}`,
        postTypeKey: 'forum',
        relatedEntities: [
          { key: 'projectId', value: project?.id },
          { key: 'manufacturerModelId', value: project?.manufacturerModelId },
        ],
        isRichText: true,
        categoryKeys: [createParams.categoryKey],
      }),
    },
    isLoading,
    project,
  }
}

export default useProjectPosts
