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

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  return (
    <MobileLayout>
      <Button as="a" href={`/projects/${project?.id}/edit`} marginBottom="4" size="lg">
        Edit
      </Button>

      <MainImage project={project} />
      <ProjectImageThumbs project={project} />
      <Description project={project} />
      <Attributes project={project} />
      <Parts project={project} />

      <SimilarProjects project={project} />
    </MobileLayout>
  )
}

export default BuildPage
