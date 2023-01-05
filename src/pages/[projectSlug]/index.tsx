import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

import Attributes from '@components/Project/Attributes'
import Description from '@components/Project/Description'
import MainImage from '@components/Project/MainImage'
import Parts from '@components/Project/Parts'
import ProjectImageThumbs from '@components/ProjectImageThumbs'
import SimilarProjects from '@components/Project/SimilarProjects'

const BuildPage = () => {
  const { query: { projectSlug } } = useRouter()

  const { mutate: createPageViewFn } = trpc.projectPageViews.createProjectPageView.useMutation()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    {
      enabled: !!projectSlug,
      onSuccess() {
        createPageViewFn({
          slug: projectSlug,
        })
      },
    },
  )

  const { data: project } = projectQuery

  return (
    <MobileLayout>
      <MainImage project={project} />
      <ProjectImageThumbs project={project} />
      <Description project={project} />
      <Attributes project={project} />
      <Parts project={project} />

      <SimilarProjects project={project} />

      <Button as="a" href={`/projects/${project?.id}/edit`} marginY={4} size="lg">
        Edit Build
      </Button>
    </MobileLayout>
  )
}

export default BuildPage
