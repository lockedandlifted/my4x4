import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import useProjectsImageForm from '@hooks/useProjectsImageForm'

import MobileLayout from '@layouts/MobileLayout'

import Actions from '@components/Image/Actions'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Details from '@components/Image/Details'
import Preview from '@components/Image/Preview'
import TaggedParts from '@components/Image/TaggedParts'

const EditProjectImagePage = () => {
  const { query: { projectId, projectsImageId } } = useRouter()

  const projectQuery = trpc.projects.getProjectById.useQuery({ id: projectId }, { enabled: !!projectId })
  const { data: project } = projectQuery

  const { projectsImages: { getProjectsImageById: { invalidate } } } = trpc.useContext()

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

      <Details
        callbacks={{
          onUpdateSuccess: () => invalidate({ id: projectsImageId }),
        }}
        editMode
        image={projectsImage?.image}
      />

      <TaggedParts projectsImage={projectsImage} />

      <Actions
        boxProps={{
          marginTop: 8,
        }}
        callbacks={{
          deleteImage: () => deleteProjectsImage(),
        }}
      />
    </MobileLayout>
  )
}

export default EditProjectImagePage
