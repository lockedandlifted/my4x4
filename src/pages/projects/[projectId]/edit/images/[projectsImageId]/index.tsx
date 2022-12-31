import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import useProjectsImageForm from '@hooks/useProjectsImageForm'

import MobileLayout from '@layouts/MobileLayout'

import Actions from '@components/Image/Actions'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Preview from '@components/Image/Preview'

const EditProjectImagePage = () => {
  const { query: { projectId, projectsImageId } } = useRouter()

  const projectQuery = trpc.projects.getProjectById.useQuery({ id: projectId }, { enabled: !!projectId })
  const { data: project } = projectQuery

  const projectsImageQuery = trpc.projectsImages.getProjectsImageById.useQuery({
    id: projectsImageId,
  }, { enabled: !!projectsImageId })
  const { data: projectsImage } = projectsImageQuery

  const projectsImageFormPayload = useProjectsImageForm({ projectsImage })
  const {
    callbacks: {
      deleteProjectsImage,
    },
  } = projectsImageFormPayload

  return (
    <MobileLayout>
      <BackToProjectButton editMode project={project} />

      <Preview
        image={projectsImage?.image}
        projectsImage={projectsImage}
      />

      <Actions
        boxProps={{
          marginTop: 4,
        }}
        callbacks={{
          deleteImage: () => deleteProjectsImage(),
        }}
      />
    </MobileLayout>
  )
}

export default EditProjectImagePage
