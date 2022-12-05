import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

import { trpc } from "@utils/trpc"

import MobileLayout from '@layouts/MobileLayout'

const BuildPage = () => {
  const { query: { projectSlug } } = useRouter()

  const projectQuery = trpc.projects.getProjectBySlug.useQuery(
    { slug: projectSlug },
    { enabled: !!projectSlug },
  )

  return (
    <MobileLayout>
      <Flex width="100%">{projectSlug}</Flex>
    </MobileLayout>
  )
}

export default BuildPage
