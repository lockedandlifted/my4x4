import { Stack } from '@chakra-ui/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useProjectImageUpload from '@hooks/useProjectImageUpload'
import useUppy from '@hooks/useUppy'

import FileUploadButton from '@components/FileUploadButton'

import ProjectImage from './ProjectImage'

type ProjectImagesProps = {
  project: Project,
}

const ProjectImages = (props: ProjectImagesProps) => {
  const { project } = props

  const { projectsImages: { getProjectsImages: { invalidate } } } = trpc.useContext()

  const projectsImagesQuery = trpc.projectsImages.getProjectsImages.useQuery(
    { projectId: project?.id, include: { image: true } },
    { enabled: !!project?.id },
  )

  const { data: projectsImages = [] } = projectsImagesQuery

  const { uppy } = useProjectImageUpload({
    callbacks: {
      onSuccess: () => invalidate({ projectId: project?.id }),
    },
    projectId: project?.id,
  })

  if (!projectsImages.length) {
    return null
  }

  return (
    <Stack direction="row" spacing="2" paddingBottom="2" marginTop="2" overflowX="auto">
      {projectsImages.map((projectsImage) => {
        const { id, image } = projectsImage

        return (
          <ProjectImage key={id} image={image} />
        )
      })}

      {!!uppy && (
        <FileUploadButton
          buttonProps={{
            borderRadius: '2xl',
            colorScheme: 'gray',
            marginTop: 'auto',
            size: 'lg',
            zIndex: '1',
            height: 120,
            variant: 'outline',
            width: 120,
          }}
          buttonText="Add Photos"
          uppy={uppy}
        />
      )}
    </Stack>
  )
}

export default ProjectImages
