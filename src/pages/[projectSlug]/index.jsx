import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'

import { trpc } from "@utils/trpc"

import DefaultLayout from '@layouts/MobileLayout'

const BuildPage = () => {
  const { query: { projectSlug } } = useRouter()

  const projectsQuery = trpc.projects.getProject.useQuery({ slug: projectSlug }, { enabled: !!projectSlug },)
  console.log(projectsQuery)

  return (
    <DefaultLayout>
      <Flex width="100%">{projectSlug}</Flex>
    </DefaultLayout>
  )
}

export default BuildPage
