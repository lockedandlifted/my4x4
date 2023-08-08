import { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { FiUploadCloud } from 'react-icons/fi'
import { DashboardModal } from '@uppy/react'

import type { Project } from '@prisma/client'

import { trpc } from '@utils/trpc'

import useProjectImageUpload from '@hooks/useProjectImageUpload'

import ImageThumb from '@components/Image/ImageThumb'

type ImageThumbsProps = {
  editMode: boolean,
  project: Project,
}

const ProjectImageThumbs = (props: ImageThumbsProps) => {
  const { editMode = false, project } = props

  const [uploadModalOpen, setUploadModalOpen] = useState(false)

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

  const sortedImages = editMode ? [...projectsImages].reverse() : projectsImages

  return (
    <Stack direction="row" spacing="2" paddingBottom="2" marginTop="2" overflowX="auto" width="100%">
      {uppy && (
        <DashboardModal
          doneButtonHandler={() => setUploadModalOpen(false)}
          onRequestClose={() => setUploadModalOpen(false)}
          open={uploadModalOpen}
          uppy={uppy}
        />
      )}

      {editMode && !!uppy && (
        <Button
          borderRadius="2xl"
          colorScheme="gray"
          flexShrink={0}
          height={120}
          onClick={() => setUploadModalOpen(true)}
          marginTop="auto"
          size="lg"
          zIndex="1"
          variant="outline"
          width={120}
        >
          <FiUploadCloud size={28} />
        </Button>
      )}

      {sortedImages.map((projectsImage) => {
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
    </Stack>
  )
}

export default ProjectImageThumbs
