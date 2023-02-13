import { useRouter } from 'next/router'
import type { ProjectsImage } from '@prisma/client'

import { trpc } from '@utils/trpc'

type DeleteProjectsImageParams = {
  mutation: {
    mutate: (data: { id: string }) => void,
  },
  projectsImage: ProjectsImage,
}

const deleteProjectsImage = (params: DeleteProjectsImageParams) => {
  const { mutation, projectsImage } = params
  return mutation.mutate({ id: projectsImage.imageId })
}

type SetImageAsDefaultParams = {
  mutation: {
    mutate: (data: { id: string }) => void,
  },
  projectsImage: ProjectsImage,
}

const setImageAsDefault = (params: SetImageAsDefaultParams) => {
  const { mutation, projectsImage } = params
  return mutation.mutate({ id: projectsImage.id })
}

type UseProjectsImageFormOptions = {
  projectsImage: ProjectsImage,
}

function useProjectsImageForm(options: UseProjectsImageFormOptions) {
  const { projectsImage } = options

  const router = useRouter()

  // Delete Mutation
  const deleteProjectsImageMutation = trpc.images.deleteImageById.useMutation({
    onSuccess: () => {
      router.replace(`/projects/${projectsImage.projectId}/edit`)
    },
  })

  // Set as Default Mutation
  const setImageAsDefaultMutation = trpc.projectsImages.setImageAsDefault.useMutation({
    onSuccess: () => {
      router.replace(`/projects/${projectsImage.projectId}/edit`)
    },
  })

  return {
    callbacks: {
      deleteProjectsImage: () => (
        deleteProjectsImage({ projectsImage, mutation: deleteProjectsImageMutation })
      ),
      setImageAsDefault: () => (
        setImageAsDefault({ projectsImage, mutation: setImageAsDefaultMutation })
      ),
    },
    mutations: {
      deleteProjectsImageMutation,
    },
  }
}

export default useProjectsImageForm
