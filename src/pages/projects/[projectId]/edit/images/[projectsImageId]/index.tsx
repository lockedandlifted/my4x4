import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import useProjectsImageForm from '@hooks/useProjectsImageForm'

import MobileLayout from '@layouts/MobileLayout'

import Actions from '@components/Image/Actions'
import BackToProjectButton from '@components/Project/BackToProjectButton'
import Part from '@components/Project/Parts/Part'
import Preview from '@components/Image/Preview'

const EditProjectImagePage = () => {
  const { query: { projectId, projectsImageId } } = useRouter()

  const projectQuery = trpc.projects.getProjectById.useQuery({ id: projectId }, { enabled: !!projectId })
  const { data: project } = projectQuery

  const projectsImageQuery = trpc.projectsImages.getProjectsImageById.useQuery({
    id: projectsImageId,
  }, { enabled: !!projectsImageId })
  const { data: projectsImage } = projectsImageQuery

  const projectPartsImageTagsQuery = trpc.projectPartsImageTags.getProjectPartsImageTags.useQuery({
    include: {
      imageTag: true,
      projectPart: {
        include: {
          manufacturerPart: {
            include: {
              manufacturer: true,
            },
          },
        },
      },
    },
    imageId: projectsImage?.imageId,
  }, { enabled: !!projectsImage?.imageId })

  const { data: projectPartsImageTags = [] } = projectPartsImageTagsQuery

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

      {projectPartsImageTags.map((projectPartsImageTag) => {
        const { id, projectPart: { manufacturerPart } } = projectPartsImageTag

        return (
          <Part
            key={id}
            manufacturerPart={manufacturerPart}
          />
        )
      })}

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
