import { useRouter } from 'next/router'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import BackToProjectButton from '@components/Project/BackToProjectButton'
import Details from '@components/Image/Details'
import Preview from '@components/Image/Preview'
import TaggedParts from '@components/Image/TaggedParts'

const ProjectImagePage = () => {
  const { query: { projectSlug, projectsImageId } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery({ slug: projectSlug }, { enabled: !!projectSlug })
  const { data: project } = projectQuery

  const { projectsImages: { getProjectsImageById: { invalidate } } } = trpc.useContext()

  const projectsImageQuery = trpc.projectsImages.getProjectsImageById.useQuery({
    id: projectsImageId,
  }, { enabled: !!projectsImageId })
  const { data: projectsImage } = projectsImageQuery

  return (
    <MobileLayout>
      <BackToProjectButton path="/images" project={project} />

      <Preview
        enabledTagging={false}
        image={projectsImage?.image}
        projectsImage={projectsImage}
      />

      <Details
        callbacks={{
          onUpdateSuccess: () => invalidate({ id: projectsImageId }),
        }}
        image={projectsImage?.image}
      />

      <TaggedParts
        project={project}
        projectsImage={projectsImage}
      />
    </MobileLayout>
  )
}

export default ProjectImagePage
