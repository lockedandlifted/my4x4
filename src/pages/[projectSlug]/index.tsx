import { useRouter } from 'next/router'
import { Flex, Button } from '@chakra-ui/react'

import { trpc } from '@utils/trpc'

import MobileLayout from '@layouts/MobileLayout'

const BuildPage = () => {
  const { query: { projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  const { data: project } = projectQuery

  return (
    <MobileLayout>
      <Flex width="100%">{projectSlug}</Flex>

      <Button as="a" href={`/projects/${project?.id}/edit`} size="sm">
        Edit
      </Button>
    </MobileLayout>
  )
}

export default BuildPage
