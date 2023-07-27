import { Stack } from '@chakra-ui/react'
import { FiUploadCloud } from 'react-icons/fi'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useProjectImageUpload from '@hooks/useProjectImageUpload'

import FileUploadButton from '@components/FileUploadButton'

import ImageThumb from '@components/Image/ImageThumb'

type ImageThumbsProps = {
  editMode: boolean,
  project: Project,
}

const ProjectImageThumbs = (props: ImageThumbsProps) => {
  const { editMode = false, project } = props

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

  if (!projectsImages.length || (!editMode && projectsImages.length === 1)) {
    return null
  }

  return (
    <Stack direction="row" spacing="2" paddingBottom="2" marginTop="2" overflowX="auto">
      {projectsImages.map((projectsImage) => {
        const { id, image } = projectsImage

        return (
          <ImageThumb
            href={editMode
              ? `/projects/${project?.id}/edit/images/${id}`
              : `/${project?.slug}/images/${id}`}
            key={id}
            image={image}
          />
        )
      })}

      {editMode && !!uppy && (
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
          buttonText={<FiUploadCloud size={28} />}
          uppy={uppy}
        />
      )}
    </Stack>
  )
}

export default ProjectImageThumbs
